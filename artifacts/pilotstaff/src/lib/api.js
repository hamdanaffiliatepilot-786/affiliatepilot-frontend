const rawApiUrl = import.meta.env.VITE_API_URL || '';

export const API_BASE = rawApiUrl.trim().replace(/\/+$/, '');

const TOKEN_KEY = 'pilotstaff_token';
const REFRESH_KEY = 'pilotstaff_refresh';
const USER_KEY = 'pilotstaff_user';

let refreshPromise = null;

function getStored(key) {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}

function setStored(key, value) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {}
}

export function getStoredToken() {
  return getStored(TOKEN_KEY);
}

export function getApiHeaders(extraHeaders = {}) {
  const token = getStoredToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
}

const _cache = new Map();
const DEFAULT_CACHE_TTL = 60000;

function getCached(key) {
  const item = _cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expireAt) { _cache.delete(key); return null; }
  return item.data;
}

function setCache(key, data, ttl) {
  _cache.set(key, { data, expireAt: Date.now() + (ttl || DEFAULT_CACHE_TTL) });
}

setInterval(() => {
  const now = Date.now();
  for (const [key, item] of _cache) {
    if (now > item.expireAt) _cache.delete(key);
  }
}, 120000);

const _pending = new Map();

async function tryRefresh() {
  const refreshToken = getStored(REFRESH_KEY);
  if (!refreshToken || !API_BASE) return null;

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.token && data.refresh_token) {
      setStored(TOKEN_KEY, data.token);
      setStored(REFRESH_KEY, data.refresh_token);
      setStored(USER_KEY, data.user ? JSON.stringify(data.user) : '');
      return data.token;
    }
  } catch {}

  [TOKEN_KEY, REFRESH_KEY, USER_KEY].forEach(k => setStored(k, ''));
  return null;
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE) {
    throw new Error('API URL is missing. Add VITE_API_URL in environment variables.');
  }

  const endpoint = String(path || '').startsWith('/') ? path : `/${path}`;
  const hasBody = options.body !== undefined && options.body !== null;
  const isAuthEndpoint = /^\/api\/auth\/(refresh|login|signup|forgot-password|reset-password)/.test(endpoint);
  const useCache = options.cache === true && !hasBody;
  const cacheTtl = options.cacheTtl || DEFAULT_CACHE_TTL;

  if (useCache) {
    const cacheKey = `GET:${endpoint}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;
  }

  if (!hasBody) {
    const dedupKey = `GET:${endpoint}`;
    const pending = _pending.get(dedupKey);
    if (pending) return pending;
    const promise = _doRequest(endpoint, options, hasBody, isAuthEndpoint, useCache, cacheTtl);
    _pending.set(dedupKey, promise);
    promise.finally(() => { setTimeout(() => _pending.delete(dedupKey), 200); });
    return promise;
  }

  return _doRequest(endpoint, options, hasBody, isAuthEndpoint, useCache, cacheTtl);
}

async function _doRequest(endpoint, options, hasBody, isAuthEndpoint, useCache, cacheTtl) {
  let response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
        ...getApiHeaders(),
        ...(options.headers || {}),
      },
      body: hasBody ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : undefined,
      signal: AbortSignal.timeout(30000),
    });
  } catch (error) {
    if (error.name === 'TimeoutError') throw new Error('Request timed out. Please try again.');
    throw new Error('Could not connect to the server. Please wait a moment and try again.');
  }

  if (response.status === 401 && !isAuthEndpoint && !options._retried) {
    if (!refreshPromise) refreshPromise = tryRefresh();
    const newToken = await refreshPromise;
    refreshPromise = null;
    if (newToken) {
      return apiRequest(endpoint, { ...options, headers: { ...(options.headers || {}), Authorization: `Bearer ${newToken}` }, _retried: true });
    }
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  const responseText = await response.text();
  let data = {};
  if (responseText) {
    try { data = JSON.parse(responseText); }
    catch {
      if (!response.ok) throw new Error(`Request failed with status ${response.status}.`);
      return { success: true, raw: responseText };
    }
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}.`);
  }

  if (useCache && response.ok) setCache(`GET:${endpoint}`, data, cacheTtl);
  return data;
}

export function clearApiCache(pathPrefix) {
  if (pathPrefix) {
    for (const key of _cache.keys()) { if (key.includes(pathPrefix)) _cache.delete(key); }
  } else {
    _cache.clear();
  }
}

export async function fetchParallel(requests) {
  return Promise.all(requests.map(req => apiRequest(req.path, req.options || {})));
}
