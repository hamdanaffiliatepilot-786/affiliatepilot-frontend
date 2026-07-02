import { useState } from 'react';
import { Link } from 'wouter';
import { aiImage } from '../lib/genImage';

const TOOL_CATEGORIES = [
  {
    name: '🔥 Most Popular', tools: [
      { slug: 'ai-humanizer', icon: '✍️', name: 'AI Humanizer', desc: 'Remove AI detection from text. Make it sound 100% human.', badge: 'Viral' },
      { slug: 'seo-audit-checker', icon: '🔍', name: 'SEO Audit Checker', desc: 'Get SEO score out of 100 with actionable fixes.', badge: 'Viral' },
      { slug: 'youtube-to-blog', icon: '🎬', name: 'YouTube to Blog', desc: 'Convert video transcripts into SEO blog posts.', badge: 'Popular' },
      { slug: 'ai-website-builder', icon: '🌐', name: 'AI Website Builder', desc: 'Build complete responsive websites in 10 seconds.', badge: 'Popular' },
      { slug: 'ai-blog-writer', icon: '📝', name: 'AI Blog Writer', desc: 'Write 1500+ word SEO-optimized articles.', badge: 'Popular' },
      { slug: 'ai-image-generator', icon: '🖼️', name: 'AI Image Generator', desc: 'Create stunning images from text — completely free.', badge: 'Free' },
    ],
  },
  {
    name: 'Content Creation', tools: [
      { slug: 'paragraph-rewriter', icon: '🔄', name: 'Paragraph Rewriter', desc: 'Rewrite paragraphs with better vocabulary and flow.' },
      { slug: 'ad-copy-generator', icon: '📢', name: 'Ad Copy Generator', desc: 'High-converting Facebook, Google, Instagram ad copies.' },
      { slug: 'email-writer', icon: '📧', name: 'AI Email Writer', desc: 'Cold outreach, follow-up, newsletter emails.' },
      { slug: 'landing-page-copywriter', icon: '🎯', name: 'Landing Page Copywriter', desc: 'High-converting landing page copy using AIDA.' },
      { slug: 'ai-code-generator', icon: '💻', name: 'AI Code Generator', desc: 'Generate clean, working code in any language.' },
      { slug: 'meeting-notes-generator', icon: '📋', name: 'Meeting Notes Generator', desc: 'Convert messy notes into structured format.', badge: 'New' },
      { slug: 'ai-press-release', icon: '📰', name: 'AI Press Release Writer', desc: 'Professional press releases in AP style.', badge: 'New' },
      { slug: 'ai-newsletter-writer', icon: '📮', name: 'AI Newsletter Writer', desc: 'Engaging email newsletters with subject lines.', badge: 'New' },
      { slug: 'ai-twitter-thread', icon: '𝕏', name: 'Twitter Thread Writer', desc: 'Write 10-tweet viral threads on any topic.', badge: 'New' },
      { slug: 'ai-sales-email-sequence', icon: '📬', name: '7-Email Sales Sequence', desc: 'Complete nurture sequence from welcome to close.', badge: 'New' },
      { slug: 'ai-cold-dm', icon: '💬', name: 'Cold DM Generator', desc: 'High-converting DMs for LinkedIn, IG, Twitter.', badge: 'New' },
      { slug: 'ai-tagline-generator', icon: '✨', name: 'Brand Tagline Generator', desc: '20 powerful taglines for your brand.', badge: 'New' },
      { slug: 'ai-youtube-script', icon: '🎥', name: 'YouTube Script Writer', desc: 'Complete video scripts with hooks and CTAs.', badge: 'New' },
      { slug: 'ai-podcast-script', icon: '🎙️', name: 'Podcast Episode Script', desc: 'Full podcast scripts with intros, segments, outros.', badge: 'New' },
    ],
  },
  {
    name: 'Design & Media', tools: [
      { slug: 'ai-logo-maker', icon: '🎨', name: 'AI Logo Maker', desc: 'Professional logos in 5 styles.' },
      { slug: 'youtube-thumbnail-prompt', icon: '🖼️', name: 'YouTube Thumbnail Prompt', desc: 'Generate 5 viral thumbnail concepts.' },
    ],
  },
  {
    name: 'SEO & Marketing', tools: [
      { slug: 'meta-tag-generator', icon: '🏷️', name: 'Meta Tag Generator', desc: 'Optimized meta title, description, OG tags.' },
      { slug: 'youtube-seo-generator', icon: '▶️', name: 'YouTube SEO Tool', desc: '5 viral titles and 10 SEO-optimized tags.' },
      { slug: 'ai-hashtag-generator', icon: '#️⃣', name: 'Hashtag Generator', desc: '1 engaging caption and 20 viral hashtags.' },
      { slug: 'website-auditor', icon: '📊', name: 'Website SEO Auditor', desc: 'Complete SEO audit with priority levels.' },
      { slug: 'competitor-analyzer', icon: '🕵️', name: 'Competitor Analyzer', desc: 'Keyword gaps, content gaps, backlink opportunities.' },
      { slug: 'schema-generator', icon: '🏷️', name: 'Schema Generator', desc: 'JSON-LD structured data for multiple types.' },
      { slug: 'content-calendar', icon: '📅', name: 'Content Calendar', desc: '30-day content calendar with topics and keywords.' },
      { slug: 'content-repurposer', icon: '♻️', name: 'Content Repurposer', desc: 'Turn content into 5 different formats.' },
      { slug: 'ai-keyword-clusters', icon: '🔑', name: 'Keyword Cluster Generator', desc: 'Topic clusters with pillar + supporting keywords.', badge: 'New' },
      { slug: 'ai-google-ads', icon: '🎯', name: 'Google Ads Copy Generator', desc: '5 complete RSA campaigns with sitelinks.', badge: 'New' },
      { slug: 'ai-email-subject-lines', icon: '📩', name: 'Email Subject Line Generator', desc: '20 high-converting subject lines with open rate predictions.', badge: 'New' },
      { slug: 'ai-tiktok-caption', icon: '🎵', name: 'TikTok Caption Generator', desc: '10 viral captions with hashtags.', badge: 'New' },
      { slug: 'ai-pinterest-description', icon: '📌', name: 'Pinterest Description Writer', desc: '5 optimized pin descriptions with keywords.', badge: 'New' },
      { slug: 'ai-ab-test-ideas', icon: '🧪', name: 'A/B Test Idea Generator', desc: '10 high-impact A/B test ideas with hypotheses.', badge: 'New' },
      { slug: 'ai-brand-voice', icon: '🗣️', name: 'Brand Voice Guide Generator', desc: 'Complete brand voice and tone guidelines.', badge: 'New' },
    ],
  },
  {
    name: 'Business & Legal', tools: [
      { slug: 'business-name-generator', icon: '💡', name: 'Business Name Generator', desc: '20 creative business names with taglines and domains.' },
      { slug: 'startup-ideas', icon: '🚀', name: 'Startup Idea Generator', desc: '5 detailed ideas with problem, market, revenue.' },
      { slug: 'product-description', icon: '📦', name: 'Product Description Writer', desc: 'E-commerce descriptions with benefits and SEO.' },
      { slug: 'invoice-generator', icon: '🧾', name: 'Invoice Generator', desc: 'Professional invoices with item table and tax.' },
      { slug: 'privacy-policy-generator', icon: '🔒', name: 'Privacy Policy Generator', desc: 'Complete legally compliant privacy policy.' },
      { slug: 'terms-generator', icon: '📋', name: 'Terms Generator', desc: 'Complete terms of service with legal sections.' },
      { slug: 'ai-business-plan', icon: '📈', name: 'AI Business Plan Generator', desc: 'Full business plan with financials and strategy.', badge: 'New' },
      { slug: 'ai-swot-analysis', icon: '🔎', name: 'SWOT Analysis Generator', desc: 'Complete SWOT with strategic recommendations.', badge: 'New' },
      { slug: 'ai-job-description', icon: '👥', name: 'Job Description Generator', desc: 'Attractive job postings that attract top talent.', badge: 'New' },
      { slug: 'ai-nda-generator', icon: '🤝', name: 'NDA Generator', desc: 'Professional non-disclosure agreements.', badge: 'New' },
      { slug: 'ai-refund-policy', icon: '↩️', name: 'Refund Policy Generator', desc: 'Consumer-friendly refund and returns policy.', badge: 'New' },
      { slug: 'ai-cookie-policy', icon: '🍪', name: 'Cookie Policy Generator', desc: 'GDPR-compliant cookie policy.', badge: 'New' },
      { slug: 'ai-pitch-deck-outline', icon: '📊', name: 'Pitch Deck Outline', desc: '12-slide investor deck with talking points.', badge: 'New' },
    ],
  },
  {
    name: 'Social & Personal', tools: [
      { slug: 'social-bio-generator', icon: '👤', name: 'Social Bio Generator', desc: 'Platform-specific bios for all social networks.' },
      { slug: 'resume-builder', icon: '📄', name: 'AI Resume Builder', desc: 'Professional ATS-friendly resumes.' },
      { slug: 'review-response-generator', icon: '⭐', name: 'Review Response Generator', desc: 'Professional responses for 1-5 star reviews.' },
      { slug: 'ai-cover-letter', icon: '💼', name: 'AI Cover Letter Writer', desc: 'Personalized, compelling cover letters.', badge: 'New' },
      { slug: 'ai-linkedin-summary', icon: '🔗', name: 'LinkedIn Summary Writer', desc: '3 LinkedIn About styles: story, results, thought leader.', badge: 'New' },
      { slug: 'ai-youtube-about', icon: '▶️', name: 'YouTube About Section', desc: 'Channel About with keywords and CTA.', badge: 'New' },
      { slug: 'ai-personal-bio', icon: '🪪', name: 'Personal Bio Generator', desc: '5 bio lengths: 25 to 300 words.', badge: 'New' },
    ],
  },
  {
    name: 'Productivity', tools: [
      { slug: 'ai-translator', icon: '🌍', name: 'AI Translator', desc: 'Detect language and translate with pronunciation.', badge: 'Popular' },
      { slug: 'ai-quote-generator', icon: '💬', name: 'AI Quote Generator', desc: 'Generate 10 original, shareable quotes.' },
      { slug: 'website-roaster', icon: '🔥', name: 'Roast My Website', desc: 'Get a savage, hilarious roast of your website.', badge: 'Viral' },
      { slug: 'ai-meeting-agenda', icon: '📋', name: 'Meeting Agenda Generator', desc: 'Professional agendas with time allocations.', badge: 'New' },
      { slug: 'ai-smart-goals', icon: '🎯', name: 'SMART Goals Generator', desc: 'Convert any goal into 5 SMART goals with action plans.', badge: 'New' },
      { slug: 'ai-pros-cons', icon: '⚖️', name: 'Pros and Cons Analyzer', desc: '8 pros + 8 cons with impact levels and recommendation.', badge: 'New' },
      { slug: 'ai-brainstorm', icon: '🧠', name: 'AI Brainstorming Tool', desc: '25 ideas using 5 proven brainstorming frameworks.', badge: 'New' },
      { slug: 'ai-faq-generator', icon: '❓', name: 'FAQ Generator', desc: '15 FAQs with answers + JSON-LD schema.', badge: 'New' },
      { slug: 'ai-survey-questions', icon: '📝', name: 'Survey Question Generator', desc: '15-question survey with multiple types.', badge: 'New' },
      { slug: 'ai-project-plan', icon: '🗂️', name: 'Project Plan Generator', desc: 'Full project plan with milestones and risk register.', badge: 'New' },
      { slug: 'ai-sop-writer', icon: '📑', name: 'SOP Writer', desc: 'Standard Operating Procedures with quality checks.', badge: 'New' },
    ],
  },
  {
    name: '🛒 E-Commerce', tools: [
      { slug: 'ai-amazon-listing', icon: '📦', name: 'Amazon Listing Writer', desc: 'Complete title, bullets, description + backend keywords.', badge: 'New' },
      { slug: 'ai-etsy-description', icon: '🎁', name: 'Etsy Shop Description', desc: 'Story-driven descriptions with all 13 tags.', badge: 'New' },
      { slug: 'ai-product-title-optimizer', icon: '✏️', name: 'Product Title Optimizer', desc: 'Optimized titles for Amazon, Shopify, Etsy, eBay.', badge: 'New' },
      { slug: 'ai-dropshipping-ideas', icon: '📨', name: 'Dropshipping Product Ideas', desc: '10 profitable products with margins and angles.', badge: 'New' },
      { slug: 'ai-promo-copy', icon: '🏷️', name: 'Promotional Copy Generator', desc: 'Sale emails, social posts, SMS, push notifications.', badge: 'New' },
    ],
  },
  {
    name: '💰 Finance & Fundraising', tools: [
      { slug: 'ai-investor-email', icon: '💰', name: 'Investor Pitch Email', desc: '3 investor email types: angel, VC, strategic.', badge: 'New' },
      { slug: 'ai-grant-proposal', icon: '🏛️', name: 'Grant Proposal Writer', desc: 'Complete grant proposals for nonprofits.', badge: 'New' },
      { slug: 'ai-financial-summary', icon: '📊', name: 'Financial Report Summary', desc: 'CFO-level financial summaries with KPIs.', badge: 'New' },
      { slug: 'ai-budget-planner', icon: '💳', name: 'Budget Planner', desc: 'Detailed budget with income, expenses, and projections.', badge: 'New' },
    ],
  },
];

