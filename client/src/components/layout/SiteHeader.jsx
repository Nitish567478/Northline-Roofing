import { useState } from 'react';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-900/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo & Brand Name */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Northline Roofing logo"
            className="h-10 w-10"
          />
          <div>
            <p className="text-lg font-bold leading-tight">Northline Roofing</p>
            <p className="text-xs text-brand-100">& Exteriors</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          <a href="/services" className="text-sm font-medium text-brand-100 hover:text-white transition">
            Services
          </a>
          <a href="/how-it-works" className="text-sm font-medium text-brand-100 hover:text-white transition">
            How It Works
          </a>
          <a href="/estimate" className="text-sm font-medium text-brand-100 transition hover:text-white flex items-center gap-1.5">
            Get Free Estimate
          </a>
          <a
            href="/admin/login"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-amber-400"
            title="Owner Login"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden md:inline">Owner Login</span>
          </a>
        </nav>

        {/* Mobile Actions: Estimate quick button & Hamburger Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="/estimate"
            className="rounded-lg bg-brand-800 border border-white/10 px-3 py-1.5 text-xs font-medium text-brand-100 hover:text-white"
          >
            Estimate
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-brand-100 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-white/10 bg-brand-900 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <a
            href="/services"
            className="block text-base font-medium text-brand-100 hover:text-white py-1"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            href="/how-it-works"
            className="block text-base font-medium text-brand-100 hover:text-white py-1"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </a>
          <a
            href="/estimate"
            className="block text-base font-medium text-brand-100 hover:text-white py-1"
            onClick={() => setIsOpen(false)}
          >
            Get Free Estimate
          </a>
          <div className="pt-2 border-t border-white/10">
            <a
              href="/admin/login"
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 w-full py-2.5 text-sm font-semibold text-brand-900 hover:bg-amber-400"
              onClick={() => setIsOpen(false)}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Owner Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}