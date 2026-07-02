import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { apiRequest } from '../lib/api';
import { useAuth } from '../lib/authContext';

const PLANS = [
  {
    id: 'free', name: 'Free', price: '$0', period: 'forever', desc: 'Try AI tools for free',
    features: [
      { text: 'All 30+ free tools', ok: true },
      { text: '3 uses per day per tool', ok: true },
      { text: 'Basic AI output', ok: true },
      { text: 'Unlimited usage', ok: false },
      { text: 'Priority AI models', ok: false },
      { text: 'Analytics', ok: false },
    ],
    cta: 'Start Free', href: '/tools', hl: false
  },
  {
    id: 'pro', name: 'Pro Tools', price: 29, period: '/mo', desc: 'Unlimited tool usage — no daily limits',
    features: [
      { text: 'All 30+ free tools', ok: true },
      { text: 'Unlimited daily uses', ok: true },
      { text: 'Priority AI models', ok: true },
      { text: 'Faster generation', ok: true },
      { text: 'Analytics dashboard', ok: true },
      { text: 'Email support', ok: true },
    ],
    cta: 'Subscribe via PayPal', href: null, hl: true
  },
  {
    id: 'agency', name: 'Agency', price: 99, period: '/mo', desc: 'For agencies & teams',
    features: [
      { text: 'Everything in Pro', ok: true },
      { text: 'White-label option', ok: true },
      { text: 'API access', ok: true },
      { text: '5 team seats', ok: true },
      { text: 'Priority support', ok: true },
      { text: 'Custom AI training', ok: true },
    ],
    cta: 'Subscribe via PayPal', href: null, hl: false
  },
];

// Loads the PayPal JS SDK once and reuses it across modal opens.
let paypalSdkPromise = null;
function loadPayPalSdk(clientId) {
  if (window.paypal) return Promise.resolve(window.paypal);
  if (paypalSdkPromise) return paypalSdkPromise;
  paypalSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture`;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
    document.body.appendChild(script);
  });
  return paypalSdkPromise;
}

function CheckoutModal({ plan, onClose }) {
  const { token } = useAuth();
  const [err, setErr] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const buttonsRef = useState(() => ({ current: null }))[0];
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

  useEffect(() => {
    if (!token || !paypalClientId || done) return;
    let cancelled = false;

    loadPayPalSdk(paypalClientId)
      .then((paypal) => {
        if (cancelled || !buttonsRef.current) return;
        buttonsRef.current.innerHTML = '';

        paypal.Buttons({
          style: { layout: 'vertical', color: 'blue', shape: 'pill', label: 'paypal' },
          createOrder: (data, actions) => actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
              description: `${plan.name} - PilotStaff`,
              amount: { currency_code: 'USD', value: String(plan.price) },
            }],
          }),
          onApprove: async (data) => {
            setProcessing(true);
            setErr('');
            try {
              const result = await apiRequest('/api/subscribe-tools', {
                method: 'POST',
                body: { planId: plan.id, paypalOrderId: data.orderID },
              });
              if (result?.success === false) {
                setErr(result.error || 'Payment captured but activation failed. Contact support.');
              } else {
                setDone(true);
              }
            } catch (e) {
              setErr(e?.message || 'Could not verify payment. Contact support with your PayPal receipt.');
            } finally {
              setProcessing(false);
            }
          },
          onError: () => setErr('PayPal encountered an error. Please try again.'),
        }).render(buttonsRef.current);
      })
      .catch(() => setErr('Could not load PayPal. Please refresh and try again.'));

    return () => { cancelled = true; };
  }, [token, paypalClientId, done]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => !processing && onClose()}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => !processing && onClose()} disabled={processing} className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 text-2xl disabled:opacity-40">×</button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-900">{plan.name}</h2>
          <p className="text-4xl font-extrabold mt-3">${plan.price}<span className="text-base text-slate-400 font-normal">/mo</span></p>
          <p className="text-sm text-slate-500 mt-2">Secure payment via PayPal · Cancel anytime</p>
        </div>

        <div className="border-t pt-6">
          {!token ? (
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-4">Please login to subscribe.</p>
              <Link href="/login" className="btn-primary px-6 py-3 rounded-xl text-sm inline-block">Login to Continue</Link>
            </div>
          ) : !paypalClientId ? (
            <div className="text-sm text-red-600 text-center">PayPal is not configured. Add VITE_PAYPAL_CLIENT_ID in environment variables.</div>
          ) : done ? (
            <div className="text-center text-emerald-600 text-sm font-semibold">✅ Subscribed! Refresh your dashboard to start using {plan.name}.</div>
          ) : (
            <>
              <div ref={(el) => (buttonsRef.current = el)} />
              {processing && <p className="text-center text-xs text-slate-500 mt-2">Verifying payment...</p>}
            </>
          )}

          {err && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">{err}</div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">Secure payment · Server-verified pricing · Instant activation</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [checkoutPlan, setCheckoutPlan] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">Simple, Transparent Pricing</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Start free. Upgrade when you need more power.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div key={plan.name} className={`rounded-2xl p-8 border-2 transition-all ${plan.hl ? 'border-blue-600 bg-blue-50/50 relative' : 'border-slate-200 bg-white'}`}>
              {plan.hl && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>}
              <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</span>
                <span className="text-slate-400 text-sm">{plan.period}</span>
              </div>
              {plan.href ? (
                <Link href={plan.href} className={`block w-full text-center py-3 rounded-xl font-semibold text-sm mb-6 ${plan.hl ? 'btn-primary' : 'btn-outline'}`}>{plan.cta}</Link>
              ) : (
                <button className={`block w-full text-center py-3 rounded-xl font-semibold text-sm mb-6 cursor-pointer ${plan.hl ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCheckoutPlan(plan)}>
                  {plan.cta}
                </button>
              )}
              <ul className="space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${f.ok ? 'text-slate-700' : 'text-slate-300 line-through'}`}>
                    {f.ok ? (
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">AI Staff Pricing</h2>
          <p className="text-slate-500 mb-6">Hire individual AI staff members starting at $19/mo each</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'AI Receptionist', price: '$19/mo' },
              { name: 'AI Content Writer', price: '$19/mo' },
              { name: 'AI Video Scriptwriter', price: '$19/mo' },
              { name: 'AI Sales Agent', price: '$29/mo' },
              { name: 'AI Support Agent', price: '$29/mo' },
              { name: 'AI Social Staff', price: '$29/mo' },
              { name: 'AI SEO Expert', price: '$39/mo' },
              { name: 'Reputation Manager', price: '$39/mo' },
              { name: 'Funnel Architect', price: '$49/mo' },
              { name: 'LinkedIn Hacker', price: '$49/mo' },
            ].map(s => (
              <div key={s.name} className="flex justify-between items-center bg-white rounded-xl p-4 border border-slate-200">
                <span className="text-sm font-medium text-slate-700">{s.name}</span>
                <span className="text-sm font-bold text-blue-600">{s.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/staff" className="inline-block btn-primary px-8 py-3.5 rounded-xl">View All AI Staff →</Link>
          </div>
        </div>
      </section>

      {checkoutPlan && <CheckoutModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} />}
    </div>
  );
}
