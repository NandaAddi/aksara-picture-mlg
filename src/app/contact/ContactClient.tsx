'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [service, setService] = useState('Self Session');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  useGSAP(() => {
    if (formRef.current) {
      gsap.from(formRef.current.parentElement, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      });
    }
  }, { scope: containerRef });

  const handleWASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Aksara, saya ${name} ingin booking untuk ${service} tanggal ${date || '-'}. Note: ${note || '-'}`;
    window.open(`https://wa.me/62881026774401?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div ref={containerRef} className="relative z-10 px-6 md:px-12 pb-24 pt-24 md:pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-studio-black/90" />
        <Image
          src="/assets/img/1.webp"
          alt="Contact Background"
          fill
          sizes="50vw"
          priority
          quality={50}
          className="object-cover opacity-30 grayscale"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-2 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Info Details */}
        <div>
          <span className="text-xs text-studio-gold tracking-widest uppercase mb-4 block font-bold drop-shadow-md">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl italic mb-8 drop-shadow-md text-white">
            Let's Create.
          </h1>
          <p className="text-gray-300 font-sans mb-8 leading-relaxed font-medium drop-shadow-md">
            Kami menerima booking terbatas setiap bulannya untuk menjaga kualitas. Silakan hubungi kami untuk ketersediaan jadwal.
          </p>
          <div className="space-y-4 font-sans text-sm">
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">
                Studio
              </span>
              <p className="text-white font-medium">Based In Malang, Jawa Timur</p>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">
                Email
              </span>
              <p className="text-white font-medium">aksarapicture@gmail.com</p>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">
                Social
              </span>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://www.instagram.com/aksarapicture.mlg/"
                  className="hover:text-studio-gold transition-colors text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@aksarapicturemlg"
                  className="hover:text-studio-gold transition-colors text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.54-4.06-1.42-.5-.38-.93-.84-1.27-1.37v7.6c-.05 3.09-1.74 6.05-4.63 7.15-2.89 1.1-6.27.42-8.46-1.63-2.2-2.05-2.92-5.42-1.75-8.29 1.18-2.87 4.16-4.71 7.25-4.56.02 1.39-.01 2.78-.02 4.17-.43-.07-.88-.04-1.3.08-1.24.34-2.24 1.45-2.39 2.73-.2 1.76.95 3.48 2.68 3.82 1.73.34 3.55-.74 3.9-2.48.06-.31.07-.63.07-.95V0h-.01z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/62881026774401"
                  className="hover:text-studio-gold transition-colors text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.974-1.86-1.865-4.343-2.891-6.984-2.893-5.44 0-9.865 4.421-9.869 9.858-.002 1.714.453 3.39 1.317 4.877L1.979 22.02l4.668-1.226zM17.43 14.53c-.295-.147-1.748-.862-2.019-.96-.272-.099-.47-.147-.667.148-.198.295-.767.96-.94 1.157-.173.197-.346.222-.64.074-.3-.147-1.267-.467-2.413-1.488-.892-.796-1.494-1.78-1.67-2.076-.177-.295-.019-.455.129-.602.133-.132.296-.345.444-.518.148-.173.197-.295.296-.493.1-.197.05-.37-.025-.518-.074-.147-.667-1.607-.914-2.203-.24-.58-.484-.502-.667-.512-.173-.008-.371-.01-.569-.01-.197 0-.518.074-.79.37-.272.295-1.037 1.012-1.037 2.47 0 1.456 1.062 2.862 1.21 3.06.148.197 2.09 3.194 5.06 4.475.707.306 1.258.489 1.69.626.712.226 1.36.194 1.872.118.571-.085 1.748-.714 1.995-1.403.247-.69.247-1.282.173-1.403-.074-.123-.272-.196-.568-.344z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-black/60 p-8 border border-white/10 backdrop-blur-sm rounded-lg shadow-xl">
          <form ref={formRef} onSubmit={handleWASubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 py-2 text-white focus:border-white focus:outline-none transition-colors font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">
                Service Type
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 py-2 text-white focus:border-white focus:outline-none transition-colors appearance-none font-medium animate-none"
              >
                <option className="bg-studio-black text-white">Self Session</option>
                <option className="bg-studio-black text-white">Couple Session</option>
                <option className="bg-studio-black text-white">Group Session</option>
                <option className="bg-studio-black text-white">MUA Package</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 py-2 text-white focus:border-white focus:outline-none transition-colors font-medium"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">
                Message
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 py-2 text-white focus:border-white focus:outline-none transition-colors font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-4 text-xs uppercase tracking-widest hover:bg-studio-gold hover:text-white transition-all duration-300 font-bold shadow-lg"
            >
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
