import { Link } from 'wouter';

const PLANS = [
  {
    name: 'Free', price: '$0', period: 'forever', desc: 'Try AI tools for free',
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
    name: 'Pro Tools', price: '$29', period: '/mo', desc: 'Unlimited tool usage — no daily limits',
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
    name: 'Agency', price: '$99', period: '/mo', desc: 'For agencies & teams',
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

export default function Pricing() {
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
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-slate-400 text-sm">{plan.period}</span>
              </div>
              {plan.href ? (
                <Link href={plan.href} className={`block w-full text-center py-3 rounded-xl font-semibold text-sm mb-6 ${plan.hl ? 'btn-primary' : 'btn-outline'}`}>{plan.cta}</Link>
              ) : (
                <button className={`block w-full text-center py-3 rounded-xl font-semibold text-sm mb-6 cursor-pointer ${plan.hl ? 'btn-primary' : 'btn-outline'}`} onClick={() => alert('PayPal integration requires VITE_API_URL to be configured.')}>
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
    </div>
  );
}
