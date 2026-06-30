import { Link } from 'wouter';
import SocialProofBar from '../components/home/SocialProofBar';
import FreeToolsSection from '../components/home/FreeToolsSection';
import AiStaffSection from '../components/home/AiStaffSection';
import ComparisonSection from '../components/home/ComparisonSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import ReferralCtaSection from '../components/home/ReferralCtaSection';
import FinalCtaSection from '../components/home/FinalCtaSection';

const TOP_TOOLS = [
  { slug: 'ai-humanizer', icon: '✍️', name: 'AI Humanizer', desc: 'Remove AI detection from any text instantly', badge: 'Viral' },
  { slug: 'seo-audit-checker', icon: '🔍', name: 'SEO Audit Checker', desc: 'Get a complete SEO score and fix list', badge: 'New' },
  { slug: 'ai-website-builder', icon: '🌐', name: 'AI Website Builder', desc: 'Build complete websites in 10 seconds', badge: 'Popular' },
  { slug: 'ai-blog-writer', icon: '📝', name: 'AI Blog Writer', desc: '1500-word SEO articles instantly', badge: 'New' },
  { slug: 'ai-image-generator', icon: '🖼️', name: 'AI Image Generator', desc: 'Text to stunning images free', badge: 'Free' },
  { slug: 'youtube-to-blog', icon: '🎬', name: 'YouTube to Blog', desc: 'Convert any video into a blog post', badge: 'New' },
  { slug: 'ai-logo-maker', icon: '🎨', name: 'AI Logo Maker', desc: 'Professional logos in seconds' },
  { slug: 'business-name-generator', icon: '💡', name: 'Business Name Generator', desc: 'Catchy startup names with domains' },
  { slug: 'meta-tag-generator', icon: '🏷️', name: 'Meta Tag Generator', desc: 'Perfect SEO meta tags' },
];

const AI_STAFF = [
  { icon: '📝', name: 'AI Content Writer', price: 19, desc: 'Blogs, articles, social posts 24/7', tasks: ['Blog posts', 'Social media', 'Newsletters', 'Product descriptions'] },
  { icon: '🔍', name: 'AI SEO Expert', price: 39, desc: 'Audits sites, finds keywords, ranks pages', tasks: ['Site audits', 'Keyword research', 'Meta optimization', 'Rank tracking'] },
  { icon: '📱', name: 'AI Social Manager', price: 29, desc: 'Creates and schedules content automatically', tasks: ['Content calendar', 'Auto-posting', 'Hashtag research', 'Analytics'] },
  { icon: '📧', name: 'AI Email Marketer', price: 29, desc: 'Writes email sequences that convert', tasks: ['Drip campaigns', 'Newsletters', 'Subject lines', 'Follow-ups'] },
  { icon: '🎧', name: 'AI Support Agent', price: 29, desc: '24/7 customer support chatbot', tasks: ['Live chat', 'FAQ answers', 'Ticket routing', 'Multi-language'] },
  { icon: '🎬', name: 'AI Video Scriptwriter', price: 19, desc: 'Viral scripts for YouTube and Reels', tasks: ['YouTube scripts', 'TikTok hooks', 'Video outlines', 'Titles'] },
  { icon: '🎯', name: 'Funnel Architect', price: 49, desc: 'Build $10M+ conversion funnels', tasks: ['Traffic strategy', 'Lead magnets', 'Email sequences', 'Close pages'], premium: true },
  { icon: '📈', name: 'LinkedIn Growth Hacker', price: 49, desc: 'Build personal brand that generates leads', tasks: ['Profile optimization', 'Viral posts', 'DM scripts', 'Daily routine'], premium: true },
  { icon: '⭐', name: 'Reputation Manager', price: 39, desc: 'Protect and grow your online reputation', tasks: ['Review acquisition', 'Negative burial', 'Response templates', 'Social listening'], premium: true },
];

const COMPARISON = [
  { feature: 'Monthly Cost', human: '$3,000–$5,000', ai: '$19–$49', winner: 'ai' },
  { feature: 'Working Hours', human: '8 hours/day', ai: '24/7, 365 days', winner: 'ai' },
  { feature: 'Sick Days', human: '10–15 per year', ai: 'None', winner: 'ai' },
  { feature: 'Training Time', human: '2–4 weeks', ai: 'Instant', winner: 'ai' },
  { feature: 'Speed Per Task', human: '2–3 days', ai: 'Seconds', winner: 'ai' },
];

const STATS = [
  { value: '77+', label: 'Free AI Tools' },
  { value: '11', label: 'AI Staff Members' },
  { value: '2.1K+', label: 'Active Users' },
  { value: '15K+', label: 'Tasks Completed' },
];

const TESTIMONIALS = [
  { name: 'Raj S.', role: 'Digital Agency Owner', text: 'Replaced my content team. Saving $4,000/month. AI Content Writer produces better articles than my writers.', stars: 5 },
  { name: 'Priya M.', role: 'E-commerce Owner', text: 'AI Support Agent handles 90% of queries. My customers love the instant responses. Sales increased 30%.', stars: 5 },
  { name: 'Amit K.', role: 'SaaS Founder', text: 'SEO Expert found keywords my agency missed. Ranked #3 for my main keyword in 6 weeks. Incredible ROI.', stars: 5 },
];

const PRICING_PLANS = [
  { name: 'Free', price: '$0', period: 'forever', cta: 'Start Free', href: '/tools', highlight: false },
  { name: 'Pro Tools', price: '$29', period: '/mo', cta: 'Subscribe via PayPal', href: '/pricing', highlight: true },
  { name: 'Agency', price: '$99', period: '/mo', cta: 'Subscribe via PayPal', href: '/pricing', highlight: false },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-dot"></span>
            77+ Free AI Tools — No Login Required
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Hire <span className="gradient-text">AI Employees</span><br />for Your Business
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop paying $5,000/month for freelancers. AI employees work 24/7, never sleep, and cost a fraction of the price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/staff" className="btn-primary px-8 py-4 rounded-2xl text-lg inline-flex items-center justify-center gap-2">
              Hire AI Staff →
            </Link>
            <Link href="/tools" className="btn-outline px-8 py-4 rounded-2xl text-lg inline-flex items-center justify-center gap-2">
              Try Free Tools
            </Link>
          </div>
          <p className="text-sm text-slate-400">No credit card · Free forever plan · Cancel anytime</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16">
          {STATS.map(s => (
            <div key={s.label} className="text-center bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SocialProofBar />
      <FreeToolsSection tools={TOP_TOOLS} />
      <AiStaffSection staff={AI_STAFF} />
      <ComparisonSection data={COMPARISON} />
      <HowItWorksSection />
      <TestimonialsSection testimonials={TESTIMONIALS} />
      <PricingSection plans={PRICING_PLANS} />
      <ReferralCtaSection />
      <FinalCtaSection />
    </div>
  );
}
