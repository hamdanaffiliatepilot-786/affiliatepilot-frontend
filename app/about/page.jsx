export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-900 text-white py-20 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">About AffiliatePilot</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">Revolutionizing smart shopping with AI automation. Founded by Hamdan.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" alt="Team working" className="rounded-2xl shadow-xl w-full h-80 object-cover" />
        <div>
          <h2 className="text-3xl font-bold mb-4">Meet the Founder: Hamdan</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">Hi, I am <strong>Hamdan</strong>, the founder of AffiliatePilot. I started this platform with a simple vision: <em>"Why should people waste hours comparing prices when AI can do it in seconds?"</em></p>
          <p className="text-gray-600 leading-relaxed">AffiliatePilot is not just a website; it is an AI-powered engine. Our internal agent, PilotBot, works 24/7 to track prices, find hidden coupons, and curate the best deals globally so you never overpay for anything.</p>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-bold text-xl mb-2">AI Automation</h3>
              <p className="text-gray-600 text-sm">We use cutting-edge AI to automate deal finding and price tracking.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">Real-time tools ensure you get the lowest price across platforms.</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold text-xl mb-2">Trust & Transparency</h3>
              <p className="text-gray-600 text-sm">Honest reviews, clear affiliate disclosures, and no hidden charges.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
