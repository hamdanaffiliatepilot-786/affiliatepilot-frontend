export default function FAQ() {
  const faqs = [
    { q: 'Is PilotStaff really free?', a: 'Yes! All 30+ tools are free forever with basic usage (3 uses per day per tool). AI Staff requires a paid subscription starting at $19/month.' },
    { q: 'What is AI Staff?', a: 'AI Staff are virtual employees that work 24/7. Unlike tools where you do one task at a time, staff members work on autopilot.' },
    { q: 'How is this different from ChatGPT?', a: "ChatGPT is a general chatbot. Our AI Staff are specialized workers — a Content Writer only writes content, an SEO Expert only does SEO." },
    { q: 'Can I cancel anytime?', a: 'Yes, cancel with one click from your dashboard. No hidden fees, no questions asked.' },
    { q: 'Do I need technical knowledge?', a: 'No! Everything is designed for non-technical users. Just type what you want in plain English.' },
    { q: 'Is my data safe?', a: "Absolutely. We don't sell your data. All data is encrypted in transit and at rest." },
    { q: 'What AI models do you use?', a: 'We use leading AI models including Gemini 2.0 Flash and Llama 3.3 70B for different tasks.' },
    { q: 'Can I use this for my clients?', a: 'Yes! Our Agency plan ($99/mo) includes white-label options so you can resell our AI services.' },
    { q: "What's the difference between Free and Pro?", a: 'Free gives you 3 uses per day per tool. Pro ($29/mo) gives you unlimited uses of all 30+ tools with faster generation.' },
    { q: 'Are AI Staff included in Pro?', a: 'No. AI Staff is hired separately. You only pay for the staff members you need, starting at $19/month each.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="text-center py-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">FAQ</h1>
          <p className="text-slate-500 text-lg">Everything you need to know about PilotStaff</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="bg-slate-50 rounded-xl border border-slate-200 group">
              <summary className="p-5 cursor-pointer font-semibold text-sm text-slate-700 flex justify-between items-center list-none">
                {f.q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
