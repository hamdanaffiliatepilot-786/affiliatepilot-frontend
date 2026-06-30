export default function Guidelines() {
  const rules = [
    { icon: '✅', title: 'Commercial Use Allowed', desc: 'All AI-generated content from our tools can be used for commercial purposes. You own what you create.' },
    { icon: '🚫', title: 'No Harmful Content', desc: 'Do not use our tools to generate hate speech, harassment, illegal content, or anything designed to harm others.' },
    { icon: '📋', title: 'No Spam or Deception', desc: 'Do not use our AI tools to generate deceptive content, phishing emails, or misleading advertising.' },
    { icon: '🔒', title: 'Respect Privacy', desc: "Do not use our tools to process or expose other people's personal information without their consent." },
    { icon: '⚖️', title: 'Legal Compliance', desc: 'You are responsible for ensuring that your use of AI-generated content complies with applicable laws in your jurisdiction.' },
    { icon: '🤝', title: 'Fair Use', desc: 'Free plan users get 3 uses per day per tool. Please respect these limits — they ensure fair access for everyone.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="text-center py-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Usage Guidelines</h1>
          <p className="text-slate-500 text-lg">How to use PilotStaff responsibly</p>
        </div>
        <div className="space-y-4">
          {rules.map((rule, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{rule.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{rule.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
