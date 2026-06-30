import { useState, useEffect } from "react";
import { Link } from "wouter";
import ShareButtons from "../components/ShareButtons";
import EmailGate from "../components/EmailGate";

export const TOOLS = {
  "ai-humanizer": { title: "Free AI Humanizer - Bypass AI Detection", desc: "Rewrite any AI-generated text to sound 100% human-written. Removes AI cliches, improves flow, makes it undetectable.", placeholder: "Paste the AI-generated text you want to humanize here...", endpoint: "ai-humanizer", type: "text", icon: "✍️" },
  "seo-audit-checker": { title: "Free SEO Audit Checker - Score Your Website", desc: "Get a complete SEO score out of 100 with critical issues, warnings, and passed checks. Actionable fixes included.", placeholder: "Enter a website URL to audit, e.g., https://example.com", endpoint: "seo-audit-checker", type: "json", icon: "🔍" },
  "youtube-to-blog": { title: "Free YouTube to Blog Converter", desc: "Convert any YouTube video transcript into a fully SEO-optimized blog post.", placeholder: "Paste the YouTube video transcript or description here...", endpoint: "youtube-to-blog", type: "html", icon: "🎬" },
  "ai-website-builder": { title: "Free AI Website Builder", desc: "Generate a pixel-perfect, production-ready single-page website.", placeholder: "A modern SaaS landing page for a project management tool with sticky nav, hero section with CTA, 6 feature cards, testimonials, pricing table, and footer", endpoint: "ai-website-builder", type: "code", icon: "🌐" },
  "ai-blog-writer": { title: "Free AI Blog Writer", desc: "Write a 1500+ word SEO-optimized article that ranks on Google.", placeholder: "Benefits of meditation for productivity and mental health in the modern workplace for remote workers", endpoint: "blog-writer-free", type: "html", icon: "📝" },
  "ai-image-generator": { title: "Free AI Image Generator", desc: "Create stunning, high-quality 1024x1024 images from text descriptions.", placeholder: "A futuristic cyberpunk city at sunset with flying cars and neon lights, highly detailed, 4K quality, cinematic lighting", endpoint: "image-generator", type: "image", icon: "🖼️" },
  "ai-logo-maker": { title: "Free AI Logo Maker", desc: "Generate professional logo concepts in multiple styles.", placeholder: "A modern tech startup called NexFlow using blue and purple colors, clean and professional design for a SaaS company", endpoint: "logo-maker", type: "image", icon: "🎨" },
  "business-name-generator": { title: "Free Business Name Generator", desc: "Get 20 creative, memorable business name ideas with taglines.", placeholder: "An AI-powered fitness app for busy professionals in India targeting millennials", endpoint: "business-name-generator", type: "json", icon: "💡" },
  "meta-tag-generator": { title: "Free Meta Tag Generator", desc: "Generate perfectly optimized meta title, meta description, Open Graph tags.", placeholder: "A page selling organic skincare products for women in India with free shipping on orders above 499", endpoint: "meta-tag-generator", type: "json", icon: "🏷️" },
  "privacy-policy-generator": { title: "Free Privacy Policy Generator", desc: "Generate a complete, legally compliant privacy policy.", placeholder: "An e-commerce store that collects emails, processes payments via PayPal, uses cookies for analytics", endpoint: "privacy-policy-generator", type: "html", icon: "🔒" },
  "terms-generator": { title: "Free Terms Generator", desc: "Generate complete terms of service including acceptance, services, payments, IP, liability.", placeholder: "A SaaS platform offering AI tools with monthly subscription plans and a 7-day money-back guarantee", endpoint: "terms-generator", type: "html", icon: "📋" },
  "resume-builder": { title: "Free AI Resume Builder", desc: "Create a professional, ATS-friendly resume.", placeholder: "Software developer with 3 years experience in React, Node.js, Python, and PostgreSQL at Google with measurable achievements", endpoint: "resume-builder", type: "html", icon: "📄" },
  "paragraph-rewriter": { title: "Free Paragraph Rewriter", desc: "Rewrite any paragraph with improved flow, better vocabulary, and professional tone.", placeholder: "Paste the paragraph you want to rewrite here...", endpoint: "paragraph-rewriter", type: "text", icon: "🔄" },
  "ad-copy-generator": { title: "Free Ad Copy Generator", desc: "Generate high-converting ad copies using AIDA framework.", placeholder: "A premium noise-cancelling headphone priced at $199 with 30hr battery life, IPX5 waterproof, premium sound", endpoint: "ad-copy-generator", type: "json", icon: "📢" },
  "email-writer": { title: "Free AI Email Writer", desc: "Write professional emails: cold outreach, follow-up, newsletter, thank-you emails.", placeholder: "Follow-up email to a client after a meeting about a web design project", endpoint: "email-writer", type: "json", icon: "📧" },
  "ai-hashtag-generator": { title: "Free Hashtag Generator", desc: "Get 1 engaging caption and 20 viral hashtags.", placeholder: "A new vegan restaurant opening in downtown NYC targeting millennials interested in plant-based food", endpoint: "ai-hashtag-generator", type: "json", icon: "#️⃣" },
  "youtube-seo-generator": { title: "Free YouTube SEO Tool", desc: "Generate 5 viral YouTube title formulas and 10 SEO-optimized tags.", placeholder: "How to start a successful YouTube channel in 2025 with zero budget and no prior experience", endpoint: "youtube-seo", type: "json", icon: "▶️" },
  "invoice-generator": { title: "Free Invoice Generator", desc: "Create professional invoices with header, item table, subtotal, tax, total.", placeholder: "Web design project for ABC Corp - 50 hours at $75/hr with 10% tax, due in 30 days", endpoint: "invoice-generator", type: "html", icon: "🧾" },
  "social-bio-generator": { title: "Free Social Bio Generator", desc: "Create platform-specific bios for Instagram, Twitter, LinkedIn, TikTok.", placeholder: "A freelance graphic designer specializing in brand identity and logo design with 5 years experience", endpoint: "social-bio-generator", type: "json", icon: "👤" },
  "product-description": { title: "Free Product Description Writer", desc: "Write e-commerce descriptions with benefits, features, social proof, SEO keywords.", placeholder: "Wireless Bluetooth earbuds with noise cancellation, 30hr battery life, IPX5 waterproof, premium sound, foldable", endpoint: "product-description", type: "json", icon: "📦" },
  "startup-ideas": { title: "Free Startup Idea Generator", desc: "Get 5 detailed startup ideas with name, problem, market, revenue model, cost, steps.", placeholder: "AI and healthcare industry for the Indian market", endpoint: "startup-ideas", type: "json", icon: "🚀" },
  "content-repurposer": { title: "Free Content Repurposer", desc: "Turn content into 5 formats: Twitter thread, LinkedIn, newsletter, Instagram, YouTube hook.", placeholder: "10 tips for better sleep that will change your life", endpoint: "content-repurposer", type: "json", icon: "♻️" },
  "website-auditor": { title: "Free Website SEO Auditor", desc: "Complete SEO audit with priority levels: technical, content, on-page, off-page.", placeholder: "An online store selling organic skincare products in India targeting women 25-45 years old", endpoint: "website-auditor", type: "text", icon: "📊" },
  "landing-page-copywriter": { title: "Free Landing Page Copywriter", desc: "Write high-converting landing page copy using AIDA framework.", placeholder: "An AI SaaS landing page for a project management tool that replaces Asana for remote teams, starting at $29/month", endpoint: "landing-page-copywriter", type: "text", icon: "🎯" },
  "competitor-analyzer": { title: "Free Competitor Analyzer", desc: "Analyze competitors for keyword gaps, content gaps, backlinks, traffic sources.", placeholder: "Analyze semrush.com for content gaps and keyword opportunities in the SEO tools space", endpoint: "competitor-analyzer", type: "text", icon: "🕵️" },
  "schema-generator": { title: "Free Schema Generator", desc: "Generate JSON-LD structured data for Article, Product, FAQ, Organization.", placeholder: "A blog post about best AI tools for small business in 2025", endpoint: "schema-generator", type: "code", icon: "🏷️" },
  "content-calendar": { title: "Free Content Calendar", desc: "30-day content calendar with topics, keywords, types, platforms.", placeholder: "AI tools SaaS website targeting Indian small businesses and freelancers", endpoint: "content-calendar", type: "json", icon: "📅" },
  "review-response-generator": { title: "Free Review Response Generator", desc: "Write professional review responses for 1-5 star reviews.", placeholder: "Write a 5-star review response for an AI tool that saved me 10+ hours per blog post", endpoint: "review-response-generator", type: "json", icon: "⭐" },
  "ai-translator": { title: "Free AI Translator", desc: "Detect language and translate with pronunciation guide.", placeholder: "Bonjour, comment allez-vous? Je veux apprendre l'anglais.", endpoint: "ai-translator", type: "json", icon: "🌍" },
  "ai-code-generator": { title: "Free AI Code Generator", desc: "Generate clean, working code in any language with explanations.", placeholder: "A React hook that fetches data from an API with loading and error states", endpoint: "ai-code-generator", type: "json", icon: "💻" },
  "youtube-thumbnail-prompt": { title: "Free YouTube Thumbnail Prompt", desc: "Generate 5 viral thumbnail concepts with visual descriptions.", placeholder: "How to start a YouTube channel in 2025 for beginners", endpoint: "youtube-thumbnail-prompt", type: "json", icon: "🖼️" },
  "ai-quote-generator": { title: "Free AI Quote Generator", desc: "Generate 10 original, shareable quotes for social media.", placeholder: "Business success and entrepreneurship", endpoint: "ai-quote-generator", type: "json", icon: "💬" },
  "meeting-notes-generator": { title: "Free Meeting Notes Generator", desc: "Convert messy meeting notes into structured format with action items.", placeholder: "Discussed Q3 marketing budget. Sarah will handle social media. John to research new tools.", endpoint: "meeting-notes-generator", type: "json", icon: "📝" },
  "website-roaster": { title: "Roast My Website", desc: "Get a hilarious, savage roast of your website design, SEO, and content.", placeholder: "https://example.com", endpoint: "website-roaster", type: "text", icon: "🔥" },
  "ai-press-release": { title: "Free AI Press Release Writer", desc: "Write professional press releases in AP style with headline, quotes, and boilerplate.", placeholder: "PilotStaff launches 77 free AI tools for small businesses — the biggest free AI toolkit in the market", endpoint: "ai-press-release", type: "html", icon: "📰" },
  "ai-newsletter-writer": { title: "Free AI Newsletter Writer", desc: "Create engaging email newsletters with killer subject lines and CTAs.", placeholder: "A weekly newsletter for SaaS founders about AI productivity tips and growth strategies", endpoint: "ai-newsletter-writer", type: "json", icon: "📮" },
  "ai-twitter-thread": { title: "Free Twitter Thread Writer", desc: "Write 10-tweet viral threads that grow your audience on any topic.", placeholder: "10 things I learned building a $1M SaaS in 12 months with no funding", endpoint: "ai-twitter-thread", type: "json", icon: "𝕏" },
  "ai-sales-email-sequence": { title: "Free 7-Email Sales Sequence Generator", desc: "Build a complete email nurture sequence from welcome to close.", placeholder: "A 7-email sequence for a $297 online course about freelance copywriting", endpoint: "ai-sales-email-sequence", type: "json", icon: "📬" },
  "ai-cold-dm": { title: "Free Cold DM Generator", desc: "Generate high-converting cold DMs for LinkedIn, Instagram, Twitter, and WhatsApp.", placeholder: "Reaching out to e-commerce brand owners to offer AI-powered email marketing services", endpoint: "ai-cold-dm", type: "json", icon: "💬" },
  "ai-tagline-generator": { title: "Free Brand Tagline Generator", desc: "Generate 20 powerful brand taglines in emotional, benefit-driven, and minimalist styles.", placeholder: "An AI platform that helps small businesses hire virtual AI staff starting at $19/month", endpoint: "ai-tagline-generator", type: "json", icon: "✨" },
  "ai-youtube-script": { title: "Free YouTube Script Writer", desc: "Write complete YouTube video scripts with hooks, B-roll cues, and subscribe CTAs.", placeholder: "Top 10 AI tools for small businesses in 2025 that save 20+ hours per week", endpoint: "ai-youtube-script", type: "html", icon: "🎥" },
  "ai-podcast-script": { title: "Free Podcast Episode Script Generator", desc: "Write full podcast scripts with intros, segments, sponsor slots, and outros.", placeholder: "Episode about how solopreneurs are using AI to replace $50,000 in salaries", endpoint: "ai-podcast-script", type: "html", icon: "🎙️" },
  "ai-keyword-clusters": { title: "Free Keyword Cluster Generator", desc: "Build topic clusters with pillar keywords and supporting keywords for SEO.", placeholder: "AI tools for small business owners in India", endpoint: "ai-keyword-clusters", type: "json", icon: "🔑" },
  "ai-google-ads": { title: "Free Google Ads Copy Generator", desc: "Generate complete RSA campaigns with headlines, descriptions, and sitelinks.", placeholder: "AI staff platform for small businesses, starting at $19/month, no setup fees", endpoint: "ai-google-ads", type: "json", icon: "🎯" },
  "ai-email-subject-lines": { title: "Free Email Subject Line Generator", desc: "Get 20 high-converting subject lines with open rate predictions.", placeholder: "A re-engagement email to subscribers who haven't opened in 60 days", endpoint: "ai-email-subject-lines", type: "json", icon: "📩" },
  "ai-tiktok-caption": { title: "Free TikTok Caption Generator", desc: "Create 10 viral TikTok captions with hashtags for any niche.", placeholder: "A TikTok about how I replaced my VA with AI tools and saved $2000/month", endpoint: "ai-tiktok-caption", type: "json", icon: "🎵" },
  "ai-pinterest-description": { title: "Free Pinterest Description Writer", desc: "Write 5 optimized pin descriptions with keywords and CTAs.", placeholder: "A recipe blog post about 10-minute healthy breakfast ideas for busy moms", endpoint: "ai-pinterest-description", type: "json", icon: "📌" },
  "ai-ab-test-ideas": { title: "Free A/B Test Idea Generator", desc: "Get 10 high-impact A/B test ideas with hypotheses and metrics.", placeholder: "A SaaS landing page selling project management software at $29/month", endpoint: "ai-ab-test-ideas", type: "json", icon: "🧪" },
  "ai-brand-voice": { title: "Free Brand Voice Guide Generator", desc: "Create a complete brand voice guide with do's, don'ts, and examples.", placeholder: "A modern fintech startup that makes personal finance fun and approachable for millennials", endpoint: "ai-brand-voice", type: "html", icon: "🗣️" },
  "ai-business-plan": { title: "Free AI Business Plan Generator", desc: "Generate a complete business plan with market analysis, financials, and strategy.", placeholder: "A subscription-based AI writing assistant for content creators and bloggers", endpoint: "ai-business-plan", type: "html", icon: "📈" },
  "ai-swot-analysis": { title: "Free SWOT Analysis Generator", desc: "Get a complete SWOT with 5 points per quadrant plus strategic recommendations.", placeholder: "A new coffee shop chain launching in tier-2 cities in India targeting millennials", endpoint: "ai-swot-analysis", type: "json", icon: "🔎" },
  "ai-job-description": { title: "Free Job Description Generator", desc: "Write attractive job postings with responsibilities, requirements, and benefits.", placeholder: "Senior React + Node.js full-stack developer for a remote-first SaaS startup", endpoint: "ai-job-description", type: "html", icon: "👥" },
  "ai-nda-generator": { title: "Free NDA Generator", desc: "Draft professional Non-Disclosure Agreements with all key clauses.", placeholder: "NDA between a software startup and a freelance developer working on a proprietary mobile app", endpoint: "ai-nda-generator", type: "html", icon: "🤝" },
  "ai-refund-policy": { title: "Free Refund Policy Generator", desc: "Create a consumer-friendly refund and returns policy.", placeholder: "An e-commerce store selling handmade jewelry with a 30-day return window", endpoint: "ai-refund-policy", type: "html", icon: "↩️" },
  "ai-cookie-policy": { title: "Free Cookie Policy Generator", desc: "Generate a GDPR-compliant cookie policy for your website.", placeholder: "A SaaS platform using Google Analytics, Facebook Pixel, and Stripe payment cookies", endpoint: "ai-cookie-policy", type: "html", icon: "🍪" },
  "ai-pitch-deck-outline": { title: "Free Pitch Deck Outline Generator", desc: "Create a 12-slide investor deck outline with talking points.", placeholder: "An AI-powered HR platform that automates employee onboarding for companies with 50-500 employees", endpoint: "ai-pitch-deck-outline", type: "json", icon: "📊" },
  "ai-cover-letter": { title: "Free AI Cover Letter Writer", desc: "Write a personalized, compelling cover letter for any job application.", placeholder: "Full stack developer with 4 years React/Node.js experience applying to a Series B startup as Senior Engineer", endpoint: "ai-cover-letter", type: "html", icon: "💼" },
  "ai-linkedin-summary": { title: "Free LinkedIn Summary Writer", desc: "Get 3 LinkedIn About section styles: storytelling, results-focused, thought leader.", placeholder: "SaaS founder with 8 years in B2B sales tech who built and sold a $5M ARR company", endpoint: "ai-linkedin-summary", type: "json", icon: "🔗" },
  "ai-youtube-about": { title: "Free YouTube About Section Writer", desc: "Write a compelling channel About with keywords and a subscribe CTA.", placeholder: "A YouTube channel about AI tools, productivity hacks, and building online businesses", endpoint: "ai-youtube-about", type: "json", icon: "▶️" },
  "ai-personal-bio": { title: "Free Personal Bio Generator", desc: "Get 5 bio versions from 25 words to 300 words in professional third person.", placeholder: "Award-winning UX designer with 10 years experience at Apple and Google, now coaching startup founders", endpoint: "ai-personal-bio", type: "json", icon: "🪪" },
  "ai-meeting-agenda": { title: "Free Meeting Agenda Generator", desc: "Create professional meeting agendas with time slots and objectives.", placeholder: "Quarterly product roadmap review with engineering, design, and marketing teams", endpoint: "ai-meeting-agenda", type: "html", icon: "📋" },
  "ai-smart-goals": { title: "Free SMART Goals Generator", desc: "Convert any goal into 5 SMART goals with action plans and success metrics.", placeholder: "Grow my email newsletter from 500 to 5000 subscribers in 6 months", endpoint: "ai-smart-goals", type: "json", icon: "🎯" },
  "ai-pros-cons": { title: "Free Pros and Cons Analyzer", desc: "Get 8 pros and 8 cons with impact levels and a balanced recommendation.", placeholder: "Switching my SaaS from monthly billing to annual billing only", endpoint: "ai-pros-cons", type: "json", icon: "⚖️" },
  "ai-brainstorm": { title: "Free AI Brainstorming Tool", desc: "Generate 25 ideas using 5 proven brainstorming frameworks.", placeholder: "New revenue streams for a digital marketing agency with 20 clients", endpoint: "ai-brainstorm", type: "json", icon: "🧠" },
  "ai-faq-generator": { title: "Free FAQ Generator", desc: "Create 15 FAQs with answers and JSON-LD schema for SEO.", placeholder: "A subscription-based AI tools platform for freelancers and small businesses", endpoint: "ai-faq-generator", type: "json", icon: "❓" },
  "ai-survey-questions": { title: "Free Survey Question Generator", desc: "Build a 15-question survey with multiple question types and analysis tips.", placeholder: "Customer satisfaction survey for an online SaaS product", endpoint: "ai-survey-questions", type: "json", icon: "📝" },
  "ai-project-plan": { title: "Free Project Plan Generator", desc: "Get a full project plan with milestones, task breakdown, and risk register.", placeholder: "Launch a mobile app for food delivery in 3 months with a team of 5", endpoint: "ai-project-plan", type: "html", icon: "🗂️" },
  "ai-sop-writer": { title: "Free SOP Writer", desc: "Write Standard Operating Procedures with quality checks and troubleshooting.", placeholder: "Customer onboarding process for a B2B SaaS product from signup to first value", endpoint: "ai-sop-writer", type: "html", icon: "📑" },
  "ai-amazon-listing": { title: "Free Amazon Listing Writer", desc: "Write title, bullets, description, and backend keywords for Amazon products.", placeholder: "Wireless Bluetooth earbuds with 40hr battery life, active noise cancellation, IPX5 waterproof", endpoint: "ai-amazon-listing", type: "json", icon: "📦" },
  "ai-etsy-description": { title: "Free Etsy Shop Description Writer", desc: "Create story-driven product descriptions with all 13 Etsy tags.", placeholder: "Handmade ceramic coffee mugs with wildflower designs, dishwasher safe, 12oz capacity", endpoint: "ai-etsy-description", type: "json", icon: "🎁" },
  "ai-product-title-optimizer": { title: "Free Product Title Optimizer", desc: "Optimize titles for Amazon, Shopify, Etsy, eBay, and Google Shopping.", placeholder: "Bamboo toothbrush set of 4 with charcoal bristles", endpoint: "ai-product-title-optimizer", type: "json", icon: "✏️" },
  "ai-dropshipping-ideas": { title: "Free Dropshipping Product Ideas Generator", desc: "Get 10 profitable product ideas with margins, suppliers, and marketing angles.", placeholder: "Home office accessories niche targeting remote workers in the US", endpoint: "ai-dropshipping-ideas", type: "json", icon: "📨" },
  "ai-promo-copy": { title: "Free Promotional Copy Generator", desc: "Generate sale emails, social posts, SMS, and push notification copy.", placeholder: "Black Friday 50% sale for an AI tools subscription platform", endpoint: "ai-promo-copy", type: "json", icon: "🏷️" },
  "ai-investor-email": { title: "Free Investor Pitch Email Generator", desc: "Write 3 investor emails: cold angel, VC follow-up, strategic partner.", placeholder: "Pre-seed AI SaaS startup with $15K MRR and 400 paying customers seeking $500K", endpoint: "ai-investor-email", type: "json", icon: "💰" },
  "ai-grant-proposal": { title: "Free Grant Proposal Writer", desc: "Write complete grant proposals for nonprofits and research organizations.", placeholder: "A nonprofit providing free coding education to underprivileged youth in rural India", endpoint: "ai-grant-proposal", type: "html", icon: "🏛️" },
  "ai-financial-summary": { title: "Free Financial Report Summary Generator", desc: "Create CFO-level financial summaries with KPIs and recommendations.", placeholder: "SaaS company with $2.1M ARR, 12% MoM growth, 78% gross margin, $180K monthly burn", endpoint: "ai-financial-summary", type: "html", icon: "📊" },
  "ai-budget-planner": { title: "Free Budget Planner", desc: "Build a detailed budget with income, expenses, savings goals, and projections.", placeholder: "Freelance designer earning $6000/month wanting to save for a house in 3 years", endpoint: "ai-budget-planner", type: "html", icon: "💳" },
};

