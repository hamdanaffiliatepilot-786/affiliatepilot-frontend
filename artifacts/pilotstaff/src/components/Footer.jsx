import { Link } from 'wouter';
import { Logo } from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo size={36} />
              <span className="text-lg font-extrabold text-white">PilotStaff</span>
            </Link>
            <p className="text-sm leading-relaxed">AI tools and AI employees for modern businesses. Save thousands per month.</p>
            <p className="text-xs text-slate-500 mt-4">77+ free AI tools · 11 AI staff · No login required</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              <li><Link href="/tools" className="text-sm hover:text-white transition">Free AI Tools</Link></li>
              <li><Link href="/staff" className="text-sm hover:text-white transition">AI Staff</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-white transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/referrals" className="text-sm hover:text-white transition">Referrals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm hover:text-white transition">About</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-white transition">Blog</Link></li>
              <li><Link href="/founder" className="text-sm hover:text-white transition">Founder</Link></li>
              <li><Link href="/careers" className="text-sm hover:text-white transition">Careers</Link></li>
              <li><Link href="/changelog" className="text-sm hover:text-white transition">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-sm hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/guidelines" className="text-sm hover:text-white transition">Usage Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {currentYear} PilotStaff. All rights reserved.</p>
          <p className="text-xs text-slate-500">
            <span className="text-emerald-400">●</span> All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
