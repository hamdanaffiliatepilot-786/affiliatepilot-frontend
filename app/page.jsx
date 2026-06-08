"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currResult, setCurrResult] = useState('');
  const [dealResult, setDealResult] = useState('Search a product to find global deals!');

  const supabase = createClient('https://pvsqvpbjhiwjgifbgmzl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3F2cGJqaGl3amdpZmJnbXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTQ4NDIsImV4cCI6MjA5NjM5MDg0Mn0.yPclmBshKqP15iKzIV3mydvxjBI_uruXOZAPQwAuD5s');

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('products').select('*');
      if(data) setProducts(data);
    }
    loadData();
  }, []);

  const convertCurrency = async (e) => {
    e.preventDefault();
    const amt = e.target.amount.value;
    const from = e.target.from.value;
    const to = e.target.to.value;
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`);
      const data = await res.json();
      setCurrResult(`✅ ${amt} ${from} = ${Object.values(data.rates)[0].toFixed(2)} ${to}`);
    } catch(e) { setCurrResult("Error fetching rates."); }
  };

  const findDeals = async (e) => {
    e.preventDefault();
    const product = e.target.product.value;
    setDealResult(`🔍 Click to compare prices for "${product}":\n\n🛒 Amazon India: https://www.amazon.in/s?k=${encodeURIComponent(product)}\n\n🛒 Flipkart: https://www.flipkart.com/search?q=${encodeURIComponent(product)}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b p-4 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-blue-600">Affiliate<span className="text-gray-900">Pilot</span> <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded">PRO</span></h1>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#tools">Tools</a>
          <a href="#store">Store</a>
          <a href="https://hamdanaffiliatepilot.blogspot.com" target="_blank">Blog</a>
          <a href="#legal">Legal</a>
          <a href="/admin" className="text-gray-400 hover:text-blue-600 text-xs"><i className="fas fa-lock mr-1"></i>Agent</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20 text-center px-4">
        <h2 className="text-5xl font-extrabold mb-4">Smart Global Shopping AI</h2>
        <p className="text-lg text-gray-300 mb-8">Real-time currency, AI deal finder & live coupons. Founded by Hamdan.</p>
        <a href="#tools" className="bg-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Use Free Tools</a>
      </section>

      {/* TOOLS */}
      <section id="tools" className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span className="text-green-500">💱</span> Real-Time Currency</h3>
          <form onSubmit={convertCurrency} className="space-y-3">
            <input name="amount" type="number" defaultValue="100" className="w-full border p-2 rounded-lg" required />
            <div className="flex gap-2">
              <select name="from" className="w-full border p-2 rounded-lg"><option>USD</option><option>EUR</option><option>GBP</option></select>
              <select name="to" className="w-full border p-2 rounded-lg"><option>INR</option><option>EUR</option><option>USD</option></select>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg font-bold hover:bg-green-700 transition">Convert Live</button>
          </form>
          {currResult && <p className="mt-3 text-sm bg-green-50 p-2 rounded-lg font-mono">{currResult}</p>}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span className="text-blue-500">🔍</span> AI Global Deal Finder</h3>
          <form onSubmit={findDeals} className="space-y-3">
            <input name="product" type="text" placeholder="e.g., Sony WH-1000XM5" className="w-full border p-2 rounded-lg" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition">Find Best Deal</button>
          </form>
          <p className="mt-3 text-sm bg-blue-50 p-2 rounded-lg whitespace-pre-wrap">{dealResult}</p>
        </div>
      </section>

      {/* STORE */}
      <section id="store" className="py-20 bg-gray-50 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14"><h2 className="text-3xl font-bold">🤖 PilotBot's Daily Finds</h2><p className="text-gray-500 mt-2">Affiliate deals & CJ Dropshipping inventory.</p></div>
        
        {products.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl border shadow-sm">
            <p className="text-gray-500 font-medium">⏳ Waiting for PilotBot to sync products...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <img src={p.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={p.name} className="w-full h-48 object-cover bg-gray-100" loading="lazy"/>
                <div className="p-5">
                  <h3 className="font-bold text-sm mb-2 h-10">{p.name || 'Product'}</h3>
                  <p className="text-xs text-gray-500 mb-3">{p.description || 'Best deal found by AI.'}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-blue-600">${p.price || '0'}</span>
                    <a href={p.source === 'cj_dropship' ? '#' : (p.affiliate_link || '#')} target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition">
                      {p.source === 'cj_dropship' ? 'Buy Now' : 'Get Deal 🔗'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LEGAL */}
      <section id="legal" className="max-w-4xl mx-auto p-6 mt-8 mb-20 bg-white rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Legal Pages</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div><h3 className="font-bold text-gray-900">Privacy Policy</h3><p>We collect emails for price drop alerts. Purchases are made directly on the respective retailer's website. We use Google AdSense/Analytics.</p></div>
          <div><h3 className="font-bold text-gray-900">Terms of Service</h3><p>Prices displayed are estimates fetched from third-party platforms. Use tools for informational purposes only.</p></div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200"><h3 className="font-bold text-gray-900">Affiliate Disclosure</h3><p>AffiliatePilot is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, I (Hamdan) earn from qualifying purchases.</p></div>
        </div>
      </section>

    </main>
  );
}
