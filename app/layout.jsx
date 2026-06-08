import './globals.css'

export const metadata = {
  title: 'AffiliatePilot Pro - AI Smart Shopping & Deals | By Hamdan',
  description: 'Find the best deals, track prices, convert currencies, and save money with AI-powered tools. Founded by Hamdan.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        
        {/* GLOBAL NAVBAR */}
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50 bg-opacity-90 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-md">AP</div>
              <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AffiliatePilot</h1>
            </a>
            <div className="hidden md:flex gap-6 text-sm font-medium items-center">
              <a href="/#tools" className="hover:text-blue-600 transition">Tools</a>
              <a href="/#store" className="hover:text-blue-600 transition">Store</a>
              <a href="/about" className="hover:text-blue-600 transition">About Us</a>
              <a href="/terms" className="hover:text-blue-600 transition">Legal</a>
              <a href="/faq" className="hover:text-blue-600 transition">FAQ</a>
            </div>
            {/* GO PRO BUTTON LINKING TO SUBSCRIPTION SECTION */}
            <a href="/#pro" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm">Go Pro 💎</a>
          </div>
        </nav>

        <main>{children}</main>

        {/* GLOBAL FOOTER */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center text-xs">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-left mb-8">
            <div>
              <h3 className="text-white font-bold mb-2">AffiliatePilot</h3>
              <p className="text-gray-500">AI-powered smart shopping platform founded by Hamdan.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Quick Links</h3>
              <a href="/#tools" className="block text-gray-500 hover:text-white">Tools</a>
              <a href="/about" className="block text-gray-500 hover:text-white">About Us</a>
              <a href="/faq" className="block text-gray-500 hover:text-white">FAQ</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Legal</h3>
              <a href="/terms" className="block text-gray-500 hover:text-white">Privacy Policy</a>
              <a href="/terms" className="block text-gray-500 hover:text-white">Terms of Service</a>
              <a href="/terms" className="block text-gray-500 hover:text-white">Affiliate Disclosure</a>
            </div>
          </div>
          <p className="border-t border-gray-800 pt-6">© 2024 AffiliatePilot. All rights reserved.</p>
        </footer>

      </body>
    </html>
  )
}
