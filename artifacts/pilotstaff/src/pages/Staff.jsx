import { useState, useEffect } from "react";
import { Link } from "wouter";
import { apiRequest } from "../lib/api";
import { useAuth } from "../lib/authContext";

const AI_STAFF = [
  { id: "receptionist", icon: "🤵", name: "AI Receptionist", price: 19, color: "from-blue-500 to-cyan-500", endpoint: "/api/agent/receptionist", demoType: "chat", desc: "Greets visitors, answers questions, qualifies leads, books appointments 24/7.", tasks: ["Answers 100+ questions instantly", "Qualifies leads automatically", "Books appointments in chat", "Collects name, phone, email", "Works in English, Hindi, Hinglish", "Escalates complex queries"], useCases: ["Clinics", "Real Estate", "Coaching Centers", "Salons", "Gyms", "Consulting"], demoPlaceholder: "Hi, I want to book an appointment for consultation" },
  { id: "sales-agent", icon: "🤝", name: "AI Sales Agent", price: 29, color: "from-emerald-500 to-teal-500", endpoint: "/api/agent/sales-agent", demoType: "chat", desc: "Qualifies leads, handles objections, sends follow-ups, and closes deals.", tasks: ["Qualifies with 5 questions", "Handles price objections", "Sends follow-up sequences", "Creates urgency", "Tracks deal stage", "Sends payment links"], useCases: ["SaaS", "Course Sellers", "E-commerce", "Agencies", "Coaches"], demoPlaceholder: "I run a digital marketing agency, tell me your pricing" },
  { id: "support-agent", icon: "🎧", name: "AI Support Agent", price: 29, color: "from-violet-500 to-purple-500", endpoint: "/api/agent/support-agent", demoType: "chat", desc: "Resolves complaints, processes refunds, tracks tickets 24/7.", tasks: ["Resolves 80% without human", "Processes refunds", "Creates tickets", "Step-by-step solutions", "Handles angry customers", "Escalates when needed"], useCases: ["E-commerce", "SaaS", "Apps", "Subscriptions", "Digital Products"], demoPlaceholder: "I ordered but haven't received it. Order #12345" },
  { id: "social-staff", icon: "📱", name: "AI Social Staff", price: 29, color: "from-pink-500 to-rose-500", endpoint: "/api/agent/social-staff", demoType: "content", desc: "Creates daily content for Instagram, Twitter, LinkedIn.", tasks: ["7 days content at once", "Platform-specific format", "Finds trending hashtags", "Suggests best times", "Engages with comments", "Tracks metrics"], useCases: ["Brands", "Influencers", "E-commerce", "Restaurants", "Fitness"], demoPlaceholder: "My business is a cafe in Mumbai targeting young professionals" },
  { id: "content-writer", icon: "✍️", name: "AI Content Writer", price: 19, color: "from-amber-500 to-orange-500", endpoint: "/api/agent/content-writer", demoType: "content", desc: "Writes SEO blogs, product descriptions, email sequences on demand.", tasks: ["1500+ word SEO articles", "Product descriptions", "Email sequences", "Ad copies", "Repurposes to 5 formats", "Auto-publishes to blog"], useCases: ["Bloggers", "Affiliate Marketers", "E-commerce", "SaaS", "News Sites"], demoPlaceholder: "Write a blog about best AI tools for small businesses 2025" },
  { id: "seo-expert", icon: "🔍", name: "AI SEO Expert", price: 39, color: "from-red-500 to-pink-500", endpoint: "/api/agent/seo-expert", demoType: "content", desc: "Finds keywords, audits website, creates content strategy.", tasks: ["20+ keywords with difficulty", "Complete SEO audit", "Technical analysis", "Content gap identification", "Backlink strategy", "Monthly roadmap"], useCases: ["New Websites", "Dropping Rankings", "Local Business", "E-commerce", "Bloggers"], demoPlaceholder: "My website is example.com, I sell organic skincare in India" },
  { id: "conversion-funnel-architect", icon: "🎯", name: "Conversion Funnel Architect", price: 49, color: "from-indigo-500 to-blue-600", endpoint: "/api/agent/conversion-funnel-architect", demoType: "content", desc: "Builds $10M+ funnels with traffic strategy, lead magnets, email sequences, and close pages.", tasks: ["Traffic source strategy", "Irresistible lead magnets", "Landing page structure", "Email nurture sequences", "The close & upsell", "Metrics at each step"], useCases: ["Course Creators", "SaaS", "E-commerce", "Coaches", "Agencies"], demoPlaceholder: "Create a funnel for my $997 coaching program targeting entrepreneurs", premium: true },
  { id: "linkedin-growth-hacker", icon: "📈", name: "LinkedIn Growth Hacker", price: 49, color: "from-sky-500 to-indigo-500", endpoint: "/api/agent/linkedin-growth-hacker", demoType: "content", desc: "Builds personal brands for founders that generate inbound leads.", tasks: ["Profile optimization", "3 content pillars", "5 viral post frameworks", "DM outreach scripts", "15-min daily routine", "Connection strategy"], useCases: ["Founders", "Consultants", "B2B Sales", "Agency Owners", "Executives"], demoPlaceholder: "I am a SaaS founder wanting to build authority and get inbound leads on LinkedIn", premium: true },
  { id: "reputation-manager", icon: "⭐", name: "Reputation Manager", price: 39, color: "from-amber-400 to-yellow-500", endpoint: "/api/agent/reputation-manager", demoType: "content", desc: "Protects brands online. Gets 5-star reviews, buries negatives.", tasks: ["5-star review templates", "Negative review burial", "Review response templates", "Social listening setup", "ORM strategy", "Crisis management"], useCases: ["Restaurants", "Clinics", "Agencies", "E-commerce", "Local Business"], demoPlaceholder: "I got a 1-star review on Google that is hurting my business. Help me respond and bury it.", premium: true },
  { id: "email-marketer", icon: "📧", name: "AI Email Marketer", price: 39, color: "from-cyan-500 to-blue-500", endpoint: "/api/agent/email-marketer", demoType: "content", desc: "Runs end-to-end email campaigns: sequences, newsletters, automations.", tasks: ["Full email sequence strategy", "Subject lines that get opened", "Segmentation recommendations", "A/B test ideas for emails", "Re-engagement campaigns", "Newsletter content calendar"], useCases: ["SaaS", "E-commerce", "Coaches", "Course Creators", "Newsletters"], demoPlaceholder: "Create a 5-email welcome sequence for my SaaS product targeting freelancers", premium: true },
  { id: "video-scriptwriter", icon: "🎬", name: "AI Video Scriptwriter", price: 29, color: "from-rose-500 to-red-500", endpoint: "/api/agent/video-scriptwriter", demoType: "content", desc: "Writes scripts for YouTube, TikTok, Instagram Reels, and ads.", tasks: ["YouTube long-form scripts", "TikTok & Reels hooks", "YouTube Shorts scripts", "Video ad scripts (15/30/60s)", "Podcast episode outlines", "Viral hook formulas"], useCases: ["YouTubers", "Coaches", "E-commerce Brands", "Agencies", "Course Creators"], demoPlaceholder: "Write a YouTube script: Top 10 AI tools for small businesses in 2025" },
];

function LiveUserCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(147 + Math.floor(Math.random() * 50));
    const timer = setInterval(() => {
      setCount((prev) => Math.max(120, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return <span>{count}</span>;
}

function HireModal({ staff, onClose }) {
  const { token } = useAuth();
  const [err, setErr] = useState("");
  const [processing, setProcessing] = useState(false);

  const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

  const handlePayPalClick = async () => {
    if (!token) { setErr("Please login to subscribe."); return; }
    if (!API) { setErr("API URL is missing."); return; }

    setProcessing(true);
    setErr("");
    try {
      const response = await fetch(`${API}/api/create-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ agentId: staff.id, price: staff.price, name: staff.name }),
      });
      const result = await response.json().catch(() => ({}));
      if (result.approvalUrl) {
        window.location.href = result.approvalUrl;
      } else {
        setErr(result.error || "Could not create PayPal order. Contact support.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => !processing && onClose()}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => !processing && onClose()} disabled={processing} className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 text-2xl disabled:opacity-40">×</button>

        <div className="text-center mb-6">
          <span className="text-5xl block mb-3">{staff.icon}</span>
          <h2 className="text-xl font-extrabold text-slate-900">{staff.name}</h2>
          <p className="text-4xl font-extrabold mt-3">${staff.price}<span className="text-base text-slate-400 font-normal">/mo</span></p>
          <p className="text-sm text-slate-500 mt-2">Secure payment via PayPal · Cancel anytime</p>
        </div>

        <div className="border-t pt-6">
          {!token ? (
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-4">Please login to hire AI staff.</p>
              <Link href="/login" className="btn-primary px-6 py-3 rounded-xl text-sm inline-block">Login to Continue</Link>
            </div>
          ) : (
            <button onClick={handlePayPalClick} disabled={processing} className="w-full bg-[#0070ba] hover:bg-[#005ea6] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-bold transition">
              {processing ? "Processing..." : "Subscribe via PayPal"}
            </button>
          )}

          {err && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">{err}</div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">Secure payment · Server-verified pricing · Instant activation</p>
      </div>
    </div>
  );
}

function StaffDemo({ staff }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = async (event) => {
    event.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      let body = {};
      if (staff.demoType === "chat") {
        body.question = input;
        if (staff.id === "receptionist") body.businessType = "general business";
        if (staff.id === "sales-agent") { body.product = "AI services"; body.price = "$29/month"; }
        if (staff.id === "support-agent") { body.orderNumber = "N/A"; body.issueType = "general"; }
      } else if (staff.id === "social-staff") {
        body = { niche: input, days: 3, platforms: "Instagram, Twitter" };
      } else if (staff.id === "content-writer") {
        body = { topic: input, wordCount: 500, tone: "professional" };
      } else if (staff.id === "seo-expert") {
        body = { url: input, niche: input, goal: "rank higher" };
      } else {
        body = { prompt: input, question: input };
      }

      const data = await apiRequest(staff.endpoint, { method: "POST", body });
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: err?.message || "Could not run the demo." });
    } finally {
      setLoading(false);
    }
  };

  const output = result?.output || result?.answer || result?.content || result?.audit || result?.script || result?.result || result?.message || "";

  return (
    <details className="relative">
      <summary className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer list-none">
        ⚙️ Free Demo
      </summary>
      <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl z-50">
        <form onSubmit={run}>
          <p className="text-xs font-bold text-slate-700 mb-2">{staff.name} Demo</p>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={staff.demoPlaceholder} rows={4}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 outline-none focus:border-blue-400 resize-none" />
          <button type="submit" disabled={loading || !input.trim()} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-xl text-xs font-bold">
            {loading ? "Working..." : "Run Demo"}
          </button>
        </form>
        {result && (
          <div className={`mt-3 rounded-xl p-3 text-xs whitespace-pre-wrap max-h-56 overflow-y-auto ${result.success === false ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-700"}`}>
            {result.success === false ? result.error || "Demo failed." : output || "Demo completed successfully."}
          </div>
        )}
      </div>
    </details>
  );
}

export default function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [filter, setFilter] = useState("all");

  const visibleStaff = filter === "all" ? AI_STAFF : filter === "starter" ? AI_STAFF.filter((s) => !s.premium) : AI_STAFF.filter((s) => s.premium);

  return (
    <main className="bg-white text-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-900 py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-blue-500/30">
            🤖 <LiveUserCount /> businesses using PilotStaff right now
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            Hire AI Staff that works <span className="text-blue-400">24/7</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Build your AI team for sales, support, content, social media and growth. Try every staff member before hiring.
          </p>
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Link href="/dashboard" className="rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-bold">
              Open Dashboard
            </Link>
            <a href="#staff-list" className="rounded-xl border border-white/20 hover:bg-white/10 px-5 py-3 text-sm font-bold">
              Explore AI Staff
            </a>
          </div>
        </div>
      </section>

      <section id="staff-list" className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-600 font-bold text-sm">YOUR AI WORKFORCE</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Choose the staff you need</h2>
          </div>
          <div className="flex gap-2">
            {[["all", "All Staff"], ["starter", "Starter"], ["premium", "Premium"]].map(([id, label]) => (
              <button key={id} onClick={() => setFilter(id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${filter === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleStaff.map((staff) => (
            <article key={staff.id} className="bg-white rounded-3xl border border-slate-200 overflow-visible shadow-sm">
              <div className={`h-2 bg-gradient-to-r ${staff.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-4xl">{staff.icon}</div>
                  {staff.premium && <span className="text-[10px] font-bold rounded-full bg-amber-100 text-amber-700 px-2 py-1">PREMIUM</span>}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-4">{staff.name}</h3>
                <p className="text-sm text-slate-500 mt-2 min-h-[60px]">{staff.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {staff.useCases.slice(0, 4).map((uc) => (
                    <span key={uc} className="text-[10px] rounded-full bg-slate-100 text-slate-600 px-2 py-1">{uc}</span>
                  ))}
                </div>
                <ul className="mt-5 space-y-2">
                  {staff.tasks.slice(0, 4).map((task) => (
                    <li key={task} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-emerald-500">✓</span>{task}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-2">
                  <button onClick={() => setSelectedStaff(staff)} className={`flex-1 rounded-xl bg-gradient-to-r ${staff.color} text-white py-2.5 text-sm font-bold`}>
                    Hire for ${staff.price}/mo
                  </button>
                  <div className="w-28">
                    <StaffDemo staff={staff} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedStaff && <HireModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />}
    </main>
  );
}
