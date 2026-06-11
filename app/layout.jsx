import './globals.css';
import Link from 'next/link';

const LOGO_URL = "https://z-cdn-media.chatglm.cn/files/f57e5ecf-3851-451b-85be-81edc12550ec.png?auth_key=1880958256-a4ec5c83ad274ef88c40ebf635d53c56-0-77f68c8df2516c58efa9b22ef1eebc1e";

export const metadata = {
  title: 'AffiliatePilot - Smart AI Shopping & Best Price Comparison',
  description: 'Find products from Instagram Reels, compare prices across Amazon, Flipkart & 8 sites. Get real-time coupons, price drop alerts and FREE worldwide shipping.',
  keywords: 'best deals, price comparison, dropshipping, free shipping, AI shopping assistant, affiliate pilot, coupons, online shopping',
  openGraph: {
    title: 'AffiliatePilot - Smart AI Shopping',
    description: 'Compare prices & get the best deals worldwide. Free Shipping!',
    url: 'https://affiliatepilot-frontend.vercel.app',
    siteName: 'AffiliatePilot',
    images: [{ url: LOGO_URL }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AffiliatePilot - Smart AI Shopping',
    description: 'Compare prices & get the best deals worldwide.',
    images: [LOGO_URL],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://affiliatepilot-frontend.vercel.app' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src={LOGO_URL} alt="AffiliatePilot Logo" className="h-10 w-auto" />
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <Link href="/store" className="hover:text-blue-600 transition">Store</Link>
              <Link href="/about" className="hover:text-blue-600 transition">About</Link>
              <Link href="/faq" className="hover:text-blue-600 transition">FAQ</Link>
              <Link href="/dashboard" className="hover:text-blue-600 transition">My Orders</Link>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-slate-900 text-gray-400 py-10 text-center px-4 text-sm">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
            <img src={LOGO_URL} alt="AffiliatePilot" className="h-8 w-auto opacity-80" />
            <p>© {new Date().getFullYear()} AffiliatePilot - Smart Shopping Starts Here.</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/about" className="hover:text-white">About Us</Link>
              <Link href="/faq" className="hover:text-white">FAQ</Link>
              <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
