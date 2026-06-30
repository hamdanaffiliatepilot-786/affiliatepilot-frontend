export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="text-center py-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: June 1, 2024</p>
        </div>
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide when creating an account (name, email), using our tools (input/output data), and making payments (handled by PayPal).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, communicate with you about your account, and process payments. We do not sell your personal information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
            <p>We use industry-standard encryption (TLS) for data in transit and encrypt sensitive data at rest. Your JWT tokens are stored securely in your browser's localStorage.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies</h2>
            <p>We use minimal cookies for session management and analytics. You can disable cookies in your browser settings, though some features may not work correctly.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Third-Party Services</h2>
            <p>We use PayPal for payment processing. Their privacy policy governs your payment data. We use AI model providers (OpenAI, Anthropic, Google) to power our tools.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@pilotstaff.com to exercise these rights.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact</h2>
            <p>For privacy questions, contact us at privacy@pilotstaff.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
