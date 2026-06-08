export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-900 text-white py-20 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">About AffiliatePilot</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">Revolutionizing smart shopping with AI automation.</p>
      </section>

      {/* Founder Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" alt="Team working" className="rounded-3xl shadow-2xl w-full h-96 object-cover" />
          <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hidden md:block">
            <p className="text-sm font-bold">Founded in 2024</p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900">Meet the Founder: <span className="text-blue-600">Hamdan</span></h2>
          <p className="text-gray-600 mb-4 leading-relaxed text-lg">Hi, I am <strong>Hamdan</strong>. I started AffiliatePilot because I was tired of manually checking prices across Amazon, Flipkart, and Instagram Reels.</p>
          <p className="text-gray-600 leading-relaxed text-lg">I built an AI Agent (PilotBot) that works 24/7 to track prices, find hidden coupons, and curate the best deals globally. This platform is my vision of making smart shopping accessible to everyone.</p>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="font-bold text-xl mb-2">AI Automation</h3>
              <p className="text-gray-600 text-sm">We use cutting-edge AI to automate deal finding and price tracking.</p>
            </div>
            <div className="p-8 bg-green-50 rounded-3xl border border-green-100 text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">Real-time tools ensure you get the lowest price across platforms.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100 text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold text-xl mb-2">Trust & Transparency</h3>
              <p className="text-gray-600 text-sm">Honest reviews, clear affiliate disclosures, and no hidden charges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
