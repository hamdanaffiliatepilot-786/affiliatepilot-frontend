import { Link, useParams } from 'wouter';

const BLOG_POSTS = [
  { slug: 'how-to-use-ai-humanizer', title: 'How to Use AI Humanizer to Pass Detection Tools', excerpt: 'Learn how to make your AI content sound completely human and bypass AI detection tools.', category: 'Tutorials', readTime: '5 min', date: '2024-06-01', content: '<p>AI content detection is becoming more sophisticated. Here\'s how to use our AI Humanizer tool effectively to make your content sound 100% human.</p><h2>Why AI Detection Matters</h2><p>Many platforms now use AI detection tools. Our humanizer rewrites content while preserving its meaning but changing the patterns that AI detectors look for.</p><h2>Step-by-Step Guide</h2><ol><li>Go to the AI Humanizer tool</li><li>Paste your AI-generated content</li><li>Click "Humanize" and wait a few seconds</li><li>Review and copy the humanized output</li></ol>' },
  { slug: 'ai-seo-strategy-2024', title: 'Complete AI SEO Strategy for 2024', excerpt: 'Use AI tools to dominate search rankings. Step-by-step guide.', category: 'SEO', readTime: '8 min', date: '2024-05-20', content: '<p>SEO has evolved dramatically with AI. Here\'s how to leverage AI tools for maximum visibility in search engines.</p><h2>Keyword Research with AI</h2><p>Our SEO Audit Checker and Meta Tag Generator can identify high-opportunity keywords you might be missing.</p><h2>Content Creation at Scale</h2><p>Use the AI Blog Writer to produce consistent, high-quality content that ranks.</p>' },
  { slug: 'replace-employee-with-ai-staff', title: 'How I Replaced 3 Employees with AI Staff', excerpt: 'Real case study: saving $8,000/month by switching to AI staff.', category: 'Case Studies', readTime: '6 min', date: '2024-05-10', content: '<p>When I first heard about AI employees, I was skeptical. But after trying PilotStaff for 30 days, I was convinced.</p><h2>Before: My Team Costs</h2><p>I was spending $8,000/month on: content writer ($3,000), social media manager ($2,500), SEO specialist ($2,500).</p><h2>After: AI Staff Costs</h2><p>I now spend $87/month on: AI Content Writer ($19), AI Social Staff ($29), AI SEO Expert ($39).</p>' },
  { slug: 'free-ai-tools-for-business', title: '10 Best Free AI Tools for Small Business in 2024', excerpt: 'These free AI tools will transform your productivity overnight.', category: 'Tutorials', readTime: '7 min', date: '2024-04-28', content: '<p>Small businesses can now access AI tools that were previously only available to large enterprises. Here are the best ones.</p><h2>Top 10 Tools</h2><ol><li>AI Humanizer</li><li>AI Blog Writer</li><li>SEO Audit Checker</li><li>AI Image Generator</li><li>Business Name Generator</li><li>Meta Tag Generator</li><li>AI Code Generator</li><li>Resume Builder</li><li>Email Writer</li><li>Content Calendar</li></ol>' },
  { slug: 'ai-content-writer-guide', title: 'Ultimate Guide to AI Content Writing', excerpt: 'Everything you need to know about using AI to write better content faster.', category: 'Tutorials', readTime: '10 min', date: '2024-04-15', content: '<p>Content creation has been revolutionized by AI. Here\'s how to use it effectively for your business.</p><h2>Types of Content AI Can Write</h2><ul><li>Blog posts and articles</li><li>Social media posts</li><li>Email newsletters</li><li>Product descriptions</li><li>Ad copy</li></ul>' },
  { slug: 'website-builder-tutorial', title: 'Build a Website in 10 Seconds with AI', excerpt: 'Watch how our AI Website Builder creates complete, professional websites instantly.', category: 'Tutorials', readTime: '4 min', date: '2024-04-01', content: '<p>Gone are the days of spending weeks building a website. With AI Website Builder, you can create a complete, professional website in seconds.</p><h2>How It Works</h2><p>Simply describe your business and the AI generates a full HTML website with navigation, sections, and styling.</p>' },
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">📝</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="btn-primary px-6 py-3 rounded-xl text-sm">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium line-clamp-1">{post.title}</span>
        </nav>
      </div>

      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">{post.category}</span>
          <span className="text-sm text-slate-400">{post.readTime} read</span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm text-slate-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">{post.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{post.excerpt}</p>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose-output" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h3 className="font-bold text-slate-900 mb-2">Ready to try PilotStaff?</h3>
          <p className="text-slate-500 text-sm mb-4">77+ free AI tools, no login required. Hire AI staff starting at $19/mo.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/tools" className="btn-primary px-5 py-2.5 rounded-xl text-sm">Try Free Tools</Link>
            <Link href="/staff" className="btn-outline px-5 py-2.5 rounded-xl text-sm">View AI Staff</Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-bold text-slate-900 text-xl mb-6">Related Posts</h2>
            <div className="grid gap-4">
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition group">
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition text-sm mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-400">{p.readTime} read · {p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
