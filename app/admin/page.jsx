"use client"

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [settings, setSettings] = useState({});
  const [msg, setMsg] = useState('');

  const BACKEND_URL = 'https://pilotbot-engine.onrender.com'; 

  useEffect(() => {
    const pass = prompt("Enter Admin Password:");
    if (pass === "Mrhamdu123@") {
      setAuth(true);
      fetch(`${BACKEND_URL}/api/settings`)
        .then(res => res.json())
        .then(data => setSettings(data));
    } else {
      alert("Access Denied!");
      window.location.href = "/";
    }
  }, []);

  const saveSettings = async (e) => {
    e.preventDefault();
    setMsg('Saving settings...');
    try {
      const res = await fetch(`${BACKEND_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      setMsg(data.success ? '✅ Settings Saved! Agent updated.' : '❌ Error saving.');
    } catch(e) {
      setMsg('❌ Backend connection failed.');
    }
  };

  if(!auth) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3">
          🤖 PilotBot Command Center
          <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">LIVE</span>
        </h1>

        {/* METRICS DASHBOARD */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400">Total Products</p>
            <h2 className="text-3xl font-bold mt-1">24</h2>
            <p className="text-xs text-green-400 mt-2">↑ Synced today</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400">Revenue (Month)</p>
            <h2 className="text-3xl font-bold mt-1">$0</h2>
            <p className="text-xs text-yellow-400 mt-2">* Awaiting Affiliate</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400">Website Traffic</p>
            <h2 className="text-3xl font-bold mt-1">0</h2>
            <p className="text-xs text-blue-400 mt-2">* Connect G Analytics</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400">Agent Status</p>
            <h2 className="text-3xl font-bold mt-1 text-green-400">ON</h2>
            <p className="text-xs text-gray-400 mt-2">Cron Jobs Active</p>
          </div>
        </div>

        {/* API SETTINGS FORM */}
        <form onSubmit={saveSettings} className="max-w-2xl space-y-6 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-amber-400 border-b border-gray-700 pb-2">🔑 API Keys & Controls</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Gemini AI Key</label>
            <input type="text" value={settings.gemini_key || ''} onChange={e => setSettings({...settings, gemini_key: e.target.value})} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Blogger API Refresh Token</label>
            <input type="text" value={settings.blogger_token || ''} onChange={e => setSettings({...settings, blogger_token: e.target.value})} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">CJ Dropshipping API Key</label>
            <input type="text" value={settings.cj_api_key || ''} onChange={e => setSettings({...settings, cj_api_key: e.target.value})} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Pinterest Developer Token</label>
            <input type="text" value={settings.pinterest_token || ''} onChange={e => setSettings({...settings, pinterest_token: e.target.value})} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Amazon Affiliate Tag</label>
            <input type="text" value={settings.amazon_tag || ''} onChange={e => setSettings({...settings, amazon_tag: e.target.value})} className="w-full bg-gray-700 border border-gray-600 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>

          <button type="submit" className="w-full bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">Save & Restart Agent</button>
          <p className="text-center text-sm">{msg}</p>
        </form>
      </div>
    </div>
  );
}
