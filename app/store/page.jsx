"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export default function Store() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('store_products').select('*').order('created_at', { ascending: false });
      if(data) setProducts(data);
    }
    load();
    const savedCart = localStorage.getItem('pilotCart');
    if(savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const addToCart = (product, e) => {
    e.preventDefault();
    if(cart.find(c => c.id === product.id)) return alert("Already in cart!");
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('pilotCart', JSON.stringify(newCart));
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(String(item.price_usd).replace(/[^0-9.]/g, '')), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setIsCartOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-extrabold">Cart ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-3xl">&times;</button>
            </div>
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? <p className="text-center py-20 text-gray-400">Cart is empty</p> : cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  {/* Cart Image Optimized */}
                  <Image src={item.image} alt={item.name} width={80} height={80} className="rounded object-cover" />
                  <div>
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className="text-blue-600 font-bold">${item.price_usd}</p>
                    <button onClick={() => { const n = cart.filter(c=>c.id!==item.id); setCart(n); localStorage.setItem('pilotCart', JSON.stringify(n)); }} className="text-red-500 text-xs">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span>Subtotal:</span>
                  <span className="text-2xl font-extrabold">${cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-bold text-lg shadow-md">Proceed to Checkout</Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold">Curated Store</h1>
            <p className="text-xs text-gray-500">FREE Worldwide Shipping</p>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative bg-gray-100 hover:bg-gray-200 p-3 rounded-full">
            🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cart.length}</span>}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <Link href={`/product/${p.id}`} key={p.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition group overflow-hidden flex flex-col">
            {/* Grid Image Optimized with fill */}
            <div className="relative aspect-square bg-gray-50 p-4 overflow-hidden">
              <Image 
                src={p.image} 
                alt={p.name} 
                fill 
                className="object-contain group-hover:scale-110 transition-transform" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col border-t">
              <h3 className="font-bold text-sm line-clamp-2 mb-2">{p.name}</h3>
              <div className="mt-auto">
                <p className="text-xl font-extrabold text-gray-900">${p.price_usd} <span className="text-xs text-green-600 font-normal">FREE Ship</span></p>
                <button onClick={(e) => addToCart(p, e)} className="mt-3 w-full bg-gray-900 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-bold transition">Add to Cart</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}