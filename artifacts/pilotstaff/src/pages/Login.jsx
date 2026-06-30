import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../lib/authContext';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        login(data.token, data.refresh_token, data.user);
        setLocation('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch {
      setError('Could not connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="25" fill="#2563eb" />
              <text x="50" y="68" textAnchor="middle" fill="white" fontSize="52" fontWeight="800">P</text>
            </svg>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to your PilotStaff account</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">{error}</div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Your password"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition pr-12"
                  autoComplete="current-password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 text-xs">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/reset-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-sm font-semibold transition disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
