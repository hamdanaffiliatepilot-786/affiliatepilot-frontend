import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../lib/authContext';
import { apiRequest } from '../lib/api';

export default function Referrals() {
  const { user } = useAuth();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const loadReferral = async (email) => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest(`/api/my-referral?email=${encodeURIComponent(email)}`);
      if (data.success) setReferral(data);
      else setError(data.error || 'Could not load referral details.');
    } catch (e) {
      setError(e?.message || 'Could not load referral details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) loadReferral(user.email);
  }, [user?.email]);

  const referralLink = referral?.code ? `${window.location.origin}/?ref=${referral.code}` : '';

  const copyLink = async () => {
    if (!referralLink) { setError('Referral link is not available yet.'); return; }
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setMessage('Referral link copied!');
      setTimeout(() => { setCopied(false); setMessage(''); }, 2500);
    } catch {
      setError('Could not copy the referral link.');
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900">Referral Program</h1>
          <p className="mt-4 text-slate-500">Please log in to view your referral details.</p>
          <Link href="/login" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Sign In</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Referral Program</h1>
          <p className="text-slate-500 text-lg">Refer friends, earn free access.</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center mb-6">
          <h2 className="text-2xl font-extrabold mb-2">Earn Free Pro Access</h2>
          <p className="text-emerald-100">For every 3 friends who sign up, get 1 month of Pro Tools free.</p>
        </div>

        {message && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-3 rounded-xl mb-4">{message}</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h3 className="font-bold text-slate-900 mb-4">Your Referral Link</h3>
          {loading ? (
            <div className="h-12 bg-slate-100 animate-pulse rounded-xl" />
          ) : referralLink ? (
            <div className="flex gap-3">
              <input readOnly value={referralLink} className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-600 outline-none" />
              <button onClick={copyLink} className="btn-primary px-5 py-3 rounded-xl text-sm whitespace-nowrap">
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-500 text-sm">Your referral link will appear here once your account is fully set up.</p>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Referral Code', value: referral?.code || '—', icon: '🎟️' },
            { label: 'Total Clicks', value: referral?.clicks ?? 0, icon: '👆' },
            { label: 'Signups', value: referral?.signups ?? 0, icon: '👥' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <span className="text-2xl block mb-2">{stat.icon}</span>
              <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
