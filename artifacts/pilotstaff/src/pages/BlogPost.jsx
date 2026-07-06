import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { apiRequest } from '../lib/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setPost(null);

    apiRequest(`/api/blog/${slug}`, { cache: true, cacheTtl: 300000 })
      .then(data => {
        if (cancelled) return;
        setPost(data.post);
        return apiRequest(`/api/blog?category=${encodeURIComponent(data.post.category)}`, { cache: true, cacheTtl: 300000 });
      })
      .then(listData => {
        if (cancelled || !listData) return;
        setRelated((listData.posts || []).filter(p => p.slug !== slug).slice(0, 3));
      })
      .catch(() => { if (!cancelled) setNotFound(true); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-4 animate-fade-up">
          <div className="h-4 w-40 rounded skeleton" />
          <div className="h-10 w-3/4 rounded skeleton" />
          <div className="h-4 w-full rounded skeleton" />
          <div className="aspect-[16/9] w-full rounded-2xl skeleton mt-6" />
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <p className="text-5xl mb-4">📝</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="btn-primary px-6 py-3 rounded-xl text-sm">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 animate-fade-up">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium line-clamp-1">{post.title}</span>
        </nav>
      </div>

      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">{post.category}</span>
          <span className="text-sm text-slate-400">{post.readTime} read</span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm text-slate-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">{post.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{post.excerpt}</p>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-fade-up" style={{ animationDelay: '160ms' }}>
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
                <Link key={p.slug} href={`/blog/${p.slug}`} className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors group items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm mb-1">{p.title}</h3>
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
