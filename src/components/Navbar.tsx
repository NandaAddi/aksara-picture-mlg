'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      if (isMobileMenuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 md:px-8 py-6 flex justify-between items-center bg-studio-black/80 backdrop-blur-sm border-b border-white/5 transition-all duration-300">
        <Link 
          href="/" 
          className="font-serif text-2xl tracking-wide italic z-50 relative text-white"
          aria-label="Aksara Picture Homepage"
        >
          AksaraPicture.
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase font-sans text-gray-400">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`nav-link pb-1 transition-all hover:text-white ${
                isActive(link.href) ? 'text-white border-b border-white' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Toggle Button */}
        <button
          aria-label="Buka Menu Utama"
          onClick={toggleMobileMenu}
          className="md:hidden text-white text-xl z-50 relative w-8 h-8 flex items-center justify-center"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-studio-black z-[45] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-3xl font-serif italic hover:text-studio-gold transition-colors ${
              isActive(link.href) ? 'text-white' : 'text-gray-400'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
