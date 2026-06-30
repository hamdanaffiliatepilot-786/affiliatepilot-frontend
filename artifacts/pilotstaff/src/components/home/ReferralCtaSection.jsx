import { Link } from 'wouter';

export default function ReferralCtaSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-500 to-teal-600 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4">Refer Friends, Earn Free Access</h2>
        <p className="text-emerald-100 text-lg mb-8">Share your referral link. For every 3 friends who sign up, get 1 month of Pro Tools free.</p>
        <Link href="/referrals" className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">Get My Referral Link →</Link>
      </div>
    </section>
  );
}
