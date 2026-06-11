"use client";
import { useState } from 'react';

export default function Orders() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://pilotbot-engine.onrender.com/api/orders?email=${email}`);
      const data = await res.json();
      if(data.success) setOrders(data.orders);
      else alert("No orders found for this email.");
    } catch(e) { alert("Error fetching orders"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10">📦 Track Your Orders</h1>
        
        <form onSubmit={fetchOrders} className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
          <p className="text-gray-500 mb-3 text-sm">Enter the email address you used during PayPal checkout.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-grow border p-3 rounded-xl outline-none" required />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 rounded-xl font-bold disabled:opacity-50">{loading ? "..." : "Find"}</button>
          </div>
        </form>

        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-5 rounded-2xl border shadow-sm flex gap-4">
                <img src={order.product_image} alt={order.product_name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold">{order.product_name}</h3>
                  <p className="text-blue-600 font-extrabold">${order.price_usd}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">{order.status}</span>
                    <span className="text-gray-500">Delivery by: {new Date(order.expected_delivery).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Order: {order.paypal_order_id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
