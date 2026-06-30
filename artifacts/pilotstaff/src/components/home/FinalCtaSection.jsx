import { Link } from 'wouter';

export default function FinalCtaSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-violet-600 py-20">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">Ready to Save Thousands Per Month?</h2>
        <p className="text-blue-100 text-lg mb-8">Join businesses that replaced expensive employees with AI.</p>
        <Link href="/staff" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">Get Started Now →</Link>
      </div>
    </section>
  );
}
