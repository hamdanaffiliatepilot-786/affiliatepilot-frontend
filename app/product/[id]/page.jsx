"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', email: '', phone: '', country: '', state: '', city: '', zip: '', address: '' });
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => { if(id) { fetchProduct(); fetchReviews(); } }, [id]);

  const fetchProduct = async () => { const { data } = await supabase.from('store_products').select('*').eq('id', id).single(); setProduct(data); };
  const fetchReviews = async () => { const { data } = await supabase.from('reviews').select('*').eq('product_id', id).order('created_at', { ascending: false }); if(data) setReviews(data); };

  const addToCart = () => {
    if(!product) return;
    const c = JSON.parse(localStorage.getItem('pilotCart')||'[]');
    if(c.find(x=>x.id===product.id)) return alert("In cart!");
    c.push(product);
    localStorage.setItem('pilotCart', JSON.stringify(c));
    alert("Added to Cart!");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    await supabase.from('reviews').insert({ product_id: id, user_name: reviewForm.name, rating: reviewForm.rating, comment: reviewForm.comment });
    setReviewForm({ name: '', rating: 5, comment: '' });
    fetchReviews();
  };

  const handleInput = (e) => setShippingInfo({...shippingInfo, [e.target.name]: e.target.value});

  const initPayPal = () => {
    if(!window.paypal || !product) return;
    const cleanPrice = String(product.price_usd).replace(/[^0-9.]/g, '');
    window.paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { value: cleanPrice } }] }),
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paypal_order_id: data.orderID, total_price: product.price_usd, total_profit: product.profit_margin, products: [product], buyer_email: shippingInfo.email, buyer_address: shippingInfo, traffic_source: localStorage.getItem('ts') || 'Direct' })
        });
        window.location.href = `/thank-you?orderId=${data.orderID}`;
      }
    }).render('#paypal-button-container');
  };

  useEffect(() => {
    if(showCheckout && product) {
      if(window.paypal) { initPayPal(); } else {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
        script.onload = initPayPal;
        document.body.appendChild(script);
      }
    }
  }, [showCheckout, product]);

  if(!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  const displayPrice = String(product.price_usd).replace('$', '');

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": { "@type": "Brand", "name": "AffiliatePilot" },
    "offers": {
      "@type": "Offer",
      "url": `https://affiliatepilot-frontend.vercel.app/product/${product.id}`,
      "priceCurrency": "USD",
      "price": String(product.price_usd).replace(/[^0-9.]/g, ''),
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/store" className="text-blue-600 font-bold mb-6 inline-block">← Back to Store</Link>
          <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">Home</Link> &gt; <Link href="/store" className="hover:text-blue-600">Store</Link> &gt; <span className="text-gray-800 font-medium">{product.name?.substring(0, 30)}</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-sm border">
            <div className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-xl border">
              <Image src={product.image} alt={product.name} fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <div className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded w-fit mb-2 animate-pulse">🔥 Only 3 left in stock!</div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">★★★★★ <span className="text-gray-400">({reviews.length} reviews)</span></div>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">${displayPrice} <span className="text-sm text-green-600">FREE Shipping</span></p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="mb-6 border-t pt-4">
                <h2 className="font-bold mb-3">Specs</h2>
                {product.specs ? (<table className="w-full text-sm">{product.specs.split('|').map((s,i)=>{const p=s.split(':');return p.length>1?<tr key={i} className={i%2===0?'bg-gray-50':''}><td className="py-2 px-3 font-semibold w-1/3">{p[0].trim()}</td><td className="py-2 px-3">{p[1].trim()}</td></tr>:null})}</table>) : <p className="text-sm text-gray-500">Premium Quality</p>}
              </div>
              <div className="flex flex-wrap gap-3 mb-6 text-xs font-medium text-gray-600">
                <span className="bg-gray-100 px-3 py-2 rounded-lg">🛡️ 30-Day Warranty</span>
                <span className="bg-gray-100 px-3 py-2 rounded-lg">🔒 Secure Checkout</span>
                <span className="bg-gray-100 px-3 py-2 rounded-lg">✈️ Fast Delivery</span>
              </div>
              <button onClick={addToCart} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition mb-4">🛒 Add to Cart</button>
              <button onClick={() => setShowCheckout(true)} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-600 transition">💳 Buy Now</button>
            </div>
          </div>

          {showCheckout && (
            <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border-2 border-amber-500">
              <h2 className="text-2xl font-extrabold mb-6 text-center">📦 Delivery Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="fullName" placeholder="Full Name" onChange={handleInput} aria-label="Full Name" className="border p-3 rounded-xl" />
                <input name="email" type="email" placeholder="Email" onChange={handleInput} aria-label="Email Address" className="border p-3 rounded-xl" />
                <input name="phone" placeholder="Phone" onChange={handleInput} aria-label="Phone Number" className="border p-3 rounded-xl" />
                <input name="country" placeholder="Country" onChange={handleInput} aria-label="Country" className="border p-3 rounded-xl" />
                <input name="state" placeholder="State" onChange={handleInput} aria-label="State" className="border p-3 rounded-xl" />
                <input name="city" placeholder="City" onChange={handleInput} aria-label="City" className="border p-3 rounded-xl" />
                <input name="zip" placeholder="Zip Code" onChange={handleInput} aria-label="Zip Code" className="border p-3 rounded-xl" />
                <input name="address" placeholder="Street Address" onChange={handleInput} aria-label="Street Address" className="border p-3 rounded-xl" />
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center" id="paypal-button-container"></div>
            </div>
          )}

          <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-extrabold mb-6">⭐ Customer Reviews</h2>
            <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-4 rounded-xl">
              <input type="text" placeholder="Your Name" value={reviewForm.name} onChange={(e)=>setReviewForm({...reviewForm, name: e.target.value})} aria-label="Your Name" className="w-full border p-2 rounded mb-2" required />
              <textarea placeholder="Write a review..." value={reviewForm.comment} onChange={(e)=>setReviewForm({...reviewForm, comment: e.target.value})} aria-label="Write your review" className="w-full border p-2 rounded mb-2 h-20" required></textarea>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Submit Review</button>
            </form>
            {reviews.length === 0 ? <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p> : reviews.map(r=> (
              <div key={r.id} className="border-b py-3">
                <b>{r.user_name}</b> <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
                <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}