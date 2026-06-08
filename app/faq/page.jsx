export default function FAQ() {
  const faqs = [
    { q: "How does the Instagram Reel Product Finder work?", a: "Simply paste the link of an Instagram Reel. Our AI analyzes the video, identifies the product, and gives you the cheapest link on Amazon/Flipkart!", icon: "🎬" },
    { q: "Are the currency rates real-time?", a: "Yes, our currency converter fetches live global rates every minute.", icon: "💱" },
    { q: "How does the Price Drop Alert work?", a: "Enter your email and the product URL. Our PilotBot monitors the price 24/7 and instantly emails you when the price drops.", icon: "🔔" },
    { q: "Is my payment secure?", a: "Yes, all payments are processed securely via PayPal. We never see or store your card details.", icon: "🛡️" },
    { q: "Do I pay extra if I buy through affiliate links?", a: "No, you pay the exact same price. We earn a tiny commission from Amazon/Flipkart.", icon: "💡" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold mb-4">Got Questions? 🤔</h1>
        <p className="text-lg text-gray-500">We've got answers.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition flex gap-6 items-start">
            <div className="text-3xl">{faq.icon}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
