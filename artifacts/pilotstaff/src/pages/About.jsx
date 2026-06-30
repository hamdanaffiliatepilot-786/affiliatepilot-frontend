import { Link } from 'wouter';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="text-center py-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">About PilotStaff</h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            PilotStaff is an AI-powered SaaS platform that lets businesses hire virtual AI employees and use 30+ free AI tools.
          </p>
        </div>
        <div className="space-y-8">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🎯 Our Mission</h2>
            <p className="text-slate-500 leading-relaxed">To make AI employees accessible to every business, regardless of size or budget.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">⚡ The Problem</h2>
            <p className="text-slate-500 leading-relaxed">
              Small businesses can&apos;t afford $5,000/month for a content writer, $3,000/month for an SEO expert, and $2,500/month for a social media manager. We replace all of them with AI staff starting at $19/month each.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 By The Numbers</h2>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div><p className="text-3xl font-extrabold text-blue-600">34+</p><p className="text-sm text-slate-400">Free AI Tools</p></div>
              <div><p className="text-3xl font-extrabold text-violet-600">9</p><p className="text-sm text-slate-400">AI Staff Members</p></div>
              <div><p className="text-3xl font-extrabold text-emerald-600">99.9%</p><p className="text-sm text-slate-400">Uptime</p></div>
              <div><p className="text-3xl font-extrabold text-orange-600">$5K+</p><p className="text-sm text-slate-400">Saved Per User</p></div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🔒 Security &amp; Privacy</h2>
            <p className="text-slate-500 leading-relaxed">Your data is encrypted in transit and at rest. We never sell your data.</p>
          </div>
          <div className="text-center pt-4">
            <Link href="/pricing" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition">
              Start Using PilotStaff →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
