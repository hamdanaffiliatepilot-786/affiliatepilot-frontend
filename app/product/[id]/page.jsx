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
        await actions.order.capture();
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
              <div className="
