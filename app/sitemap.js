import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export default async function sitemap() {
  let productEntries = [];
  
  try {
    const { data: products } = await supabase.from('store_products').select('id, created_at');
    if (products && products.length > 0) {
      productEntries = products.map((p) => ({
        url: `https://affiliatepilot-frontend.vercel.app/product/${p.id}`,
        lastModified: new Date(p.created_at),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  const staticPages = [
    {
      url: 'https://affiliatepilot-frontend.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/store',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://affiliatepilot-frontend.vercel.app/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ];

  return [...staticPages, ...productEntries];
}
