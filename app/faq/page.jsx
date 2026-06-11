export default function FAQ() {
  const faqs = [
    { q: "How does the Instagram Reel Finder work?", a: "Simply paste the link of an Instagram Reel. Our AI scans the video content and finds the exact product, then compares its price across 8 websites!" },
    { q: "Are the prices shown real-time?", a: "We use a mix of live APIs and AI estimations. For exact live pricing, you can click the 'Visit' button to go directly to the store's page." },
    { q: "What is AffiliatePilot Pro?", a: "Pro unlocks unlimited Reel searches, instant coupon fetching, and priority email price drop alerts for just $9/month." },
    { q: "Is my data safe?", a: "Absolutely. We only ask for an email if you set a price drop alert. We never sell your data." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center">Frequently Asked Questions ❓</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
