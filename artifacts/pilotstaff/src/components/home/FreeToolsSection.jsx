import { Link } from 'wouter';

export default function FreeToolsSection({ tools }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <span className="badge bg-blue-100 text-blue-700 mb-3 inline-block">Free Forever</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">77+ Free AI Tools</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">No signup required. Each tool solves a real business problem.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card overflow-hidden group relative flex flex-col animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            {tool.badge && (
              <span className={`absolute top-4 right-4 z-10 badge text-[10px] ${
                tool.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
                tool.badge === 'New' ? 'bg-violet-100 text-violet-700' :
                tool.badge === 'Viral' ? 'bg-red-100 text-red-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>{tool.badge}</span>
            )}
            {tool.image && (
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img src={tool.image} alt={tool.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className="p-5 flex-1">
              <span className="text-2xl mb-2 block">{tool.icon}</span>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">{tool.name}</h3>
              <p className="text-sm text-slate-500">{tool.desc}</p>
            </div>
          </Link>
        ))}
        <Link href="/tools" className="card p-5 flex flex-col items-center justify-center text-center border-dashed border-slate-300 hover:border-blue-400">
          <span className="text-3xl mb-2">➕</span>
          <p className="font-bold text-slate-600 text-sm">View All 77+ Tools</p>
        </Link>
      </div>
    </section>
  );
}
