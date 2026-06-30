export default function SocialProofBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-4">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
        {['Used by 2,100+ businesses', '15,000+ tasks completed', '4.8★ average rating', '99.9% uptime'].map((text, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