const TOOLS_HERO_IMAGE = aiImage('collage of glowing AI tool icons — pen, image, chart, code, megaphone — floating above a workspace, colorful illustration', 700, 900);

function ToolCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="card p-5 group relative">
      {tool.badge && (
        <span className={`absolute top-4 right-4 badge text-[10px] ${
          tool.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
          tool.badge === 'New' ? 'bg-violet-100 text-violet-700' :
          tool.badge === 'Viral' ? 'bg-red-100 text-red-700' :
          'bg-emerald-100 text-emerald-700'
        }`}>{tool.badge}</span>
      )}
      <span className="text-3xl mb-3 block">{tool.icon}</span>
      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">{tool.name}</h3>
      <p className="text-sm text-slate-500">{tool.desc}</p>
    </Link>
  );
}

export default function Tools() {
  const [search, setSearch] = useState('');

  const totalTools = TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0);

  const filteredCategories = TOOL_CATEGORIES.map(cat => ({
    ...cat,
    tools: cat.tools.filter(t =>
      !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.tools.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 relative grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot"></span>
              {totalTools}+ Tools — 100% Free — No Login
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
              Free AI Tools for <span className="gradient-text">Every Task</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Humanize text, build websites, write blogs, generate images, create logos, audit SEO, write scripts, plan projects, and more — in seconds.
            </p>
            <div className="max-w-xl mx-auto lg:mx-0 mt-10">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tools..."
                className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-2xl text-sm outline-none focus:border-blue-500 shadow-sm"
              />
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 hidden lg:block">
            <img src={TOOLS_HERO_IMAGE} alt="AI tools" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredCategories.map(cat => (
          <div key={cat.name} className="mb-12">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5">{cat.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-500">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
