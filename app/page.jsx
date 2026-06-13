"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [reelUrl, setReelUrl] = useState('');
  const [reelResult, setReelResult] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [coupons, setCoupons] = useState([]);

  useEffect(() => { fetchTrending(); }, []);

  const fetchTrending = async () => {
    const { data } = await supabase.from('store_products').select('*').order('created_at', { ascending: false }).limit(8);
    if(data) setTrending(data);
  };

  // INSTAGRAM REEL FINDER TOOL
  const findReelProduct = async (e) => {
    e.preventDefault();
    setReelResult("🔍 AI is analyzing the reel...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reel-finder`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: reelUrl })
      });
      const data = await res.json();
      if(data.success) setReelResult(`🎯 Product Found: ${data.data.name} | Est. Price: $${data.data.price}`);
    } catch(e) { setReelResult("❌ Error finding product."); }
  };

  // COUPON GENERATOR TOOL
  const generateCoupons = async (e) => {
    e.preventDefault();
    setCoupons(["⏳ Generating real-time coupons..."]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-coupon`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ store: storeName })
      });
      const data = await res.json();
      if(data.success) setCoupons(data.coupons.map(c => `🎟️ Code: ${c.code} | Discount: ${c.discount}`));
    } catch(e) { setCoupons(["❌ Error generating coupons."]); }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-32 text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">Smart Shopping <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Powered by AI</span></h1>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">Find products from Reels, compare prices across 8 sites, and get the best deals worldwide. Free Shipping!</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/store" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition text-lg shadow-lg">Shop Trending 🛍️</Link>
            <a href="#tools" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">Use Free Tools 🛠️</a>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold">🔥 Trending Products</h2>
          <Link href="/store" className="text-blue-600 font-bold hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trending.length === 0 ? (
            <p className="text-gray-400 col-span-4 text-center py-10">⏳ AI is fetching latest products...</p>
          ) : (
            trending.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition group overflow-hidden">
                <div className="relative aspect-square bg-gray-50 p-4 overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-contain group-hover:scale-110 transition-transform" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="p-4 border-t">
                  <h3 className="font-bold text-sm line-clamp-2 mb-2 h-10">{p.name}</h3>
                  <p className="text-blue-600 font-extrabold text-lg">${p.price_usd} <span className="text-xs text-green-600 font-normal">FREE Ship</span></p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* POWERFUL TOOLS SECTION (Traffic Magnets) */}
      <section id="tools" className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12">🛠️ Viral Shopping Tools (Free)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* INSTAGRAM REEL PRODUCT FINDER */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-2">📱 Reel Product Finder</h3>
              <p className="text-sm text-gray-500 mb-4">Saw a cool product on Instagram Reel? Paste the link & our AI will find it for you at the lowest price!</p>
              <form onSubmit={findReelProduct} className="space-y-3">
                <input type="text" value={reelUrl} onChange={(e)=>setReelUrl(e.target.value)} placeholder="Paste Instagram Reel Link..." className="w-full border p-3 rounded-xl outline-none" required />
                <button type="submit" className="w-full bg-pink-600 text-white p-3 rounded-xl font-bold hover:bg-pink-700">Find Product 🔍</button>
              </form>
              {reelResult && <p className="mt-3 text-sm bg-pink-50 p-3 rounded-xl border font-medium">{reelResult}</p>}
            </div>

            {/* COUPON GENERATOR */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-2">🎟️ AI Coupon Generator</h3>
              <p className="text-sm text-gray-500 mb-4">Don't pay full price! Enter store name and our AI will find hidden discount codes for you.</p>
              <form onSubmit={generateCoupons} className="space-y-3">
                <input type="text" value={storeName} onChange={(e)=>setStoreName(e.target.value)} placeholder="e.g., Amazon, Flipkart, Myntra" className="w-full border p-3 rounded-xl outline-none" required />
                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">Get Coupons 💸</button>
              </form>
              {coupons.length > 0 && <div className="mt-3 space-y-2">{coupons.map((c, i) => <p key={i} className="text-sm bg-green-50 p-2 rounded border">{c}</p>)}</div>}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
