import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-studio-black flex flex-col items-center justify-center text-center p-6 z-[60]">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="font-serif text-8xl md:text-9xl text-studio-gold italic animate-pulse">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl text-white italic">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-400 font-sans text-sm leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block border border-studio-gold text-studio-gold hover:bg-studio-gold hover:text-black px-8 py-3 text-xs uppercase tracking-widest transition-all duration-300 font-bold"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
