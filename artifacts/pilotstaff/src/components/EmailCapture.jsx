import { useState, useEffect } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export function EmailCapture() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem('email_capture_dismissed');
    const hasEmail = localStorage.getItem('captured_email');
    if (wasDismissed || hasEmail) return;
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch(`${API_BASE}/api/capture-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'popup' })
      });
    } catch {}
    localStorage.setItem('captured_email', email);
    setSubmitted(true);
    setTimeout(() => setShow(false), 3000);
  };

  const handleDismiss = () => {
    localStorage.setItem('email_capture_dismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 relative">
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">✕</button>
        {submitted ? (
          <div className="text-center py-4">
            <span className="text-4xl block mb-2">🎉</span>
            <p className="font-bold text-slate-900">You're in!</p>
            <p className="text-sm text-slate-500">Check your inbox for AI tips.</p>
          </div>
        ) : (
          <>
            <p className="text-2xl mb-2">🚀</p>
            <h3 className="font-bold text-slate-900 mb-1">Get Free AI Tips</h3>
            <p className="text-sm text-slate-500 mb-4">Join 2,000+ entrepreneurs getting weekly AI automation tips.</p>
            <form onSubmit={handleSubmit}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-blue-500 mb-3" required />
              <button type="submit" className="w-full btn-primary py-2.5 rounded-xl text-sm">Get Free Tips →</button>
            </form>
            <p className="text-[10px] text-slate-400 mt-2 text-center">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
