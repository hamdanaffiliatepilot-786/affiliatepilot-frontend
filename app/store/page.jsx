import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export const revalidate = 60; 

export default async function Store() {
  const { data: products } = await supabase.from('store_products').select('*').order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center">🛍️ All Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition group overflow-hidden">
                <div className="relative aspect-square bg-gray-50 p-4 overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-contain group-hover:scale-110 transition-transform" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="p-4 border-t">
                  <h3 className="font-bold text-sm line-clamp-2 mb-2 h-10">{p.name}</h3>
                  <p className="text-blue-600 font-extrabold text-lg">${p.price_usd} <span className="text-xs text-green-600 font-normal">FREE Ship</span></p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 col-span-4 text-center py-10">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
