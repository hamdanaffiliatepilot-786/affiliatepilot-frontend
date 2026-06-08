"use client"

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [settings, setSettings] = useState({});
  const [msg, setMsg] = useState('');

  const BACKEND_URL = 'https://pilotbot-engine.onrender.com'; 

  useEffect(() => {
    // Password Check
    const pass = prompt("Enter Admin Password:");
    if (pass === "Mrhamdu123@") {
      setAuth(true);
      fetch(`${BACKEND_URL}/api/settings`)
        .then(res => res.json())
        .then(data => setSettings(data));
    } else {
      alert("Access Denied!");
      window.location.href = "/"; // Redirect to home if wrong password
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
      setMsg(data.success ? '✅ Settings Saved! Agent will use them.' : '❌ Error saving.');
    } catch(e) {
      setMsg('❌ Backend connection failed.');
    }
  };

  if(!auth) return null; // Don't show dashboard until authenticated

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🤖 PilotBot Controller (Admin)</h1>
      
      <form onSubmit={saveSettings} className="max-w-2xl mx-auto space-y-6 bg-gray-800 p-6 rounded-xl">
        
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-xl font-bold text-amber-400">🔑 API Keys & Links</h2>
          <p className="text-xs text-gray-400 mt-1">Agent will automatically use these keys for Auto-Blogging, Pinterest, and CJ.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gemini AI Key</label>
          <input type="text" value={settings.gemini_key || ''} onChange={e => setSettings({...settings, gemini_key: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Blogger API Refresh Token (Read instructions below)</label>
          <input type="text" value={settings.blogger_token || ''} onChange={e => setSettings({...settings, blogger_token: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-sm" placeholder="ya29.a0AfH6..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">CJ Dropshipping API Key</label>
          <input type="text" value={settings.cj_api_key || ''} onChange={e => setSettings({...settings, cj_api_key: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-sm" placeholder="Enter CJ Key..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pinterest Developer Token</label>
          <input type="text" value={settings.pinterest_token || ''} onChange={e => setSettings({...settings, pinterest_token: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-sm" placeholder="Enter Pinterest Token..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amazon Affiliate Tag</label>
          <input type="text" value={settings.amazon_tag || ''} onChange={e => setSettings({...settings, amazon_tag: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-sm" placeholder="yourid-21" />
        </div>

        <button type="submit" className="bg-blue-600 px-6 py-2 rounded font-bold hover:bg-blue-700 w-full">Save & Restart Agent</button>
        <p className="text-center text-sm">{msg}</p>

      </form>
    </div>
  );
}
