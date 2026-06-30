const CHANGELOG = [
  {
    version: "2.1.0",
    date: "June 2025",
    type: "major",
    highlights: ["Expanded to 77+ free AI tools", "Added 4 new AI Staff: Email Marketer, Video Scriptwriter, and more", "New E-Commerce tool category with Amazon, Etsy, and Dropshipping tools", "New Finance & Fundraising category"],
    changes: {
      "New Tools": [
        "AI Press Release Writer — Professional press releases in AP style",
        "AI Newsletter Writer — Engaging email newsletters with subject lines",
        "Twitter Thread Writer — 10-tweet viral threads on any topic",
        "7-Email Sales Sequence — Complete nurture sequence from welcome to close",
        "Cold DM Generator — High-converting DMs for LinkedIn, IG, Twitter",
        "YouTube Script Writer — Full video scripts with hooks and CTAs",
        "Podcast Episode Script — Complete scripts with intros, segments, outros",
        "Keyword Cluster Generator — Topic clusters with pillar + supporting keywords",
        "Google Ads Copy Generator — 5 RSA campaigns with sitelinks",
        "Email Subject Line Generator — 20 subject lines with open rate predictions",
        "TikTok Caption Generator — 10 viral captions with hashtags",
        "A/B Test Idea Generator — 10 high-impact tests with hypotheses",
        "Brand Voice Guide — Complete brand voice and tone guidelines",
        "AI Business Plan Generator — Full business plan with financials",
        "SWOT Analysis Generator — Complete SWOT with strategy recommendations",
        "Job Description Generator — Attractive postings that attract top talent",
        "NDA Generator — Professional non-disclosure agreements",
        "Refund Policy Generator — Consumer-friendly policy",
        "Cookie Policy Generator — GDPR-compliant cookie policies",
        "Pitch Deck Outline — 12-slide deck with talking points",
        "AI Cover Letter Writer — Personalized, compelling cover letters",
        "LinkedIn Summary Writer — 3 styles: story, results, thought leader",
        "Personal Bio Generator — 5 bio lengths from 25 to 300 words",
        "Meeting Agenda Generator — Professional agendas with time allocations",
        "SMART Goals Generator — 5 SMART goals with action plans",
        "Pros and Cons Analyzer — 8+8 points with impact levels",
        "AI Brainstorming Tool — 25 ideas using 5 frameworks",
        "FAQ Generator — 15 FAQs with JSON-LD schema",
        "Survey Question Generator — 15-question surveys",
        "Project Plan Generator — Full plans with milestones and risk register",
        "SOP Writer — Standard Operating Procedures",
        "Amazon Listing Writer — Title, bullets, description + keywords",
        "Etsy Shop Description — Story-driven with all 13 tags",
        "Product Title Optimizer — For Amazon, Shopify, Etsy, eBay",
        "Dropshipping Product Ideas — 10 profitable products with analysis",
        "Promotional Copy Generator — Sale emails, social, SMS, push",
        "Investor Pitch Email — 3 types: angel, VC, strategic",
        "Grant Proposal Writer — Complete proposals for nonprofits",
        "Financial Report Summary — CFO-level summaries with KPIs",
        "Budget Planner — Detailed plans with projections",
      ],
      "New AI Staff": [
        "AI Email Marketer — End-to-end email campaigns and automation",
        "AI Video Scriptwriter — YouTube, TikTok, and ad scripts",
      ],
      "New Pages": [
        "Contact page with department routing",
        "Careers page with 6 open positions",
        "Sitemap for improved SEO indexing",
      ],
    },
  },
  {
    version: "2.0.0",
    date: "April 2025",
    type: "major",
    highlights: ["Launched 34 free AI tools", "PayPal subscription integration", "Referral program with rewards", "Supabase backend migration"],
    changes: {
      "Platform": [
        "Complete rebuild with React + Vite frontend",
        "Node.js + Express backend with Gemini and Groq AI",
        "Supabase database for users, subscriptions, tasks",
        "PayPal payments for AI Staff subscriptions",
        "JWT authentication with email verification",
      ],
      "AI Tools": [
        "AI Humanizer, SEO Audit Checker, YouTube to Blog",
        "Website Builder, Blog Writer, Image Generator, Logo Maker",
        "Ad Copy, Email Writer, Landing Page Copywriter, Code Generator",
        "Meta Tag Generator, Schema Generator, Content Calendar",
        "Business Name Generator, Invoice Generator, Privacy Policy",
        "Resume Builder, Review Response Generator, AI Translator",
      ],
      "AI Staff": [
        "AI Receptionist, Sales Agent, Support Agent",
        "AI Social Staff, Content Writer, SEO Expert",
        "Conversion Funnel Architect, LinkedIn Growth Hacker, Reputation Manager",
      ],
    },
  },
  {
    version: "1.0.0",
    date: "January 2025",
    type: "launch",
    highlights: ["Initial beta launch", "5 free AI tools", "3 AI Staff members", "Basic dashboard"],
    changes: {
      "Beta Launch": [
        "Initial platform launch with core functionality",
        "5 free AI tools including blog writer and image generator",
        "3 AI Staff: Receptionist, Sales Agent, Support Agent",
        "Basic user dashboard and authentication",
      ],
    },
  },
];

const typeColors = {
  major: "bg-blue-100 text-blue-700",
  minor: "bg-emerald-100 text-emerald-700",
  patch: "bg-slate-100 text-slate-600",
  launch: "bg-violet-100 text-violet-700",
};

export default function Changelog() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-900 py-20 px-5 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-blue-500/30">
            📋 Full Release History
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Changelog</h1>
          <p className="text-slate-300 text-lg">Every update, improvement, and new feature — documented.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-5 py-16">
        <div className="space-y-12">
          {CHANGELOG.map((release, idx) => (
            <div key={release.version} className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow" />

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h2 className="text-2xl font-extrabold text-slate-900">v{release.version}</h2>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[release.type]}`}>
                  {release.type.charAt(0).toUpperCase() + release.type.slice(1)} Release
                </span>
                <span className="text-sm text-slate-400">{release.date}</span>
                {idx === 0 && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Latest</span>}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 mb-5 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Highlights</p>
                <ul className="space-y-1">
                  {release.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-blue-500 mt-0.5">✦</span> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {Object.entries(release.changes).map(([section, items]) => (
                <div key={section} className="mb-5">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{section}</h3>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center border border-blue-100">
          <p className="text-2xl mb-2">🚀</p>
          <h3 className="font-bold text-slate-900 mb-2">Want a feature?</h3>
          <p className="text-sm text-slate-500 mb-4">We ship new tools and improvements every week. Tell us what you need.</p>
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition">
            Request a Feature
          </a>
        </div>
      </div>
    </div>
  );
}
