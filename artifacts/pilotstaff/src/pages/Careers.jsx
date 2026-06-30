export default function Careers() {
  const openings = [
    { title: "Senior Full Stack Engineer", team: "Engineering", location: "Remote", type: "Full-time", level: "Senior", tags: ["Node.js", "React", "PostgreSQL", "AI APIs"] },
    { title: "AI Prompt Engineer", team: "AI Research", location: "Remote", type: "Full-time", level: "Mid-Senior", tags: ["LLM", "Prompt Engineering", "Python", "OpenAI"] },
    { title: "Growth Marketing Manager", team: "Marketing", location: "Remote", type: "Full-time", level: "Mid", tags: ["SEO", "Paid Ads", "SaaS", "Analytics"] },
    { title: "Product Designer (UI/UX)", team: "Design", location: "Remote", type: "Full-time", level: "Mid-Senior", tags: ["Figma", "SaaS Design", "Design Systems"] },
    { title: "Customer Success Manager", team: "Customer Success", location: "Remote", type: "Full-time", level: "Junior-Mid", tags: ["SaaS", "Onboarding", "Churn Reduction"] },
    { title: "Content Writer & SEO Specialist", team: "Marketing", location: "Remote", type: "Part-time", level: "Mid", tags: ["Content", "SEO", "AI Tools", "SaaS Writing"] },
  ];

  const perks = [
    { icon: "🌍", title: "100% Remote", desc: "Work from anywhere in the world." },
    { icon: "💰", title: "Competitive Pay", desc: "Market-rate salaries + equity options." },
    { icon: "🏥", title: "Health Benefits", desc: "Health, dental, and vision coverage." },
    { icon: "📚", title: "Learning Budget", desc: "$1,000/year for courses and conferences." },
    { icon: "🕰️", title: "Flexible Hours", desc: "Async-first culture. You own your schedule." },
    { icon: "🚀", title: "Equity", desc: "Be an owner. Share in our success." },
    { icon: "🛠️", title: "Best Tools", desc: "MacBook, Notion, Figma, any tool you need." },
    { icon: "🤖", title: "AI-First Culture", desc: "Use AI daily. Build the future of work." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-900 py-24 px-5 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-emerald-500/30">
            🚀 We're hiring — join the AI revolution
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5">Build the Future of AI Work</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Join a team obsessed with making AI actually useful for every business on the planet. 100% remote. High impact. Equity included.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="mb-4">
          <p className="text-blue-600 font-bold text-sm">WHY PILOTSTAFF</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1 mb-10">Perks & Benefits</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {perks.map((p) => (
            <div key={p.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <span className="text-3xl block mb-3">{p.icon}</span>
              <p className="font-bold text-slate-900 mb-1">{p.title}</p>
              <p className="text-sm text-slate-500">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-blue-600 font-bold text-sm mb-2">OPEN POSITIONS</p>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Current Openings ({openings.length})</h2>

        <div className="space-y-4">
          {openings.map((job) => (
            <div key={job.title} className="border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{job.team}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">🌍 {job.location}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">⏱ {job.type}</span>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">{job.level}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <a href={`mailto:careers@pilotstaff.com?subject=Application: ${job.title}`}
                  className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap">
                  Apply Now →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-10 text-center text-white">
          <h3 className="text-2xl font-extrabold mb-3">Don't see your role?</h3>
          <p className="text-white/80 mb-6">We're always looking for exceptional people. Send us your resume and tell us how you'd make PilotStaff better.</p>
          <a href="mailto:careers@pilotstaff.com?subject=Open Application"
            className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition">
            Send Open Application
          </a>
        </div>
      </div>
    </div>
  );
}
