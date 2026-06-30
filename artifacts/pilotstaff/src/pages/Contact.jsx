import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-900 py-20 px-5 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-blue-500/30">
            💬 We reply within 24 hours
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-slate-300 text-lg">Have a question, partnership idea, or need help? Reach out — we read every message.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Get in Touch</h2>
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">Message Sent!</h3>
              <p className="text-emerald-600">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Name *</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="Your name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1">Subject</label>
                <select name="subject" value={form.subject} onChange={handle}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-white">
                  <option value="">Select a topic</option>
                  <option>General Question</option>
                  <option>Billing & Subscriptions</option>
                  <option>Technical Support</option>
                  <option>Partnership Inquiry</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Press & Media</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1">Message *</label>
                <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us how we can help..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 resize-none" />
              </div>
              <button type="submit" disabled={sending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-bold transition">
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Other Ways to Reach Us</h2>
          {[
            { icon: "📧", title: "Email Support", detail: "support@pilotstaff.com", sub: "For billing, account, and technical issues" },
            { icon: "💼", title: "Partnerships", detail: "partners@pilotstaff.com", sub: "Agency partnerships, white-label, and integrations" },
            { icon: "📰", title: "Press & Media", detail: "press@pilotstaff.com", sub: "Media kits, interviews, and coverage requests" },
            { icon: "⚡", title: "Response Time", detail: "Under 24 hours", sub: "Monday – Friday, 9 AM – 6 PM IST" },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-blue-600 text-sm font-medium">{item.detail}</p>
                <p className="text-slate-500 text-xs mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="font-bold text-slate-900 mb-2">🚀 Need immediate help?</p>
            <p className="text-sm text-slate-600">Check our <a href="/faq" className="text-blue-600 font-semibold hover:underline">FAQ page</a> for instant answers to common questions, or browse the <a href="/tools" className="text-blue-600 font-semibold hover:underline">free AI tools</a> — no login required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