const RELATED = {
  "ai-humanizer": ["paragraph-rewriter", "ai-blog-writer", "content-repurposer"],
  "seo-audit-checker": ["meta-tag-generator", "website-auditor", "schema-generator"],
  "youtube-to-blog": ["ai-blog-writer", "content-repurposer", "paragraph-rewriter"],
  "ai-website-builder": ["landing-page-copywriter", "schema-generator", "meta-tag-generator"],
  "ai-blog-writer": ["content-repurposer", "paragraph-rewriter", "content-calendar"],
  "ai-image-generator": ["ai-logo-maker", "product-description", "youtube-thumbnail-prompt"],
  "ai-logo-maker": ["ai-image-generator", "business-name-generator", "social-bio-generator"],
  "business-name-generator": ["startup-ideas", "social-bio-generator", "ai-logo-maker"],
  "meta-tag-generator": ["website-auditor", "schema-generator", "seo-audit-checker"],
  "privacy-policy-generator": ["terms-generator", "website-auditor", "schema-generator"],
  "terms-generator": ["privacy-policy-generator", "website-auditor", "schema-generator"],
  "resume-builder": ["social-bio-generator", "paragraph-rewriter", "email-writer"],
  "paragraph-rewriter": ["ai-blog-writer", "ai-humanizer", "content-repurposer"],
  "ad-copy-generator": ["landing-page-copywriter", "email-writer", "ai-hashtag-generator"],
  "email-writer": ["ad-copy-generator", "landing-page-copywriter", "content-repurposer"],
  "ai-hashtag-generator": ["content-repurposer", "social-bio-generator", "content-calendar"],
  "youtube-seo-generator": ["meta-tag-generator", "website-auditor", "content-calendar"],
  "invoice-generator": ["product-description", "terms-generator", "privacy-policy-generator"],
  "social-bio-generator": ["ai-hashtag-generator", "resume-builder", "ai-logo-maker"],
  "product-description": ["ad-copy-generator", "invoice-generator", "landing-page-copywriter"],
  "startup-ideas": ["business-name-generator", "landing-page-copywriter", "content-calendar"],
  "content-repurposer": ["ai-blog-writer", "ai-hashtag-generator", "content-calendar"],
  "website-auditor": ["meta-tag-generator", "schema-generator", "competitor-analyzer"],
  "landing-page-copywriter": ["ad-copy-generator", "ai-website-builder", "competitor-analyzer"],
  "competitor-analyzer": ["website-auditor", "meta-tag-generator", "content-calendar"],
  "schema-generator": ["meta-tag-generator", "website-auditor", "ai-website-builder"],
  "content-calendar": ["content-repurposer", "ai-hashtag-generator", "ai-blog-writer"],
  "review-response-generator": ["email-writer", "social-bio-generator", "ad-copy-generator"],
  "ai-translator": ["ai-code-generator", "meeting-notes-generator", "ai-quote-generator"],
  "ai-code-generator": ["ai-translator", "ai-website-builder", "meeting-notes-generator"],
  "youtube-thumbnail-prompt": ["ai-image-generator", "youtube-seo-generator", "ad-copy-generator"],
  "ai-quote-generator": ["ai-translator", "social-bio-generator", "ai-hashtag-generator"],
  "meeting-notes-generator": ["ai-translator", "ai-code-generator", "ai-quote-generator"],
  "website-roaster": ["website-auditor", "landing-page-copywriter", "competitor-analyzer"],
};

