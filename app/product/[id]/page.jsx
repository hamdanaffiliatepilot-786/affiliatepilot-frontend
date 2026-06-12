import { createClient } from '@supabase/supabase-js';
import ProductClient from './ProductClient';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export async function generateMetadata({ params }) {
  const { data: product } = await supabase.from('store_products').select('*').eq('id', params.id).single();
  if (!product) return { title: 'Product Not Found | AffiliatePilot' };
  return {
    title: `${product.name} | Best Price & FREE Shipping`,
    description: product.description || `Buy ${product.name} for just $${product.price_usd} with FREE Worldwide Shipping.`,
  };
}

export default function ProductPage({ params }) {
  return <ProductClient id={params.id} />;
}