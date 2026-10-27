import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/catalog' },
    { label: 'About Us', path: '/about' },
    { label: 'Why Us', path: '/rd' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8DF]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Logo with double leaf emblem and serif typography */}
          <Link
            to="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#EEF4EE] flex items-center justify-center text-[#22512D] transition-transform duration-200 group-hover:scale-105">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display font-bold text-xl text-[#16361E] leading-tight tracking-tight">
                Orbit Seeds
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#637064] uppercase font-semibold">
                Seed Corporation · Vehari
              </span>
            </div>
          </Link>

          {/* Centered Navigation Links with clean underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#252E27]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 text-[13px] ${
                  isCurrent(link.path)
                    ? 'border-[#22512D] text-[#16361E] font-semibold'
                    : 'border-transparent text-[#252E27]/75 hover:text-[#22512D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action: Call / WhatsApp green pill button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923107733113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#22512D] hover:bg-[#1a3e23] rounded-full shadow-xs transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Call / WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="https://wa.me/923107733113"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-[#22512D] rounded-full"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#252E27] hover:text-[#22512D]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8DF] bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  isCurrent(link.path)
                    ? 'bg-[#EEF4EE] text-[#22512D] font-semibold'
                    : 'text-[#252E27]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E2E8DF] flex flex-col gap-2">
            <a
              href="https://wa.me/923107733113"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#22512D] rounded-full text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Call / WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
