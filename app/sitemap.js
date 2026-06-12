import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.NEXT_PUBLIC_SB_KEY);

export default async function sitemap() {
  const { data: products } = await supabase.from('store_products').select('id, created_at');

  const productEntries = products?.map((p) => ({
    loc: `https://affiliatepilot-frontend.vercel.app/product/${p.id}`,
    lastModified: new Date(p.created_at).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];

  return [
    {
      loc: 'https://affiliatepilot-frontend.vercel.app',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      loc: 'https://affiliatepilot-frontend.vercel.app/store',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productEntries,
  ];
}
