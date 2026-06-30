import { createContext, useContext, useEffect, useReducer, useCallback, useRef, useMemo } from "react";

const AuthContext = createContext(undefined);

const TOKEN_KEY = "pilotstaff_token";
const REFRESH_KEY = "pilotstaff_refresh";
const USER_KEY = "pilotstaff_user";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, user: action.user, token: action.token, refreshToken: action.refreshToken, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'CLEAR_AUTH':
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

function getStored(key) {
  try { return localStorage.getItem(key) || ""; } catch { return ""; }
}

function setStored(key, value) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {}
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveAuth(token, refreshToken, user) {
  setStored(TOKEN_KEY, token || "");
  setStored(REFRESH_KEY, refreshToken || "");
  setStored(USER_KEY, user ? JSON.stringify(user) : "");
}

function clearAuthStorage() {
  [TOKEN_KEY, REFRESH_KEY, USER_KEY].forEach(k => setStored(k, ""));
}

const _requestCache = new Map();
const CACHE_TTL = 60000;

function getCachedRequest(key) {
  const item = _requestCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expireAt) { _requestCache.delete(key); return null; }
  return item.data;
}

function setCachedRequest(key, data) {
  _requestCache.set(key, { data, expireAt: Date.now() + CACHE_TTL });
}

async function tryRefreshToken() {
  const refreshToken = getStored(REFRESH_KEY);
  if (!refreshToken || !API_BASE) return null;

  const cacheKey = `refresh:${refreshToken.substring(0, 20)}`;
  const cached = getCachedRequest(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.token && data.refresh_token) {
      const result = { token: data.token, refreshToken: data.refresh_token, user: data.user };
      saveAuth(data.token, data.refresh_token, data.user);
      setCachedRequest(cacheKey, result);
      return result;
    }
  } catch {}

  clearAuthStorage();
  return null;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const refreshPromiseRef = useRef(null);
  const initPromiseRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => { return () => { mountedRef.current = false; }; }, []);

  const initAuth = useCallback(async () => {
    if (initPromiseRef.current) return initPromiseRef.current;

    initPromiseRef.current = (async () => {
      try {
        const storedToken = getStored(TOKEN_KEY);
        const storedUser = getStoredUser();

        if (!storedToken) {
          clearAuthStorage();
          if (mountedRef.current) dispatch({ type: 'CLEAR_AUTH' });
          return;
        }

        if (!API_BASE) {
          if (mountedRef.current) {
            dispatch({ type: 'SET_AUTH', token: storedToken, refreshToken: getStored(REFRESH_KEY) || null, user: storedUser });
          }
          return;
        }

        const meCacheKey = `me:${storedToken.substring(0, 20)}`;
        const cachedMe = getCachedRequest(meCacheKey);
        if (cachedMe) {
          if (mountedRef.current) dispatch({ type: 'SET_AUTH', token: storedToken, refreshToken: getStored(REFRESH_KEY) || null, user: cachedMe });
          return;
        }

        const meRes = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          cache: "no-store",
        });

        if (meRes.ok) {
          const meData = await meRes.json().catch(() => ({}));
          if (meData.success && meData.user) {
            saveAuth(storedToken, getStored(REFRESH_KEY), meData.user);
            setCachedRequest(meCacheKey, meData.user);
            if (mountedRef.current) dispatch({ type: 'SET_AUTH', token: storedToken, refreshToken: getStored(REFRESH_KEY) || null, user: meData.user });
            return;
          }
        }

        const refreshed = await tryRefreshToken();
        if (refreshed) {
          if (mountedRef.current) dispatch({ type: 'SET_AUTH', token: refreshed.token, refreshToken: refreshed.refreshToken, user: refreshed.user });
          return;
        }

        clearAuthStorage();
        if (mountedRef.current) dispatch({ type: 'CLEAR_AUTH' });
      } catch (error) {
        const storedToken = getStored(TOKEN_KEY);
        const storedUser = getStoredUser();
        if (storedToken && mountedRef.current) {
          dispatch({ type: 'SET_AUTH', token: storedToken, refreshToken: getStored(REFRESH_KEY) || null, user: storedUser });
        } else if (mountedRef.current) {
          dispatch({ type: 'CLEAR_AUTH' });
        }
      } finally {
        initPromiseRef.current = null;
      }
    })();

    return initPromiseRef.current;
  }, []);

  useEffect(() => { initAuth(); }, [initAuth]);

  const login = useCallback((newToken, newRefreshToken, newUser) => {
    saveAuth(newToken, newRefreshToken, newUser);
    dispatch({ type: 'SET_AUTH', token: newToken || null, refreshToken: newRefreshToken || null, user: newUser || null });
  }, []);

  const logout = useCallback(async () => {
    const storedRefresh = getStored(REFRESH_KEY);
    if (storedRefresh && API_BASE) {
      fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: storedRefresh }),
      }).catch(() => {});
    }
    clearAuthStorage();
    _requestCache.clear();
    dispatch({ type: 'CLEAR_AUTH' });
    window.location.href = "/login";
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (refreshPromiseRef.current) return refreshPromiseRef.current;
    refreshPromiseRef.current = (async () => {
      try {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          dispatch({ type: 'SET_AUTH', token: refreshed.token, refreshToken: refreshed.refreshToken, user: refreshed.user });
          return refreshed.token;
        }
        await logout();
        return null;
      } finally {
        refreshPromiseRef.current = null;
      }
    })();
    return refreshPromiseRef.current;
  }, [logout]);

  const value = useMemo(
    () => ({ ...state, login, logout, refreshAccessToken }),
    [state, login, logout, refreshAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
