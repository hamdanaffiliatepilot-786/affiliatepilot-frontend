import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { apiRequest } from '../lib/api';

const CATEGORIES = ['All', 'AI Staff', 'Tutorials', 'SEO', 'Case Studies'];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    apiRequest(`/api/blog${category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`, { cache: true, cacheTtl: 120000 })
      .then(data => { if (!cancelled) setPosts(data.posts || []); })
      .catch(e => { if (!cancelled) setError(e?.message || 'Could not load blog posts.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [category]);

  const filtered = posts.filter(post =>
    !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative animate-fade-up">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">PilotStaff Blog</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">Learn how to use AI tools and AI staff. New tutorials published daily, one for every tool and agent.</p>
          </div>
          <div className="max-w-2xl mx-auto mt-10">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tutorials..." className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-shadow" />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === cat ? 'bg-blue-600 text-white scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                <div className="aspect-[16/9] w-full skeleton" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 rounded-full skeleton" />
                  <div className="h-5 w-full rounded skeleton" />
                  <div className="h-4 w-3/4 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 animate-fade-up">
            <p className="text-5xl mb-4">⚠️</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Could not load posts</h3>
            <p className="text-slate-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 animate-fade-up">
            <p className="text-5xl mb-4">📝</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No posts found</h3>
            <p className="text-slate-500">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card overflow-hidden group flex flex-col animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full self-start ${
                    post.category === 'SEO' ? 'bg-blue-100 text-blue-700' :
                    post.category === 'Case Studies' ? 'bg-violet-100 text-violet-700' :
                    post.category === 'AI Staff' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>{post.category}</span>
                  <h3 className="font-bold text-slate-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
