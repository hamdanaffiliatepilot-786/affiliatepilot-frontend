"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [product, setProduct] = useState('');
  const [deals, setDeals] = useState([]);
  const [emiResult, setEmiResult] = useState('');
  const [currResult, setCurrResult] = useState('');

  useEffect(() => { fetchTrending(); }, []);

  const fetchTrending = async () => {
    const { data } = await supabase.from('store_products').select('*').order('created_at', { ascending: false }).limit(8);
    if(data) setTrending(data);
  };

  const findDeals = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compare-prices`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product })
      });
      const data = await res.json();
      if(data.success) setDeals(data.prices);
    } catch(e) {}
  };

  const calcEMI = (e) => {
    e.preventDefault(); const P = parseFloat(e.target.loan.value);
    const r = parseFloat(e.target.rate.value) / 12 / 100; const n = parseFloat(e.target.months.value);
    if(P && r && n) { const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); setEmiResult(`💰 Monthly EMI = ₹${emi.toFixed(2)} | Total = ₹${(emi * n).toFixed(2)}`); }
  };

  const convertCurrency = async (e) => {
    e.preventDefault(); const amt = e.target.amount.value; const from = e.target.from.value; const to = e.target.to.value;
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json(); const rate = data.rates[to];
      setCurrResult(`✅ ${amt} ${from} = ${(amt * rate).toFixed(2)} ${to}`);
    } catch(e) { setCurrResult("Error"); }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-32 text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">Smart Shopping <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Powered by AI</span></h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Find products from Reels, compare prices across 8 sites, and get the best deals worldwide. Free Shipping!</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/store" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition text-lg shadow-lg">Shop Trending 🛍️</Link>
            <a href="#tools" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">Use Free Tools 🛠️</a>
          </div>
          <div className="flex justify-center gap-8 mt-12 text-sm font-medium text-gray-300">
            <span>🔒 100% Secure</span>
            <span>🤖 AI Powered</span>
            <span>✈️ FREE Shipping</span>
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
            <p className="text-gray-400 col-span-4 text-center py-10">⏳ AI is fetching latest products. Please wait or click import!</p>
          ) : (
            trending.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition group overflow-hidden">
                {/* NEXT.JS OPTIMIZED IMAGE */}
                <div className="relative aspect-square bg-gray-50 p-4 overflow-hidden">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-contain group-hover:scale-110 transition-transform" 
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
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

      {/* TOOLS SECTION */}
      <section id="tools" className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12">🛠️ Smart Shopping Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Tool 1: Compare */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-4">🔍 Price Comparison</h3>
              <form onSubmit={findDeals} className="space-y-3">
                <input type="text" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g., iPhone 15" className="w-full border p-3 rounded-xl outline-none" required />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">Compare</button>
              </form>
              {deals.length > 0 && <div className="mt-4 max-h-40 overflow-auto">{deals.slice(0,3).map((d, i) => <div key={i} className="flex justify-between text-sm border-b py-2"><span className="font-bold">{d.store}</span><a href={d.url} target="_blank" className="text-blue-600 underline">Visit</a></div>)}</div>}
            </div>

            {/* Tool 2: EMI */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-4">💳 EMI Calculator</h3>
              <form onSubmit={calcEMI} className="space-y-3">
                <input name="loan" type="number" placeholder="Loan Amount (₹)" className="w-full border p-3 rounded-xl outline-none" required />
                <input name="rate" type="number" placeholder="Interest Rate (%)" className="w-full border p-3 rounded-xl outline-none" required />
                <input name="months" type="number" placeholder="Tenure (Months)" className="w-full border p-3 rounded-xl outline-none" required />
                <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700">Calculate</button>
              </form>
              {emiResult && <p className="mt-3 text-sm bg-purple-50 p-3 rounded-xl border">{emiResult}</p>}
            </div>

            {/* Tool 3: Currency */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-4">💱 Currency Converter</h3>
              <form onSubmit={convertCurrency} className="space-y-3">
                <input name="amount" type="number" defaultValue="100" className="w-full border p-3 rounded-xl outline-none" required />
                <div className="flex gap-2">
                  <select name="from" className="w-1/2 border p-3 rounded-xl outline-none"><option>USD</option><option>EUR</option></select>
                  <select name="to" className="w-1/2 border p-3 rounded-xl outline-none"><option>INR</option><option>USD</option></select>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">Convert</button>
              </form>
              {currResult && <p className="mt-3 text-sm bg-green-50 p-3 rounded-xl border">{currResult}</p>}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}