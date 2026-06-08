export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold mb-4">📜 Legal & Policies</h1>
        <p className="text-lg text-gray-500">Last updated: January 2024</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 text-sm text-gray-600 leading-relaxed">
        
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">🔒 Privacy Policy</h2>
          <p className="mb-4">At AffiliatePilot, operated by Hamdan, your privacy is our priority. We collect email addresses voluntarily provided by users for Price Drop Alerts.</p>
          <p>We do not collect payment info. All purchases are made directly on the retailer's website. We use Google Analytics & AdSense.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">💳 Terms of Service</h2>
          <p className="mb-4">Prices displayed are estimates from third-parties. While our AI updates data regularly, we are not responsible for sudden price changes.</p>
          <p>Payments for dropshipped items are processed securely via PayPal.</p>
        </div>

        <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">💡 Affiliate Disclosure</h2>
          <p className="mb-4 font-bold text-gray-800">AffiliatePilot is a participant in the Amazon Services LLC Associates Program and Flipkart Affiliate Program.</p>
          <p>As an Amazon Associate, I (Hamdan) earn from qualifying purchases. You pay the same price, but we earn a small commission. This helps keep our AI tools free!</p>
        </div>

      </div>
    </div>
  );
}
