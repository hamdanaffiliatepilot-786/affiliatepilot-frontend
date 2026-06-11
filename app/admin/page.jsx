"use client";
import { useState } from 'react';

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  
  const ADMIN_PASS = "Mrhamdu123@"; 

  const login = (e) => {
    e.preventDefault();
    if(pass === ADMIN_PASS) setAuth(true); 
    else alert("Wrong Password!");
  };

  const fetchStats = async () => {
    setError("Fetching data... Backend might take 10 seconds to wake up.");
    try {
      // HARDCODED URL AND TOKEN FOR 100% GUARANTEE
      const res = await fetch('https://pilotbot-engine.onrender.com/api/admin/stats', { 
        headers: { 'Authorization': 'Bearer super_secret_admin_token_Mrhamdu123@' } 
      }); 
      const d = await res.json(); 
      
      if(d.success) {
        setStats(d);
        setError('');
      } else {
        setError("Backend Error: " + (d.error || "Unknown error"));
      }
    } catch(e) { 
      setError("Network Error: Backend is sleeping or wrong URL. Wait 10 secs and try again."); 
    }
  };

  if (!auth) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form onSubmit={login} className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 max-w-sm w-full text-center">
        <h1 className="text-2xl font-extrabold text-white mb-4">👑 Admin Login</h1>
        <input type="password" placeholder="Enter Password" value={pass} onChange={(e)=>setPass(e.target.value)} className="w-full border p-3 rounded-xl mb-4 text-black" required />
        <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold text-white">Unlock</button>
      </form>
    </div>
  );

  if (!stats) return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 gap-4">
      <button onClick={fetchStats} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-extrabold text-xl shadow-lg">Load Analytics</button>
      {error && <p className="text-sm text-red-600 font-bold text-center max-w-md">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold">👑 AffiliatePilot HQ</h1>
          <button onClick={fetchStats} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Refresh</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-500 rounded-2xl p-5 text-white shadow-md"><p className="text-sm opacity-80">Revenue</p><p className="text-3xl font-extrabold">${stats.totalRevenue}</p></div>
          <div className="bg-blue-500 rounded-2xl p-5 text-white shadow-md"><p className="text-sm opacity-80">Profit</p><p className="text-3xl font-extrabold">${stats.totalProfit}</p></div>
          <div className="bg-red-500 rounded-2xl p-5 text-white shadow-md"><p className="text-sm opacity-80">CJ Cost</p><p className="text-3xl font-extrabold">${stats.totalCJCost}</p></div>
          <div className="bg-purple-500 rounded-2xl p-5 text-white shadow-md"><p className="text-sm opacity-80">Orders</p><p className="text-3xl font-extrabold">{stats.totalOrders}</p></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border"><h2 className="font-extrabold text-lg mb-4">📈 Traffic</h2>{Object.entries(stats.trafficSources || {}).map(([k,v])=><div key={k} className="flex justify-between border-b py-2"><span className="font-bold">{k}</span><span>{v}</span></div>)}</div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border"><h2 className="font-extrabold text-lg mb-4">📦 Status</h2>{Object.entries(stats.statusCounts || {}).map(([k,v])=><div key={k} className="flex justify-between border-b py-2"><span className="font-bold">{k}</span><span>{v}</span></div>)}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-extrabold text-lg mb-4">📋 Recent Orders</h2>
          {stats.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left">Order</th><th className="p-3 text-left">Product</th><th className="p-3 text-left">Sale</th><th className="p-3 text-left font-extrabold text-green-600">Profit</th><th className="p-3 text-left">Source</th></tr></thead>
                <tbody>{stats.recentOrders.map((o,i)=><tr key={i} className="border-b"><td className="p-3 text-xs text-gray-400">{o.paypal_order_id?.substring(0,10)}</td><td className="p-3 font-bold">{o.product_name?.substring(0,25)}</td><td className="p-3">${o.price_usd}</td><td className="p-3 font-extrabold text-green-600">${o.profit_margin}</td><td className="p-3"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{o.traffic_source}</span></td></tr>)}</tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">No orders yet. They will appear here automatically.</p>
          )}
        </div>
      </div>
    </div>
  );
}
