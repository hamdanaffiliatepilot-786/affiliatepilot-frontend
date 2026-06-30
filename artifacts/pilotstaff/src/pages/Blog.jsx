import { useState } from 'react';
import { Link } from 'wouter';

const BLOG_POSTS = [
  { slug: 'how-to-use-ai-humanizer', title: 'How to Use AI Humanizer to Pass Detection Tools', excerpt: 'Learn how to make your AI content sound completely human and bypass AI detection tools.', category: 'Tutorials', readTime: '5 min', date: '2024-06-01', content: '<p>AI content detection is becoming more sophisticated. Here\'s how to use our AI Humanizer tool effectively...</p>' },
  { slug: 'ai-seo-strategy-2024', title: 'Complete AI SEO Strategy for 2024', excerpt: 'Use AI tools to dominate search rankings. Step-by-step guide.', category: 'SEO', readTime: '8 min', date: '2024-05-20', content: '<p>SEO has evolved dramatically with AI. Here\'s how to leverage AI tools for maximum visibility...</p>' },
  { slug: 'replace-employee-with-ai-staff', title: 'How I Replaced 3 Employees with AI Staff', excerpt: 'Real case study: saving $8,000/month by switching to AI staff.', category: 'Case Studies', readTime: '6 min', date: '2024-05-10', content: '<p>When I first heard about AI employees, I was skeptical. But after trying PilotStaff...</p>' },
  { slug: 'free-ai-tools-for-business', title: '10 Best Free AI Tools for Small Business in 2024', excerpt: 'These free AI tools will transform your productivity overnight.', category: 'Tutorials', readTime: '7 min', date: '2024-04-28', content: '<p>Small businesses can now access AI tools that were previously only available to large enterprises...</p>' },
  { slug: 'ai-content-writer-guide', title: 'Ultimate Guide to AI Content Writing', excerpt: 'Everything you need to know about using AI to write better content faster.', category: 'Tutorials', readTime: '10 min', date: '2024-04-15', content: '<p>Content creation has been revolutionized by AI. Here\'s how to use it effectively...</p>' },
  { slug: 'website-builder-tutorial', title: 'Build a Website in 10 Seconds with AI', excerpt: 'Watch how our AI Website Builder creates complete, professional websites instantly.', category: 'Tutorials', readTime: '4 min', date: '2024-04-01', content: '<p>Gone are the days of spending weeks building a website. With AI Website Builder...</p>' },
];

const CATEGORIES = ['All', 'Tutorials', 'SEO', 'Case Studies'];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = BLOG_POSTS.filter(post => {
    const matchCategory = category === 'All' || post.category === category;
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">PilotStaff Blog</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">Learn how to use AI tools and staff. Step-by-step tutorials for beginners.</p>
          </div>
          <div className="max-w-2xl mx-auto mt-10">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tutorials..." className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📝</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No posts found</h3>
            <p className="text-slate-500">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  post.category === 'SEO' ? 'bg-blue-100 text-blue-700' :
                  post.category === 'Case Studies' ? 'bg-violet-100 text-violet-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>{post.category}</span>
                <h3 className="font-bold text-slate-900 mt-3 mb-2 group-hover:text-blue-600 transition leading-snug">{post.title}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
