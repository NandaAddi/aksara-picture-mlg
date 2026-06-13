'use client';

import { useState, useEffect } from 'react';
import { Link2, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(currentUrl);
    alert('Link tersalin!');
  };

  const shareWA = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = `Baca ini: ${title} ${currentUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-gray-500 uppercase tracking-widest">
        Share this story:
      </span>
      <button
        onClick={copyLink}
        aria-label="Salin tautan"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-studio-gold hover:text-black transition-all text-white cursor-pointer"
      >
        <Link2 className="w-4 h-4" />
      </button>
      <button
        onClick={shareWA}
        aria-label="Bagikan ke WhatsApp"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-green-500 hover:text-white transition-all text-white cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
      </button>
    </div>
  );
}
