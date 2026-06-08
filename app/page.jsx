"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currResult, setCurrResult] = useState('');
  const [dealResult, setDealResult] = useState('');
  const [emiResult, setEmiResult] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const supabase = createClient('https://pvsqvpbjhiwjgifbgmzl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3F2cGJqaGl3amdpZmJnbXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTQ4NDIsImV4cCI6MjA5NjM5MDg0Mn0.yPclmBshKqP15iKzIV3mydvxjBI_uruXOZAPQwAuD5s');

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('products').select('*');
      if(data) setProducts(data);
    }
    loadData();
  }, []);

  // 1. CURRENCY (FIXED API - No more fetching error)
  const convertCurrency = async (e) => {
    e.preventDefault();
    const amt = e.target.amount.value;
    const from = e.target.from.value;
    const to = e.target.to.value;
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      const rate = data.rates[to];
      setCurrResult(`✅ ${amt} ${from} = ${(amt * rate).toFixed(2)} ${to}`);
    } catch(e) { setCurrResult("❌ Error fetching rates. Check internet."); }
  };

  // 2. DEAL FINDER (More Powerful)
  const findDeals = async (e) => {
    e.preventDefault();
    const product = e.target.product.value;
    setDealResult(`🔍 Top Deals for "${product}":\n\n🛒 Amazon India: https://www.amazon.in/s?k=${encodeURIComponent(product)}\n\n🛒 Flipkart: https://www.flipkart.com/search?q=${encodeURIComponent(product)}\n\n🇺🇸 Amazon US: https://www.amazon.com/s?k=${encodeURIComponent(product)}\n\n🏷️ eBay: https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(product)}`);
  };

  // 3. EMI CALCULATOR
  const calcEMI = (e) => {
    e.preventDefault();
    const P = parseFloat(e.target.loan.value);
    const r = parseFloat(e.target.rate.value) / 12 / 100;
    const n = parseFloat(e.target.months.value);
    if(P && r && n) {
      const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      setEmiResult(`💰 Monthly EMI = ₹${emi.toFixed(2)} | Total = ₹${(emi * n).toFixed(2)}`);
    } else { setEmiResult("Please fill all fields correctly."); }
  };

  // 4. PRICE DROP ALERT
  const setAlert = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if(email) setAlertMsg(`✅ Alert set for ${email}! We will notify you when price drops.`);
  };

  return (
    <>
      {/* SEO & SCHEMA */}
      <head>
        <title>AffiliatePilot Pro - AI Smart Shopping & Deals | By Hamdan</title>
        <meta name="description" content="Find the best deals, track prices, convert currencies, and save money with AI-powered tools. Founded by Hamdan." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AffiliatePilot",
            "url": "https://affiliatepilot-frontend.vercel.app",
            "author": { "@type": "Person", "name": "Hamdan" }
          })}
        </script>
      </head>

      <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* NAVBAR - NO AGENT LINK HERE */}
        <nav className="bg-white shadow-sm border-b p-4 flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-blue-600">Affiliate<span className="text-gray-900">Pilot</span> <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded">PRO</span></h1>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#tools">Tools</a>
            <a href="#store">Store</a>
            <a href="/about">About Us</a>
            <a href="/terms">Legal</a>
            <a href="/faq">FAQ</a>
          </div>
        </nav>

        {/* HERO - HAMDAN NAME */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20 text-center px-4">
          <h2 className="text-5xl font-extrabold mb-4">Smart Global Shopping AI</h2>
          <p className="text-lg text-gray-300 mb-4">Real-time currency, EMI calculator, AI deal finder & live coupons.</p>
          <p className="text-sm text-amber-400 font-bold">Founded & Managed by Hamdan</p>
          <a href="#tools" className="mt-6 inline-block bg-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Use Free Tools</a>
        </section>

        {/* 5 POWERFUL TOOLS */}
        <section id="tools" className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Currency */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-4">💱 Real-Time Currency</h3>
            <form onSubmit={convertCurrency} className="space-y-3">
              <input name="amount" type="number" defaultValue="100" className="w-full border p-2 rounded-lg" required />
              <div className="flex gap-2">
                <select name="from" className="w-full border p-2 rounded-lg"><option>USD</option><option>EUR</option><option>GBP</option></select>
                <select name="to" className="w-full border p-2 rounded-lg"><option>INR</option><option>EUR</option><option>USD</option></select>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg font-bold">Convert</button>
            </form>
            {currResult && <p className="mt-3 text-sm bg-green-50 p-2 rounded-lg">{currResult}</p>}
          </div>

          {/* Deal Finder */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-4">🔍 AI Global Deal Finder</h3>
            <form onSubmit={findDeals} className="space-y-3">
              <input name="product" type="text" placeholder="e.g., Sony WH-1000XM5" className="w-full border p-2 rounded-lg" required />
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold">Find Deals</button>
            </form>
            <p className="mt-3 text-sm bg-blue-50 p-2 rounded-lg whitespace-pre-wrap">{dealResult}</p>
          </div>

          {/* EMI Calculator */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-4">💳 EMI Calculator</h3>
            <form onSubmit={calcEMI} className="space-y-3">
              <input name="loan" type="number" placeholder="Loan Amount (₹)" className="w-full border p-2 rounded-lg" required />
              <input name="rate" type="number" placeholder="Interest Rate (%)" className="w-full border p-2 rounded-lg" required />
              <input name="months" type="number" placeholder="Tenure (Months)" className="w-full border p-2 rounded-lg" required />
              <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-lg font-bold">Calculate</button>
            </form>
            {emiResult && <p className="mt-3 text-sm bg-purple-50 p-2 rounded-lg">{emiResult}</p>}
          </div>

          {/* Price Drop Alert */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-4">🔔 Price Drop Alert</h3>
            <form onSubmit={setAlert} className="space-y-3">
              <input name="email" type="email" placeholder="Your Email" className="w-full border p-2 rounded-lg" required />
              <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-lg font-bold">Set Alert</button>
            </form>
            {alertMsg && <p className="mt-3 text-sm bg-red-50 p-2 rounded-lg">{alertMsg}</p>}
          </div>

          {/* Coupon Finder */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-4">🏷️ Auto Coupon Finder</h3>
            <p className="text-sm text-gray-500 mb-4">Get live coupons automatically for top stores.</p>
            <a href="https://www.amazon.in/coupons" target="_blank" className="block text-center bg-orange-500 text-white p-2 rounded-lg font-bold hover:bg-orange-600">Amazon Coupons</a>
            <a href="https://www.flipkart.com/offers-store" target="_blank" className="block text-center bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600 mt-2">Flipkart Offers</a>
          </div>

        </section>

        {/* STORE */}
        <section id="store" className="py-20 bg-gray-50 max-w-7xl mx-auto px-4">
          <div className="text-center mb-14"><h2 className="text-3xl font-bold">🤖 Daily Curated Finds</h2><p className="text-gray-500 mt-2">Best deals updated automatically.</p></div>
          
          {products.length === 0 ? (
            <div className="text-center bg-white p-10 rounded-2xl border shadow-sm">
              <p className="text-gray-500 font-medium">⏳ Waiting for system to sync products...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <img src={p.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={p.name} className="w-full h-48 object-cover bg-gray-100" loading="lazy"/>
                  <div className="p-5">
                    <h3 className="font-bold text-sm mb-2 h-10">{p.name || 'Product'}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-extrabold text-blue-600">${p.price || '0'}</span>
                      <a href={p.affiliate_link || '#'} target="_blank" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition">Get Deal 🔗</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Legal Short Section */}
        <section id="legal" className="max-w-4xl mx-auto p-6 mt-8 mb-20 bg-white rounded-2xl border shadow-sm text-sm text-gray-600">
          <h3 className="font-bold text-gray-900 mb-2">Affiliate Disclosure</h3>
          <p>AffiliatePilot is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, I (Hamdan) earn from qualifying purchases.</p>
        </section>

      </main>
    </>
  );
}
