export default function FAQ() {
  const faqs = [
    { q: "How does the Instagram Reel Product Finder work?", a: "Simply paste the link of an Instagram Reel. Our AI analyzes the video, identifies the product, and gives you the cheapest link on Amazon/Flipkart!" },
    { q: "Are the currency rates real-time?", a: "Yes, our currency converter fetches live global rates every minute." },
    { q: "How does the Price Drop Alert work?", a: "Enter your email and the product URL. Our PilotBot monitors the price 24/7 and instantly emails you when the price drops." },
    { q: "Do I pay extra if I buy through affiliate links?", a: "No, you pay the exact same price. We earn a tiny commission from Amazon/Flipkart." }
  ];
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold mb-4">Got Questions? 🤔</h1>
        <p className="text-lg text-gray-500">We've got answers.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg text-gray-800">{faq.q}</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
