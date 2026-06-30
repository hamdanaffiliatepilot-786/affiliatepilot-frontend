import { Link } from 'wouter';

export default function PricingSection({ plans }) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Simple Pricing</h2>
        <p className="text-slate-500">Tools are free. Hire staff when you need them.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map(plan => (
          <div key={plan.name} className={`rounded-2xl p-7 border-2 transition-all ${plan.highlight ? 'border-blue-600 bg-blue-50/50 relative' : 'border-slate-200 bg-white'}`}>
            {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">UNLIMITED TOOLS</span>}
            <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="text-slate-400 text-sm">{plan.period}</span>
            </div>
            <Link href={plan.href} className={`block w-full text-center py-3 rounded-xl font-semibold text-sm ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}>{plan.cta}</Link>
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-slate-500 text-sm">AI Staff is hired separately starting at $19/month each</p>
    </section>
  );
}
