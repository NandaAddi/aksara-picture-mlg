import Link from 'next/link';
import Image from 'next/image';
import HeroSlideshow from '@/components/HeroSlideshow';
import FAQAccordion from '@/components/FAQAccordion';

export default function Home() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Aksara Picture',
    'image': 'https://aksarapicture.web.id/assets/img/hz1.webp',
    '@id': 'https://aksarapicture.web.id',
    'url': 'https://aksarapicture.web.id',
    'telephone': '+62881026774401',
    'priceRange': 'IDR 350.000 - IDR 1.500.000',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Jl. Raya Sengkaling No.255',
      'addressLocality': 'Kabupaten Malang',
      'addressRegion': 'Jawa Timur',
      'postalCode': '65151',
      'addressCountry': 'ID',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -7.912567869051239,
      'longitude': 112.58377407137809,
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      'opens': '07:00',
      'closes': '17:00',
    },
    'sameAs': [
      'https://www.instagram.com/aksarapicture.mlg/',
      'https://www.tiktok.com/@aksarapicturemlg',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <section id="home" className="page-section" style={{ paddingTop: 0 }}>
        {/* Hero Slideshow & Headings */}
        <div className="h-screen svh:h-svh relative flex items-center justify-center overflow-hidden">
          <HeroSlideshow />
          <div className="relative z-10 text-center px-4 mt-20">
            <p className="text-xs tracking-[0.3em] uppercase mb-6 text-gray-200 animate-fade-in-up font-medium drop-shadow-md">
              #rollingwithaksara
            </p>
            <h1 className="font-serif text-6xl md:text-8xl italic leading-tight mb-8 drop-shadow-lg text-white">
              Aksara <br />
              <span className="not-italic">Picture</span>
            </h1>
            <Link
              href="/portfolio"
              className="inline-block border border-white/50 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm shadow-lg text-white font-bold"
            >
              Our Portfolio
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div id="home-content" className="relative z-20 bg-studio-black">
          {/* Latest Stories */}
          <div className="relative py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-studio-black/70 z-10" />
              <Image
                src="/assets/img/14.webp"
                alt="Background Texture"
                fill
                sizes="100vw"
                className="object-cover opacity-60 grayscale"
              />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                  <span className="text-xs text-studio-gold tracking-widest uppercase mb-2 block font-bold drop-shadow-md">
                    Latest Stories
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl italic drop-shadow-md text-white">
                    Captured Moments
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="text-xs text-gray-300 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all mt-4 md:mt-0 font-medium"
                >
                  View All Portfolio →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/portfolio" className="group cursor-pointer block">
                  <div className="overflow-hidden aspect-[4/3] mb-4 border border-white/20 shadow-xl relative w-full">
                    <Image
                      src="/assets/img/iola (5).webp"
                      alt="Iola Graduation Moment"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-serif text-xl italic text-gray-200 group-hover:text-white transition-colors drop-shadow-md">
                    Iola's Grads
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-medium">
                    Family Session
                  </p>
                </Link>
                <Link href="/portfolio" className="group cursor-pointer block">
                  <div className="overflow-hidden aspect-[4/3] mb-4 border border-white/20 shadow-xl relative w-full">
                    <Image
                      src="/assets/img/diva (15).webp"
                      alt="Diva Graduation Moment"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-serif text-xl italic text-gray-200 group-hover:text-white transition-colors drop-shadow-md">
                    Diva's Grads
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-medium">
                    Self Session
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Packages */}
          <div className="relative py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-studio-black/70 z-10" />
              <Image
                src="/assets/img/6.webp"
                alt="Pricing Background"
                fill
                sizes="100vw"
                className="object-cover opacity-50 grayscale"
              />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <span className="text-xs text-studio-gold tracking-widest uppercase mb-4 block font-bold drop-shadow-md">
                Best Value
              </span>
              <h2 className="font-serif text-3xl md:text-4xl italic mb-12 drop-shadow-md text-white">
                Popular Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="bg-black/60 backdrop-blur-md p-6 border border-white/10 hover:border-studio-gold transition-colors duration-300 group shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="font-serif text-xl mb-2 text-gray-200 group-hover:text-white">
                      Self Session
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">
                      Perfect for personal graduation portraits.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xs text-gray-400 uppercase">Starts from</span>
                    <p className="text-xl font-serif italic text-studio-gold">IDR 350.000</p>
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md p-6 border border-white/10 hover:border-studio-gold transition-colors duration-300 group relative overflow-hidden shadow-lg flex flex-col justify-between">
                  <div className="absolute top-0 right-0 bg-studio-gold text-black text-[10px] px-2 py-1 font-bold uppercase">
                    Best Seller
                  </div>
                  <div>
                    <div className="font-serif text-xl mb-2 text-gray-200 group-hover:text-white">
                      Group Session
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">
                      Fun session with your best friends.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xs text-gray-400 uppercase">Starts from</span>
                    <p className="text-xl font-serif italic text-studio-gold">IDR 550.000</p>
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md p-6 border border-white/10 hover:border-studio-gold transition-colors duration-300 group shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="font-serif text-xl mb-2 text-gray-200 group-hover:text-white">
                      Prewedding
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">
                      Timeless memories for your journey.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xs text-gray-400 uppercase">Starts from</span>
                    <p className="text-xl font-serif italic text-studio-gold">IDR 1.500.000</p>
                  </div>
                </div>
              </div>
              <Link
                href="/services"
                className="inline-block bg-white text-black px-8 py-3 text-xs uppercase tracking-widest hover:bg-studio-gold hover:text-white transition-all duration-300 shadow-lg font-bold"
              >
                See Full Pricelist
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="relative py-24 px-6 md:px-12 border-b border-white/5 bg-studio-black overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-studio-black/80 z-10" />
              <Image
                src="/assets/img/diva (15).webp"
                alt="Background Texture"
                fill
                sizes="100vw"
                className="object-cover opacity-30 grayscale"
              />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs text-studio-gold tracking-widest uppercase mb-4 block font-bold drop-shadow-md">
                  Information
                </span>
                <h2 className="font-serif text-3xl md:text-4xl italic text-white drop-shadow-md">
                  Frequently Asked Questions
                </h2>
              </div>
              <FAQAccordion />
            </div>
          </div>

          {/* Ready CTA */}
          <div className="relative py-24 px-6 md:px-12 overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-studio-black/60 z-10" />
              <Image
                src="/assets/img/fadel (16).webp"
                alt="Graduation Celebration"
                fill
                sizes="100vw"
                className="object-cover grayscale opacity-60"
              />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-6xl italic mb-6 drop-shadow-lg text-white">
                Ready to make memories?
              </h2>
              <p className="text-gray-300 font-sans text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed font-medium drop-shadow-md">
                Sebagai partner terbaik untuk <strong>Foto Wisuda Malang</strong> dan <strong>Surabaya</strong>, jadwal
                kami terisi dengan cepat. Amankan tanggal spesial Anda sekarang.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link
                  href="/contact"
                  className="inline-block border border-white/60 px-8 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm font-bold shadow-lg text-white"
                >
                  Contact Us
                </Link>
                <a
                  href="https://wa.me/62881026774401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-studio-gold text-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 font-bold shadow-lg"
                >
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="h-12 bg-studio-black" />
        </div>
      </section>
    </>
  );
}
