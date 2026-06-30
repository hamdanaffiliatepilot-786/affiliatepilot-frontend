import { useState } from 'react';
import { Link } from 'wouter';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) setSent(true);
      else setError(data.error || 'Could not send reset email. Try again.');
    } catch {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-500">We'll send you a link to reset your password.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          {sent ? (
            <div className="text-center py-4">
              <span className="text-5xl block mb-4">📧</span>
              <h3 className="font-bold text-slate-900 mb-2">Check Your Email</h3>
              <p className="text-slate-500 text-sm mb-6">If that email is registered, you'll receive a reset link shortly.</p>
              <Link href="/login" className="btn-primary px-6 py-3 rounded-xl text-sm inline-block">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-sm font-semibold transition disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm text-slate-500">
                <Link href="/login" className="text-blue-600 hover:underline">Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
