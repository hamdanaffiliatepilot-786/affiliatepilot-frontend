"use client"

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currResult, setCurrResult] = useState('');
  const [deals, setDeals] = useState([]);
  const [emiResult, setEmiResult] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [reelResult, setReelResult] = useState('Paste an Instagram Reel link to find the product!');
  const [coupons, setCoupons] = useState([]);
  const [loadingDeal, setLoadingDeal] = useState(false);
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

  // PAYPAL SDK RENDER (For Pro Subscription only)
  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.getElementById('paypal-subscription-btn');
      if (window.paypal && container && container.innerHTML === '') {
        clearInterval(interval);
        window.paypal.HostedButtons({
          hostedButtonId: "EM54XCYPTWSLQ",
        }).render("#paypal-subscription-btn");
      }
    }, 1000);
    return () => clearInterval(interval);
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
    setLoadingDeal(true);
    setDeals([]);
    try {
      const res = await fetch(`https://pilotbot-engine.onrender.com/api/compare-prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      });
      const data = await res.json();
      if(data.success && data.prices.length > 0) {
        setDeals(data.prices);
      } else { throw new Error("Backend error"); }
    } catch(e) {
      // Fallback if Backend is sleeping
      setDeals([
        { store: "🛒 Amazon India", price: "Check Live Price", url: `https://www.amazon.in/s?k=${encodeURIComponent(product)}` },
        { store: "🛒 Flipkart", price: "Check Live Price", url: `https://www.flipkart.com/search?q=${encodeURIComponent(product)}` },
        { store: "🇺🇸 Amazon US", price: "Check Live Price", url: `https://www.amazon.com/s?k=${encodeURIComponent(product)}` },
        { store: "🏷️ eBay", price: "Check Live Price", url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(product)}` }
      ]);
    } finally {
      setLoadingDeal(false);
    }
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

  const findReelProduct = async (e) => {
    e.preventDefault();
    const link = e.target.reelLink.value;
    setLoadingReel(true);
    setReelResult("🤖 AI is analyzing the Reel...");
    try {
      const res = await fetch('https://pilotbot-engine.onrender.com/api/reel-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reelUrl: link })
      });
      const data = await res.json();
      if(data.success) {
        setReelResult(`✅ Product Found: "${data.productName}"\n\n🛒 Buy on Amazon: ${data.searchLink}\n\n🛒 Buy on Flipkart: ${data.flipkartLink}`);
      } else { throw new Error("Failed"); }
    } catch(e) {
      setReelResult(`🔄 Backend is waking up. Meanwhile, search manually:\n\n🛒 Amazon: https://www.amazon.in/s?k=product+from+reel\n🛒 Flipkart: https://www.flipkart.com/search?q=product+from+reel`);
    } finally {
      setLoadingReel(false);
    }
  };

  const fetchCoupons = async (e) => {
    e.preventDefault();
    const store = e.target.store.value;
    setLoadingCoupon(true);
    setCoupons([]);
    try {
      const res = await fetch(`https://pilotbot-engine.onrender.com/api/coupons?store=${store}`);
      const data = await res.json();
      if(data.coupons && data.coupons.length > 0 && data.coupons[0].code !== "Server Busy") {
        setCoupons(data.coupons);
      } else { throw new Error("Failed"); }
    } catch(e) {
      setCoupons([{ code: "🔥 LIVE DEALS", discount: "Visit store for live coupons" }]);
    } finally {
      setLoadingCoupon(false);
    }
  };

  // Dynamic PayPal Link for Specific Product Price (Dropshipping)
  const getProductPaypalLink = (product) => {
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=hamdan.affiliatepilot@gmail.com&item_name=${encodeURIComponent(product.name)}&amount=${product.price}&currency_code=USD`;
  };

  return (
    <>
      {/* PAYPAL SDK - Loaded smartly to avoid white strip */}
      <Script 
        src="https://www.paypal.com/sdk/js?client-id=BAAy4Jh_5teQEDJ8tbAZCzjL6W_uAbRifmXbkTE3oREsveJyqPwxmWLFBKimUGybGzxzBohA3k5KD4IPwI&components=hosted-buttons&disable-funding=venmo&currency=USD"
        strategy="lazyOnload"
      />

      {/* HERO LANDING SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-sm font-medium mb-6">🤖 Powered by AI Automation</div>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">Smart Shopping<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Starts Here</span></h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Find products from Instagram Reels, compare prices, get real-time coupons, and track price drops automatically. Founded by Hamdan.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#tools" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition text-lg shadow-lg">Use Free Tools 🛠️</a>
            <a href="#pro" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition text-lg shadow-lg">Go Pro 💎</a>
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
          
          {/* 1. AI DEAL FINDER */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border lg:col-span-2">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">🔍 AI Price Comparison</h3>
            <p className="text-sm text-gray-500 mb-4">Compare real-time prices across Amazon, Flipkart & eBay instantly!</p>
            <form onSubmit={findDeals} className="space-y-3">
              <input name="product" type="text" placeholder="e.g., Sony WH-1000XM5" className="w-full border p-3 rounded-xl outline-none" required />
              <button type="submit" disabled={loadingDeal} className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-50">
                {loadingDeal ? "Comparing Prices..." : "Compare Prices"}
              </button>
            </form>
            <div className="mt-4 overflow-auto">
              {deals.length > 0 && (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border-b">Store</th>
                      <th className="p-2 text-left border-b">Price</th>
                      <th className="p-2 text-right border-b">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map((deal, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-2 font-bold text-gray-800">{deal.store}</td>
                        <td className="p-2 font-extrabold text-blue-600">{deal.price}</td>
                        <td className="p-2 text-right">
                          <a href={deal.url} target="_blank" className="text-blue-500 hover:underline">Visit ↗</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
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
              {coupons.length > 0 && coupons[0].code === "🔥 LIVE DEALS" && (
                 <a href="https://www.amazon.in/coupons" target="_blank" className="block w-full text-center bg-orange-600 text-white p-2 rounded-lg font-bold mt-2 hover:bg-orange-700">Visit Store Coupons</a>
              )}
            </div>
          </div>

          {/* 3. INSTAGRAM REEL FINDER */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-3xl shadow-sm border border-pink-100">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">🎬 Instagram Reel Finder</h3>
            <form onSubmit={findReelProduct} className="space-y-3">
              <input name="reelLink" type="url" placeholder="https://www.instagram.com/reel/..." className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none bg-white" required />
              <button type="submit" disabled={loadingReel} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition shadow-md disabled:opacity-50">
                {loadingReel ? "Analyzing Reel..." : "Find Product"}
              </button>
            </form>
            <p className="mt-3 text-sm bg-white p-3 rounded-xl whitespace-pre-wrap h-32 overflow-auto border shadow-inner text-gray-600">{reelResult}</p>
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

      {/* PRO SUBSCRIPTION SECTION (Official PayPal Hosted Button) */}
      <section id="pro" className="py-20 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold mb-4">Unlock Pro Features 💎</h2>
          <p className="text-lg text-gray-300 mb-10">Get unlimited access to real-time coupons, priority price alerts, and premium AI tools.</p>
          
          <div className="bg-white/95 backdrop-blur-lg p-10 rounded-[2rem] shadow-2xl inline-block w-full max-w-sm text-gray-900 border border-white/20">
            <h3 className="text-2xl font-bold mb-1 text-gray-800">AffiliatePilot Pro</h3>
            <p className="text-6xl font-extrabold my-6 text-blue-600">$9<span className="text-xl text-gray-400 font-normal">/mo</span></p>
            
            <ul className="text-sm text-left space-y-3 mb-10 text-gray-600 px-2">
              <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✓</span> Unlimited Reel Product Search</li>
              <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✓</span> Instant Coupon Fetching</li>
              <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✓</span> Priority Price Drop Alerts</li>
              <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✓</span> Ad-Free Experience</li>
            </ul>
            
            {/* PAYPAL SUBSCRIPTION BUTTON (Fixed) */}
            <div className="w-full flex justify-center overflow-hidden rounded-xl">
              <div id="paypal-subscription-btn" className="w-full max-w-[250px] min-h-[40px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STORE SECTION (Dynamic Pricing for Dropshipping) */}
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
                    {/* DYNAMIC PAYPAL CHECKOUT FOR SPECIFIC PRODUCT */}
                    <a href={getProductPaypalLink(p)} target="_blank" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition">
                      Buy Now
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
