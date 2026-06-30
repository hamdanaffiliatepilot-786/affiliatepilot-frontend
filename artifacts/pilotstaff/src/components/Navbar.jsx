import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { useAuth } from "../lib/authContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [location] = useLocation();

  const navLinks = [
    { href: "/tools", label: "Free Tools" },
    { href: "/staff", label: "AI Staff" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PilotStaff Home">
            <Logo size={36} />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">PilotStaff</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {loading ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
            ) : user ? (
              <div ref={dropdownRef} className="relative">
                <button type="button" onClick={() => setDropdownOpen(c => !c)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium">{user.name || user.email || "User"}</span>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">Dashboard</Link>
                    <div className="my-2 border-t border-slate-100" />
                    <button type="button" onClick={handleLogout} className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">Login</Link>
                <Link href="/signup" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Sign Up Free</Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button type="button" onClick={() => setMobileOpen(c => !c)} className="p-2 text-slate-600" aria-label="Open menu">
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mx-4 rounded-b-2xl border border-slate-200 bg-white p-4 shadow-2xl md:hidden">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-100" />
            {loading ? (
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
            ) : user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">Dashboard</Link>
                <button type="button" onClick={handleLogout} className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">Login</Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white">Sign Up Free</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
