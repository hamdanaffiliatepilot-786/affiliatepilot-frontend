export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto prose lg:prose-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Privacy Policy 🔒</h1>
        
        <p className="text-gray-500 text-sm text-center mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">We collect information you provide directly to us, such as your email address, shipping address, and phone number when you make a purchase or sign up for price alerts.</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">We use your information to process orders, deliver products, send price drop alerts, and improve our AI shopping tools. We do NOT sell your personal data to third parties.</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">3. AI Price Estimations</h2>
        <p className="text-gray-600 mb-4">Prices shown on our comparison tools are AI-estimated to give you an idea of savings. Actual prices on external websites may vary. Always verify the final price before purchasing.</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">4. Affiliate Links & Cookies</h2>
        <p className="text-gray-600 mb-4">AffiliatePilot uses affiliate links. If you purchase through our links, we may earn a small commission at no extra cost to you. We use cookies to track cart items and save your preferences for a better experience.</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">5. Third-Party Services</h2>
        <p className="text-gray-600 mb-4">We use trusted third-party services like PayPal for secure payments, CJ Dropshipping for order fulfillment, and Supabase for secure data storage. These services have their own privacy policies regarding your data.</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">6. Data Security</h2>
        <p className="text-gray-600 mb-4">We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">7. Contact Us</h2>
        <p className="text-gray-600 mb-4">If you have any questions about this Privacy Policy, please contact us at support@affiliatepilot.com.</p>
      </div>
    </div>
  );
}
