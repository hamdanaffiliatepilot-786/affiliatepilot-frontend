import { Link } from 'wouter';

export default function Founder() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-3xl mx-auto mb-6">F</div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">The Founder</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            PilotStaff was founded to make AI employees accessible to every business — not just Fortune 500s.
          </p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">The Story</h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            After watching small businesses struggle to compete against large companies with massive teams, the idea was simple: give every entrepreneur access to the same AI-powered workforce that the big players use.
          </p>
          <p className="text-slate-500 leading-relaxed">
            PilotStaff was built with one mission: to democratize AI employees so that a solo founder can operate with the power of a 50-person team.
          </p>
        </div>
        <div className="text-center">
          <Link href="/pricing" className="inline-block btn-primary px-8 py-4 rounded-2xl">Get Started Today →</Link>
        </div>
      </div>
    </div>
  );
}
