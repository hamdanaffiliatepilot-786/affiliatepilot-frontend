"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email);
    setLoggedIn(true);
    fetchOrders(email);
    fetchWishlist(email);
  };

  const fetchOrders = async (userEmail) => {
    try {
      const res = await fetch(`https://pilotbot-engine.onrender.com/api/orders?email=${userEmail}`);
      const data = await res.json();
      if(data.success) setOrders(data.orders);
    } catch(e) {}
  };

  const fetchWishlist = async (userEmail) => {
    try {
      const res = await fetch(`https://pilotbot-engine.onrender.com/api/wishlist?email=${userEmail}`);
      const data = await res.json();
      if(data.success) setWishlist(data.items || []);
    } catch(e) {}
  };

  const addToWishlist = async (productId) => {
    const email = localStorage.getItem('userEmail');
    if(!email) return alert("Please login first");
    await fetch('https://pilotbot-engine.onrender.com/api/add-wishlist', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, product_id: productId })
    });
    fetchWishlist(email);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border max-w-md w-full text-center">
          <h1 className="text-2xl font-extrabold mb-2">Welcome to AffiliatePilot</h1>
          <p className="text-gray-500 text-sm mb-6">Login with your email to track orders and manage your wishlist.</p>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500" required />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Login / Track Orders</button>
          </form>
          <p className="text-xs text-gray-400 mt-4">*No password required. We use email for order tracking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">My Dashboard</h1>
            <p className="text-gray-500">Welcome, {email}</p>
          </div>
          <button onClick={() => { setLoggedIn(false); localStorage.removeItem('userEmail'); }} className="text-red-500 font-bold text-sm">Logout</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Orders Section */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-extrabold mb-4">📦 My Orders</h2>
            {orders.length === 0 ? <p className="text-gray-400 text-sm">No orders yet.</p> : (
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="border p-3 rounded-lg flex gap-3">
                    <img src={o.product_image} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <h3 className="font-bold text-sm">{o.product_name}</h3>
                      <p className="text-blue-600 font-bold">${o.price_usd}</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{o.status}</span>
                      <p className="text-xs text-gray-400 mt-1">Delivery by: {new Date(o.expected_delivery).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Section */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-extrabold mb-4">❤️ Wishlist & Alerts</h2>
            {wishlist.length === 0 ? <p className="text-gray-400 text-sm">No items in wishlist.</p> : (
              <div className="space-y-3">
                {wishlist.map(w => (
                  <div key={w.id} className="border p-3 rounded-lg">
                    <p className="font-bold text-sm">Product ID: {w.product_id}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Tracking for price drop</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
