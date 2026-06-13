import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ClientLayout from '@/components/ClientLayout';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aksarapicture.web.id'),
  title: {
    default: 'Aksara Picture | Jasa Foto Wisuda Malang & Surabaya Terbaik',
    template: '%s | Aksara Picture',
  },
  description:
    'Jasa foto wisuda, prewedding, dan studio terbaik di Malang, Surabaya, dan Kediri. Hasil estetik, harga mahasiswa, dan pelayanan ramah. Booking sekarang!',
  keywords: [
    'foto wisuda malang',
    'fotografer wisuda ub',
    'fotografer wisuda um',
    'foto studio malang',
    'prewedding malang',
    'foto wisuda surabaya',
    'foto wisuda kediri',
    'aksara picture',
  ],
  authors: [{ name: 'Nanda Addi Wijaya' }],
  creator: 'Nanda Addi Wijaya',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aksarapicture.web.id',
  },
  openGraph: {
    type: 'website',
    url: 'https://aksarapicture.web.id/',
    title: 'Aksara Picture - Capture Your Best Moment',
    description: 'Spesialis foto wisuda dan couple session di Jawa Timur. Cek portofolio kami!',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Aksara Picture Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aksara Picture Malang',
    description: 'Jasa dokumentasi wisuda terbaik di Jawa Timur.',
    images: ['/og-image.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${playfairDisplay.variable} h-full scroll-smooth`}
    >
      <body className="bg-studio-black text-studio-white min-h-full font-sans antialiased">
        <SmoothScroll>
          <ClientLayout>{children}</ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
