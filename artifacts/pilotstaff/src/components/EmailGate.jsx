import { useState } from "react";

export default function EmailGate({ usesToday, limit, onDismiss, onSubmit }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

  if (submitted || usesToday < limit) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Valid email required");
      return;
    }
    try {
      await fetch(`${API}/api/capture-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "tool_gate" }),
      });
      setSubmitted(true);
      if (onSubmit) onSubmit(email.trim());
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onDismiss}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onDismiss} className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 text-2xl">×</button>
        <div className="text-center mb-6">
          <span className="text-4xl block mb-3">⚡</span>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Daily Limit Reached</h3>
          <p className="text-sm text-slate-500">You've used {limit} free tools today. Enter your email to unlock unlimited access or come back tomorrow!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="your@email.com"
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500"
            required
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full btn-primary py-3 rounded-xl text-sm">Unlock Unlimited →</button>
        </form>
        <p className="text-[10px] text-slate-400 mt-3 text-center">No spam. We'll send you AI tips weekly.</p>
        <button onClick={onDismiss} className="block mx-auto mt-3 text-xs text-slate-400 hover:text-slate-600">Continue with limited access</button>
      </div>
    </div>
  );
}
