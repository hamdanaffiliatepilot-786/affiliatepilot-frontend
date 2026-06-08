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
          <p className="text-gray-600 mb-4 leading-relaxed text-lg">Hi, I am <strong>Hamdan</strong>. I started AffiliatePilot because I was tired of manually checking prices across Amazon, Flipkart, and Instagram Reels.</p>
          <p className="text-gray-600 leading-relaxed text-lg">I built an AI Agent (PilotBot) that works 24/7 to track prices, find hidden coupons, and curate the best deals globally. This platform is my vision of making smart shopping accessible to everyone.</p>
        </div>
      </div>
    </main>
  );
}
