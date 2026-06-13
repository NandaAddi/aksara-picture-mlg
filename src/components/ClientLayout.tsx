'use client';

import { useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsModal = dynamic(() => import('./TermsModal'), { ssr: false });

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main id="app-content" className="relative z-10">
        {children}
      </main>
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
