import { Link } from 'wouter';

export default function AiStaffSection({ staff }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge bg-violet-100 text-violet-700 mb-3 inline-block">Save Thousands/Month</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Hire AI Employees</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Each replaces a $2,000–$5,000/month human employee.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {staff.map((agent, i) => (
            <div key={agent.name} className={`bg-white rounded-2xl overflow-hidden border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-up ${agent.premium ? 'border-violet-200 relative' : 'border-slate-200 hover:border-slate-300'}`} style={{ animationDelay: `${i * 60}ms` }}>
              {agent.premium && <span className="absolute top-3 right-3 z-10 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">PREMIUM</span>}
              {agent.image && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img src={agent.image} alt={agent.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{agent.icon}</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900">${agent.price}</span>
                    <span className="text-sm text-slate-400">/mo</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{agent.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{agent.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {agent.tasks.map(t => (
                    <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
                <Link href="/staff" className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition ${agent.premium ? 'border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white' : 'btn-outline'}`}>Hire This Agent →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