const displayValue = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
};

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function TextCard({ label, value, className = "" }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className={`bg-white p-3 rounded-lg border border-slate-200 ${className}`}>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-slate-700 whitespace-pre-wrap break-words">{displayValue(value)}</p>
    </div>
  );
}

export default function ToolDetail({ params }) {
  const slug = params?.slug || "";
  const tool = TOOLS[slug] || {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    desc: "Run this AI tool instantly. Free, no login required.",
    placeholder: "Describe what you need...",
    endpoint: slug,
    type: "text",
    icon: "⚙️",
  };

  const related = (RELATED[slug] || []).map((s) => ({ ...TOOLS[s], slug: s })).filter(Boolean);

  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usesToday, setUsesToday] = useState(0);
  const [showGate, setShowGate] = useState(false);

  const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

  useEffect(() => {
    if (!API) return;
    fetch(`${API}/api/tool/usage-count`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.success) setUsesToday(Number(data.usesToday) || 0); })
      .catch(() => {});
  }, [API]);

  const runTool = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    if (!API) {
      setResult({ success: false, error: "API URL is missing. Please set VITE_API_URL." });
      return;
    }

    if (usesToday >= 5) { setShowGate(true); return; }

    setLoading(true);
    setResult(null);
    setCopied(false);

    try {
      const response = await fetch(`${API}/api/tool/${tool.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: input, prompt: input }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: false, error: text || `Server error (${response.status})` };
      }

      if (!response.ok && !data?.error) {
        data = { ...data, success: false, error: `Request failed (${response.status})` };
      }

      setResult(data);
      if (data?.usesToday !== undefined) setUsesToday(Number(data.usesToday) || 0);
    } catch {
      setResult({ success: false, error: "Network error. Check connection." });
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(displayValue(text));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };

  const getVal = () => {
    const value = result?.code ?? result?.article ?? result?.html ?? result?.text ?? result?.result ?? result?.reply ?? "";
    return displayValue(value);
  };

  const getData = () => {
    const data = result?.data;
    return isObject(data) ? data : {};
  };

  const renderOutput = () => {
    if (!result) return null;

    if (!result.success) {
      return (
        <div className="p-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm whitespace-pre-wrap">
          ❌ {displayValue(result.error || "Something went wrong")}
        </div>
      );
    }

    if (tool.type === "code") {
      const code = displayValue(result.code);
      return (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500 font-medium">LIVE PREVIEW</span>
            <button onClick={() => copy(code)} className="text-sm text-blue-600 font-medium hover:underline">
              {copied ? "✅ Copied!" : "📋 Copy Code"}
            </button>
          </div>
          <iframe srcDoc={code} title="Preview" className="w-full h-[600px] bg-white rounded-xl border border-slate-200" sandbox="allow-scripts" />
        </div>
      );
    }

    if (tool.type === "html") {
      const html = getVal();
      return (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500 font-medium">OUTPUT</span>
            <button onClick={() => copy(html)} className="text-sm text-blue-600 font-medium hover:underline">
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
          <div className="prose-output bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      );
    }

    if (tool.type === "image") {
      const imageUrl = displayValue(result.imageUrl);
      return (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500 font-medium">GENERATED IMAGE</span>
            <div className="flex gap-3">
              <button onClick={() => copy(imageUrl)} className="text-sm text-blue-600 font-medium hover:underline">
                {copied ? "✅ Copied!" : "📋 Copy URL"}
              </button>
              {imageUrl && (
                <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 font-medium hover:underline">
                  Open Full Size →
                </a>
              )}
            </div>
          </div>
          {imageUrl ? (
            <img src={imageUrl} alt="AI Generated" className="w-full rounded-xl border border-slate-200 shadow-lg" loading="lazy" />
          ) : (
            <div className="p-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">❌ Image URL was not returned by the server.</div>
          )}
        </div>
      );
    }

    if (tool.type === "text") {
      const text = getVal();
      return (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500 font-medium">RESULT</span>
            <button onClick={() => copy(text)} className="text-sm text-blue-600 font-medium hover:underline">
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
          <div className="prose-output bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {text}
          </div>
        </div>
      );
    }

    if (tool.type === "json") {
      const d = getData();
      return (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500 font-medium">RESULT</span>
            <button onClick={() => copy(JSON.stringify(d, null, 2))} className="text-sm text-blue-600 font-medium hover:underline">
              {copied ? "✅ Copied!" : "📋 Copy JSON"}
            </button>
          </div>
          <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 space-y-4 text-sm">
            {d.caption && <p className="font-semibold text-slate-800 text-base whitespace-pre-wrap break-words">{displayValue(d.caption)}</p>}
            <TextCard label="Detected Language" value={d.detected_language} />
            <TextCard label="Translation" value={d.translated_text} />
            <TextCard label="Pronunciation" value={d.pronunciation} />
            <TextCard label="Summary" value={d.summary} />
            <TextCard label="Top Recommendation" value={d.top_recommendation} className="bg-amber-50 border-amber-200" />
            <TextCard label="Explanation" value={d.explanation} />
            <TextCard label="How to Use" value={d.usage} />
            <TextCard label="SEO Title" value={d.title} />
            <TextCard label="Meta Description" value={d.description} />
            <TextCard label="OG Title" value={d.og_title} />
            <TextCard label="OG Description" value={d.og_description} />

            {d.score !== undefined && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-4xl font-extrabold text-blue-600">{displayValue(d.score)}/100</p>
                <p className="text-sm text-blue-700 font-medium">SEO Score — {displayValue(d.grade)}</p>
              </div>
            )}

            {Array.isArray(d.critical_issues) && d.critical_issues.length > 0 && (
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="text-xs text-red-600 mb-2 font-bold">Critical Issues</p>
                {d.critical_issues.map((item, i) => (
                  <p key={i} className="text-sm text-red-700 mb-1 whitespace-pre-wrap">
                    • {displayValue(item?.issue ?? item)}{item?.fix ? <> — <span className="font-medium">Fix: {displayValue(item.fix)}</span></> : null}
                  </p>
                ))}
              </div>
            )}

            {Array.isArray(d.warnings) && d.warnings.length > 0 && (
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-600 mb-2 font-bold">Warnings</p>
                {d.warnings.map((item, i) => (
                  <p key={i} className="text-sm text-amber-700 mb-1 whitespace-pre-wrap">
                    • {displayValue(item?.issue ?? item)}{item?.fix ? ` — ${displayValue(item.fix)}` : ""}
                  </p>
                ))}
              </div>
            )}

            {Array.isArray(d.passed) && d.passed.length > 0 && (
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <p className="text-xs text-emerald-600 mb-2 font-bold">Passed Checks</p>
                <div className="flex flex-wrap gap-1">
                  {d.passed.map((item, i) => (
                    <span key={i} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{displayValue(item)}</span>
                  ))}
                </div>
              </div>
            )}

            {d.code && (
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 mb-2">Code</p>
                <pre className="text-xs text-slate-700 whitespace-pre-wrap overflow-auto max-h-64 bg-slate-50 p-3 rounded">{displayValue(d.code)}</pre>
              </div>
            )}

            {Array.isArray(d.keywords) && d.keywords.map((item, i) => (
              <span key={`kw-${i}`} className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mr-1.5 mb-1.5">{displayValue(item)}</span>
            ))}

            {Array.isArray(d.titles) && d.titles.map((item, i) => (
              <p key={`t-${i}`} className="text-blue-600 font-medium whitespace-pre-wrap">→ {displayValue(item)}</p>
            ))}

            {Array.isArray(d.names) && d.names.map((item, i) => (
              <p key={`n-${i}`} className="text-blue-600 font-medium whitespace-pre-wrap">→ {displayValue(item)}</p>
            ))}

            {Array.isArray(d.options) && d.options.map((item, i) => (
              <TextCard key={`opt-${i}`} label={`Option ${i + 1}`} value={item} />
            ))}

            {Array.isArray(d.emails) && d.emails.map((item, i) => (
              <TextCard key={`em-${i}`} label={`Email ${i + 1}`} value={item} />
            ))}

            {Array.isArray(d.responses) && d.responses.map((item, i) => (
              <TextCard key={`res-${i}`} label={`${displayValue(item?.stars ?? i + 1)}-Star Response`} value={item?.response ?? item} />
            ))}

            {Array.isArray(d.hashtags || d.tags) && (d.hashtags || d.tags).map((item, i) => {
              const tag = displayValue(item);
              return <span key={`tag-${i}`} className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-1.5 mb-1.5">{tag.startsWith("#") ? tag : `#${tag}`}</span>;
            })}

            {Array.isArray(d.quotes) && d.quotes.map((item, i) => (
              <div key={`q-${i}`} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-slate-700 italic whitespace-pre-wrap">"{displayValue(item?.quote ?? item)}"</p>
                {(item?.author || item?.category) && <p className="text-xs text-slate-400 mt-1">— {displayValue(item.author)} ({displayValue(item.category)})</p>}
              </div>
            ))}

            {Array.isArray(d.thumbnails) && d.thumbnails.map((item, i) => (
              <div key={`th-${i}`} className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Thumbnail {i + 1} — {displayValue(item?.emotion)}</p>
                <p className="font-medium text-slate-800 whitespace-pre-wrap">"{displayValue(item?.text ?? item)}"</p>
                <p className="text-xs text-slate-500 mt-1">Visual: {displayValue(item?.visual)} | Colors: {displayValue(item?.colors)}</p>
              </div>
            ))}

            {Array.isArray(d.ideas) && d.ideas.map((item, i) => (
              <div key={`idea-${i}`} className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Idea {i + 1}: {displayValue(item?.name ?? item)}</p>
                <p className="text-xs text-slate-600">Problem: {displayValue(item?.problem)}</p>
                <p className="text-xs text-slate-600">Market: {displayValue(item?.market)}</p>
                <p className="text-xs text-slate-600">Revenue: {displayValue(item?.revenue)}</p>
              </div>
            ))}

            {Array.isArray(d.platforms) && d.platforms.map((item, i) => (
              <TextCard key={`plat-${i}`} label={displayValue(item?.platform || `Platform ${i + 1}`)} value={item?.bio ?? item?.content ?? item} />
            ))}

            {Array.isArray(d.formats) && d.formats.map((item, i) => (
              <TextCard key={`fmt-${i}`} label={displayValue(item?.type || `Format ${i + 1}`)} value={item?.content ?? item} />
            ))}

            {Array.isArray(d.descriptions) && d.descriptions.map((item, i) => (
              <TextCard key={`desc-${i}`} label={`Description ${i + 1}: ${displayValue(item?.headline)}`} value={item?.body ?? item} />
            ))}

            {Array.isArray(d.calendar) && d.calendar.map((item, i) => (
              <div key={`cal-${i}`} className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold flex-shrink-0">Day {displayValue(item?.day ?? i + 1)}</span>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{displayValue(item?.topic ?? item)}</p>
                  <p className="text-xs text-blue-600">{displayValue(item?.keyword)} · {displayValue(item?.platform)}</p>
                </div>
              </div>
            ))}

            {Array.isArray(d.schemas) && d.schemas.map((item, i) => (
              <div key={`sc-${i}`} className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Schema {i + 1} ({displayValue(item?.["@type"])})</p>
                <pre className="text-xs text-slate-600 whitespace-pre-wrap overflow-auto max-h-48">{displayValue(item)}</pre>
              </div>
            ))}

            {Array.isArray(d.funnel) && d.funnel.map((item, i) => (
              <div key={`fn-${i}`} className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Email {i + 1}: {displayValue(item?.type)} (Day {displayValue(item?.day)})</p>
                <p className="font-medium text-slate-800 text-sm">{displayValue(item?.subject)}</p>
                <p className="text-xs text-slate-600 mt-1 whitespace-pre-wrap">{displayValue(item?.body)}</p>
              </div>
            ))}

            {d.meeting_title && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-bold text-blue-800 whitespace-pre-wrap">{displayValue(d.meeting_title)}</p>
              </div>
            )}

            {Array.isArray(d.attendees) && d.attendees.map((item, i) => (
              <span key={`att-${i}`} className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs mr-1 mb-1">{displayValue(item)}</span>
            ))}

            {Array.isArray(d.key_decisions) && d.key_decisions.map((item, i) => (
              <p key={`kd-${i}`} className="text-sm text-slate-700 whitespace-pre-wrap">✅ {displayValue(item)}</p>
            ))}

            {Array.isArray(d.action_items) && d.action_items.map((item, i) => (
              <p key={`ai-${i}`} className="text-sm text-slate-700 whitespace-pre-wrap">
                📌 {displayValue(item?.task ?? item)} → {displayValue(item?.assignee)} (by {displayValue(item?.deadline)})
              </p>
            ))}

            {Object.keys(d).length === 0 && (
              <pre className="bg-white p-4 rounded-lg border border-slate-200 text-xs overflow-auto whitespace-pre-wrap">{displayValue(result)}</pre>
            )}
          </div>
        </div>
      );
    }

    return (
      <pre className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm overflow-auto max-h-[600px] whitespace-pre-wrap">
        {displayValue(result)}
      </pre>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-blue-600 transition">Tools</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{tool.title.replace(/^Free /, "")}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{tool.icon}</span>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{tool.title}</h1>
            </div>
            <span className="badge bg-emerald-100 text-emerald-700 flex-shrink-0">FREE</span>
          </div>

          <p className="text-slate-500 mt-2 mb-4 leading-relaxed">{tool.desc}</p>

          <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
            <span>🆓 No login</span>
            <span>⚡ Instant results</span>
            <span>📊 {Math.max(0, 5 - Math.min(usesToday, 5))} free uses left today</span>
          </div>

          <form onSubmit={runTool}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.placeholder}
              className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-xl text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none h-32 text-sm"
              required
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-slate-400">No login · Free forever</span>
              <button type="submit" disabled={loading} className="btn-primary px-8 py-3 rounded-xl text-sm disabled:opacity-50">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </span>
                ) : "Generate ✓"}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">
            <div className="space-y-4">
              <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            {renderOutput()}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <ShareButtons title={tool.title} text={`Try ${tool.title} for free on PilotStaff - 77+ free AI tools!`} />
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <p className="text-4xl mb-4">⚙️</p>
            <p className="text-slate-500 mb-2">Enter your prompt above to generate results</p>
            <p className="text-sm text-slate-400 mb-6">AI-powered, instant, free</p>
            <Link href="/staff" className="btn-outline px-6 py-2.5 rounded-xl text-sm inline-block">
              Or hire AI Staff to do it automatically →
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-bold text-slate-900 mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {related.map((rTool) => (
                <Link key={rTool.slug} href={`/tools/${rTool.slug}`} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-sm transition flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{rTool.icon}</span>
                  <span className="text-sm font-medium text-slate-700 leading-tight">{rTool.title.replace("Free ", "")}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {showGate && <EmailGate usesToday={usesToday} limit={5} onDismiss={() => setShowGate(false)} />}
    </div>
  );
}
