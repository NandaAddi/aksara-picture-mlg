'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Check } from 'lucide-react';

export default function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const priceItems = containerRef.current?.querySelectorAll('.price-animate-item');
    if (priceItems && priceItems.length > 0) {
      gsap.from(priceItems, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2,
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 px-6 md:px-12 pb-24 pt-24 md:pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-studio-black/90" />
        <Image
          src="/assets/img/vz2.webp"
          alt="Services Background"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-30 grayscale"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-2 md:mt-6">
        <div className="flex items-baseline justify-between border-b border-white/20 pb-8 mb-12">
          <h1 className="font-serif text-4xl italic drop-shadow-md text-white">Pricelist</h1>
          <p className="text-xs font-sans text-gray-300 uppercase tracking-widest font-bold drop-shadow-md">
            Aksara Picture
          </p>
        </div>

        <div className="space-y-12">
          {/* Self Session */}
          <div className="price-animate-item flex flex-col md:flex-row justify-between gap-6 group">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-serif mb-2 group-hover:text-studio-gold transition-colors drop-shadow-md text-white">
                Self Session
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-4 font-medium">
                1 Graduate and Family
              </p>
            </div>
            <div className="md:w-1/3 text-left md:text-right font-serif text-xl italic drop-shadow-md text-white">
              IDR 350.000
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Couple Session */}
          <div className="price-animate-item flex flex-col md:flex-row justify-between gap-6 group">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-serif mb-2 group-hover:text-studio-gold transition-colors drop-shadow-md text-white">
                Couple Session
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-4 font-medium">
                2 Graduate and Family
              </p>
            </div>
            <div className="md:w-1/3 text-left md:text-right font-serif text-xl italic drop-shadow-md text-white">
              IDR 500.000
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Group Sessions */}
          <div className="price-animate-item flex flex-col md:flex-row justify-between gap-6 group">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-serif mb-2 group-hover:text-studio-gold transition-colors drop-shadow-md text-white">
                Group Sessions
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-4 font-medium">
                Max 5 Graduate without family
              </p>
            </div>
            <div className="md:w-1/3 text-left md:text-right font-serif text-xl italic drop-shadow-md text-white">
              IDR 550.000
            </div>
          </div>

          <hr className="border-white/10" />

          {/* MUA Package */}
          <div className="price-animate-item flex flex-col md:flex-row justify-between gap-6 group">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-serif mb-2 group-hover:text-studio-gold transition-colors drop-shadow-md text-white">
                MUA Package
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-1 font-medium">
                Aksara x <span className="text-white italic">Yeonggi by el</span>
              </p>
              <p className="text-xs text-studio-gold font-sans uppercase tracking-wide font-bold">
                Special collaboration for your graduation moment
              </p>
            </div>
            <div className="md:w-1/3 text-left md:text-right font-serif text-xl italic flex flex-col items-start md:items-end drop-shadow-md">
              <span className="text-gray-400 text-sm line-through decoration-studio-gold">
                IDR 600.000
              </span>
              <span className="text-white">IDR 550.000</span>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Framora Story */}
          <div className="price-animate-item flex flex-col gap-8 group py-4">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-2xl font-serif text-studio-gold drop-shadow-md">
                      Special Content: Framora Story
                    </h3>
                    <span className="bg-white text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm shadow-md">
                      Opening Promo
                    </span>
                  </div>
                  <p className="text-gray-300 font-sans text-sm italic font-medium">
                    Photographer & Content Creator Bundling (With Aksara)
                  </p>
                </div>
                <div className="text-right hidden md:block">
                  <span className="text-xs text-gray-300 uppercase tracking-widest block border border-gray-400 px-3 py-1 rounded-full font-bold backdrop-blur-sm">
                    Limited Slot
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Self Session Bundle */}
                <div className="bg-black/60 p-6 border border-white/10 hover:border-studio-gold transition-colors rounded-lg backdrop-blur-sm shadow-lg">
                  <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                    <div>
                      <h4 className="text-xl font-serif text-white">Self Session</h4>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-medium">
                        1 Graduate (with family)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-serif italic text-studio-gold">
                        IDR 480.000
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                        Bundle Price
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                      <span className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider flex justify-between">
                        Photographer <span className="text-gray-500 font-normal normal-case">IDR 350k value</span>
                      </span>
                      <ul className="text-gray-400 text-xs space-y-2 list-none font-medium">
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>1 Photographer</span>
                        </li>
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>30 Edited Photos</span>
                        </li>
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>Multiple Spot (Campus Only)</span>
                        </li>
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>All Files via Google Drive</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider flex justify-between">
                        Content Creator <span className="text-gray-500 font-normal normal-case">IDR 150k value</span>
                      </span>
                      <ul className="text-gray-400 text-xs space-y-2 list-none font-medium">
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>2-4 Story Real Time</span>
                        </li>
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>1 Video Highlight</span>
                        </li>
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>1 Video TikTok/Reels (By Request)</span>
                        </li>
                        <li className="flex gap-2">
                          <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                          <span>Unlimited RAW Video (GDrive)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Couple Session Bundle */}
                <div className="bg-black/60 p-6 border border-white/10 hover:border-studio-gold transition-colors rounded-lg backdrop-blur-sm shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-serif text-white">Couple Session</h4>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-medium">
                        2 Graduates (with family)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-serif italic text-studio-gold">
                        IDR 700.000
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                        Bundle Price
                      </span>
                    </div>
                  </div>
                </div>

                {/* Group Session Bundle */}
                <div className="bg-black/60 p-6 border border-white/10 hover:border-studio-gold transition-colors rounded-lg backdrop-blur-sm shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-serif text-white">Group Session</h4>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-medium">
                        3-5 Graduates (Group Only)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-serif italic text-studio-gold">
                        IDR 950.000
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                        Bundle Price
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
