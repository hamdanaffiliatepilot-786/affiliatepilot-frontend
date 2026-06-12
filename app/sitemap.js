import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

// Yeh line Vercel ko sitemap cache karne se rokegi
export const dynamic = 'force-dynamic'; 

export default async function sitemap() {
  let productEntries = [];
  
  try {
    const { data: products } = await supabase.from('store_products').select('id');
    if (products && products.length > 0) {
      productEntries = products.map((p) => ({
        url: `https://affiliatepilot-frontend.vercel.app/product/${p.id}`,
        lastModified: new Date().toISOString(),
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
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/store',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/faq',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productEntries
  ];
}
