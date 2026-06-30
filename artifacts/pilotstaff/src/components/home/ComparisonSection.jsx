export default function ComparisonSection({ data }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-extrabold text-center mb-10">Human vs AI Employee</h2>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-3 bg-slate-50 text-sm font-bold text-slate-500 uppercase tracking-wider">
          <span className="p-4">Feature</span>
          <span className="p-4 text-center">Human</span>
          <span className="p-4 text-center">AI Employee</span>
        </div>
        {data.map((r, i) => (
          <div key={i} className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
            <span className="p-4 text-sm font-medium text-slate-700">{r.feature}</span>
            <span className={`p-4 text-sm text-center ${r.winner === 'human' ? 'text-emerald-600 font-semibold' : 'text-slate-400 line-through'}`}>{r.human}</span>
            <span className={`p-4 text-sm text-center ${r.winner === 'ai' ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}>{r.ai}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
