export default function FAQ() {
  const faqs = [
    { q: "Are the currency rates real-time?", a: "Yes, our currency converter fetches live rates every minute." },
    { q: "How does the Price Drop Alert work?", a: "Enter your email and product URL. Our system monitors the price and emails you when it drops." },
    { q: "Who runs AffiliatePilot?", a: "This platform is founded and managed by Hamdan using advanced AI automation." },
    { q: "Do I pay extra if I buy through affiliate links?", a: "No, you pay the same price. We just earn a small commission from the retailer." }
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      {faqs.map((faq, i) => (
        <div key={i} className="mb-4 bg-white p-4 rounded-lg border">
          <h3 className="font-bold text-lg">{faq.q}</h3>
          <p className="text-gray-600 mt-1">{faq.a}</p>
        </div>
      ))}
    </main>
  );
}
