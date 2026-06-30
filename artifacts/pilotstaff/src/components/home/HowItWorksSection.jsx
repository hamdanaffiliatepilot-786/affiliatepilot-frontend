const STEPS = [
  { step: '1', title: 'Choose Your Agent', desc: 'Pick the AI employees your business needs most.', icon: '🤖' },
  { step: '2', title: 'Pay via PayPal', desc: 'Secure monthly payment. Cancel anytime.', icon: '💳' },
  { step: '3', title: 'Watch It Work', desc: 'Your AI works 24/7. Review, approve, or let it run.', icon: '🚀' },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-14">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(item => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-3xl mx-auto mb-5">{item.icon}</div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Step {item.step}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
