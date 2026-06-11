"use client";
import { useState, useEffect } from 'react';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', email: '', phone: '', country: '', state: '', city: '', zip: '', address: '' });

  useEffect(() => {
    // Safe localStorage access
    const savedCart = localStorage.getItem('pilotCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      
      // PayPal Script Load
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
      script.onload = () => {
        if (window.paypal) {
          const total = parsedCart.reduce((sum, item) => sum + parseFloat(String(item.price_usd).replace(/[^0-9.]/g, '')), 0);
          
          window.paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toFixed(2) } }] }),
            onApprove: async (data, actions) => {
              await actions.order.capture();
              await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  paypal_order_id: data.orderID, total_price: total.toFixed(2), 
                  total_profit: parsedCart.reduce((s,p)=>s+parseFloat(p.profit_margin||0),0),
                  products: parsedCart, buyer_email: shippingInfo.email, buyer_address: shippingInfo
                })
              });
              localStorage.removeItem('pilotCart');
              window.location.href = `/thank-you?orderId=${data.orderID}`;
            }
          }).render('#paypal-cart-button');
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleInput = (e) => setShippingInfo({...shippingInfo, [e.target.name]: e.target.value});

  const total = cart.reduce((sum, item) => sum + parseFloat(String(item.price_usd).replace(/[^0-9.]/g, '')), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Checkout</h1>
        <div className="bg-white p-6 rounded-2xl border mb-6">
          <h2 className="font-bold mb-4">Order Summary ({cart.length} items)</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No items in cart.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span className="text-sm">{item.name}</span>
                <span className="font-bold">${item.price_usd}</span>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div className="flex justify-between mt-4 text-xl font-extrabold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-2xl border mb-6">
          <h2 className="font-bold mb-4">Shipping Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="fullName" placeholder="Full Name" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="email" type="email" placeholder="Email" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="phone" placeholder="Phone" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="country" placeholder="Country" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="state" placeholder="State" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="city" placeholder="City" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="zip" placeholder="Zip" onChange={handleInput} className="border p-3 rounded-xl" />
            <input name="address" placeholder="Address" onChange={handleInput} className="border p-3 rounded-xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border text-center" id="paypal-cart-button"></div>
      </div>
    </div>
  );
}
