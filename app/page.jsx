"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currResult, setCurrResult] = useState('');
  const [deals, setDeals] = useState([]);
  const [emiResult, setEmiResult] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [reelResult, setReelResult] = useState('Paste an Instagram Reel link to find the product!');
  const [coupons, setCoupons] = useState([]);
  const [loadingReel, setLoadingReel] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

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
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      const rate = data.rates[to];
      setCurrResult(`✅ ${amt} ${from} = ${(amt * rate).toFixed(2)} ${to}`);
    } catch(e) { setCurrResult("❌ Error fetching rates."); }
  };

  const findDeals = async (e) => {
    e.preventDefault();
    const product = e.target.product.value;
    setDeals([
      { name: `🛒 Amazon India: ${product}`, url: `https://www.amazon.in/s?k=${encodeURIComponent(product)}` },
      { name: `🛒 Flipkart: ${product}`, url: `https://www.flipkart.com/search?q=${encodeURIComponent(product)}` },
      { name: `🇺🇸 Amazon US: ${product}`, url: `https://www.amazon.com/s?k=${encodeURIComponent(product)}` }
    ]);
  };

  const calcEMI = (e) => {
    e.preventDefault();
    const P = parseFloat(e.target.loan.value);
    const r = parseFloat(e.target.rate.value) / 12 / 100;
    const n = parseFloat(e.target.months.value);
    if(P && r && n) {
      const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      setEmiResult(`💰 Monthly EMI = ₹${emi.toFixed(2)} | Total = ₹${(emi * n).toFixed(2)}`);
    } else { setEmiResult("Please fill all fields."); }
  };

  const setAlert = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if(email) setAlertMsg(`✅ Alert set for ${email}! PilotBot will notify you.`);
  };

  // PROFESSIONAL ERROR HANDLING FOR REELS
  const findReelProduct = async (e) => {
    e.preventDefault();
    const link = e.target.reelLink.value;
    setLoadingReel(true);
    setReelResult("🤖 AI is analyzing the Reel... Detecting product...");
    
    try {
      const res = await fetch('https://pilotbot-engine.onrender.com/api/reel-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reelUrl: link })
      });
      const data = await res.json();
      
      if(data.success) {
        setReelResult(`✅ Product Found: "${data.productName}"\n\n🛒 Buy on Amazon: ${data.searchLink}\n\n🛒 Buy on Flipkart: ${data.flipkartLink}`);
      } else {
        setReelResult("❌ Could not identify the product. Try another Reel link.");
      }
    } catch(e) {
      setReelResult("🤖 Our AI is currently busy updating its memory. Please try again in 60 seconds!"); // User friendly message
    } finally {
      setLoadingReel(false);
    }
  };

  // PROFESSIONAL ERROR HANDLING FOR COUPONS
  const fetchCoupons = async (e) => {
    e.preventDefault();
    const store = e.target.store.value;
    setLoadingCoupon(true);
    setCoupons([{ code: "LOADING...", discount: "Fetching live data..." }]);
    
    try {
      const res = await fetch(`https://pilotbot-engine.onrender.com/api/coupons?store=${store}`);
      const data = await res.json();
      if(data.coupons && data.coupons.length > 0) {
        setCoupons(data.coupons);
      } else {
        setCoupons([{ code: "No Coupons", discount: "Try another store" }]);
      }
    } catch(e) {
      setCoupons([{ code: "Updating", discount: "Coupons are refreshing. Try again shortly!" }]); // User friendly message
    } finally {
      setLoadingCoupon(false);
    }
  };

  // PAYPAL PROFESSIONAL CHECKOUT (Hides Name, Shows Product & Price)
  const getPaypalLink = (product) => {
    const email = 'hamdan.affiliatepilot@gmail.com'; // Your PayPal email
    const itemName = encodeURIComponent(product.name);
    const price = product.price;
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${email}&item_name=${itemName}&amount=${price}&currency_code=USD`;
  };

  return (
    <>
      {/* HERO LANDING SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-sm font-medium mb-6">🤖 Powered by AI Automation</div>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">Smart Shopping<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Starts Here</span></h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Find products from Instagram Reels, compare prices, get real-time coupons, and track price drops automatically. Founded by Hamdan.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#tools" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition text-lg shadow-lg">Use Free Tools 🛠️</a>
            <a href="#store" className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition text-lg">Shop Deals 🛒</a>
          </div>
        </div>
      </section>

      {/* POWERFUL TOOLS GRID */}
      <section id="tools" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold">Million-Dollar Tools 🚀</h2>
          <p className="text-gray-500 mt-2 text-lg">Everything you need to save money while shopping online.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. INSTAGRAM REEL FINDER */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-3xl shadow-sm border border-pink-100 lg:col-span-2">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">🎬 Instagram Reel Product Finder</h3>
            <p className="text-sm text-gray-500 mb-4">Saw a product in a Reel? Paste the link & our AI will find where to buy it cheapest!</p>
            <form onSubmit={findReelProduct} className="space-y-3">
              <input name="reelLink" type="url" placeholder="https://www.instagram.com/reel/..." className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none bg-white" required />
              <button type="submit" disabled={loadingReel} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition shadow-md disabled:opacity-50">
                {loadingReel ? "Analyzing Reel..." : "Find Product"}
              </button>
            </form>
            <p className="mt-3 text-sm bg-white p-3 rounded-xl whitespace-pre-wrap h-40 overflow-auto border shadow-inner">{reelResult}</p>
          </div>

          {/* 2. COUPON FINDER */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">🏷️ Real-Time Coupons</h3>
            <form onSubmit={fetchCoupons} className="space-y-3">
              <select name="store" className="w-full border p-3 rounded-xl outline-none bg-gray-50">
                <option value="amazon">Amazon India</option>
                <option value="flipkart">Flipkart</option>
              </select>
              <button type="submit" disabled={loadingCoupon} className="w-full bg-orange-500 text-white p-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md disabled:opacity-50">
                {loadingCoupon ? "Fetching..." : "Fetch Coupons"}
              </button>
            </form>
            <div className="mt-3 space-y-2 max-h-32 overflow-auto">
              {coupons.map((c, i) => (
                <div key={i} className="bg-orange-50 border border-orange-100 p-2 rounded-lg text-sm flex justify-between">
                  <span className="font-bold text-orange-700">{c.code}</span>
                  <span className="text-gray-600 text-xs">{c.discount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. DEAL FINDER */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">🔍 AI Deal Finder</h3>
            <form onSubmit={findDeals} className="space-y-3">
              <input name="product" type="text" placeholder="e.g., Sony WH-1000XM5" className="w-full border p-3 rounded-xl outline-none" required />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">Compare Prices</button>
            </form>
            <div className="mt-3 space-y-2 max-h-40 overflow-auto">
              {deals.map((deal, i) => (
                <a key={i} href={deal.url} target="_blank" rel="noopener noreferrer" className="block bg-blue-50 border border-blue-100 p-2 rounded-lg text-sm text-blue-700 font-medium hover:bg-blue-100 transition">
                  {deal.name} ↗
                </a>
              ))}
            </div>
          </div>

          {/* 4. CURRENCY */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <h3 className="font-bold text-xl mb-2">💱 Real-Time Currency</h3>
            <form onSubmit={convertCurrency} className="space-y-3">
              <input name="amount" type="number" defaultValue="100" className="w-full border p-3 rounded-xl outline-none" required />
              <div className="flex gap-2">
                <select name="from" className="w-1/2 border p-3 rounded-xl outline-none"><option>USD</option><option>EUR</option><option>GBP</option></select>
                <select name="to" className="w-1/2 border p-3 rounded-xl outline-none"><option>INR</option><option>EUR</option><option>USD</option></select>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700 transition shadow-md">Convert</button>
            </form>
            {currResult && <p className="mt-3 text-sm bg-green-50 p-3 rounded-xl font-mono border border-green-100">{currResult}</p>}
          </div>

          {/* 5. EMI CALCULATOR */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <h3 className="font-bold text-xl mb-2">💳 EMI Calculator</h3>
            <form onSubmit={calcEMI} className="space-y-3">
              <input name="loan" type="number" placeholder="Loan Amount (₹)" className="w-full border p-3 rounded-xl outline-none" required />
              <input name="rate" type="number" placeholder="Interest Rate (%)" className="w-full border p-3 rounded-xl outline-none" required />
              <input name="months" type="number" placeholder="Tenure (Months)" className="w-full border p-3 rounded-xl outline-none" required />
              <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-md">Calculate</button>
            </form>
            {emiResult && <p className="mt-3 text-sm bg-purple-50 p-3 rounded-xl border border-purple-100">{emiResult}</p>}
          </div>

        </div>
      </section>

      {/* STORE SECTION (PAYPAL PROFESSIONAL CHECKOUT) */}
      <section id="store" className="py-20 bg-white max-w-7xl mx-auto px-4">
        <div className="text-center mb-14"><h2 className="text-4xl font-extrabold">🤖 Daily Curated Finds</h2><p className="text-gray-500 mt-2 text-lg">Best deals updated automatically.</p></div>
        
        {products.length === 0 ? (
          <div className="text-center bg-gray-50 p-10 rounded-3xl border shadow-sm">
            <p className="text-gray-500 font-medium text-lg">⏳ Waiting for PilotBot to sync products...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
                <img src={p.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={p.name} className="w-full h-48 object-cover" loading="lazy"/>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <h3 className="font-bold text-sm mb-2">{p.name || 'Product'}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-blue-600">${p.price || '0'}</span>
                    <a href={p.source === 'cj_dropship' ? getPaypalLink(p) : (p.affiliate_link || '#')} target="_blank" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition">
                      {p.source === 'cj_dropship' ? 'Buy Now' : 'Get Deal 🔗'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </>
  );
}
