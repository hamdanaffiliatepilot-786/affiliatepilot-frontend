import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export const revalidate = 3600; // Har ghante naya sitemap generate karega

export default async function sitemap() {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (Safe for Google)
  let productEntries = [];
  
  try {
    const { data: products } = await supabase.from('store_products').select('id');
    if (products && products.length > 0) {
      productEntries = products.map((p) => ({
        url: `https://affiliatepilot-frontend.vercel.app/product/${p.id}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return [
    {
      url: 'https://affiliatepilot-frontend.vercel.app',
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/store',
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/about',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/faq',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productEntries
  ];
}
