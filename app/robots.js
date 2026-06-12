export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/checkout/'],
    },
    sitemap: 'https://affiliatepilot-frontend.vercel.app/sitemap.xml',
  };
}