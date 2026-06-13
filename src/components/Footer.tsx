'use client';

interface FooterProps {
  onOpenTerms: () => void;
}

export default function Footer({ onOpenTerms }: FooterProps) {
  return (
    <footer className="fixed bottom-0 w-full px-8 py-4 flex justify-between items-end z-40 bg-gradient-to-t from-studio-black to-transparent pointer-events-none">
      <div className="flex gap-6 text-[10px] uppercase tracking-widest font-sans text-gray-400 pointer-events-auto">
        <span>© 2026 Aksarapicture.mlg</span>
        <button
          onClick={onOpenTerms}
          className="hover:text-white transition-colors border-b border-transparent hover:border-white"
        >
          Syarat & Ketentuan
        </button>
      </div>
      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans hidden md:block">
        Malang • Surabaya • Kediri
      </span>
    </footer>
  );
}
