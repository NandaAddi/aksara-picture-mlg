'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    desktop: '/assets/img/hz1.webp',
    mobile: '/assets/img/vz1.webp',
    alt: 'Aksara Picture Graduation Showcase 1',
  },
  {
    desktop: '/assets/img/hz2.webp',
    mobile: '/assets/img/vz2.webp',
    alt: 'Aksara Picture Graduation Showcase 2',
  },
  {
    desktop: '/assets/img/6.webp',
    mobile: '/assets/img/2.webp',
    alt: 'Aksara Picture Cinematic Shot',
  },
  {
    desktop: '/assets/img/hz3.webp',
    mobile: '/assets/img/vz3.webp',
    alt: 'Aksara Picture Portrait Showcase',
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {/* Desktop Image */}
            <div className="hidden md:block w-full h-full relative">
              <Image
                src={slide.desktop}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={70}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {/* Mobile Image */}
            <div className="block md:hidden w-full h-full relative">
              <Image
                src={slide.mobile}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={70}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
}
