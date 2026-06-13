import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Hubungi Kami & Booking Foto Wisuda Malang | Aksara Picture',
  description:
    'Kontak studio Aksara Picture Malang. Reservasi jadwal foto wisuda kampus UB, UM, UMM, prewedding, atau sesi foto studio. Hubungi kami melalui email atau chat WhatsApp.',
  keywords: [
    'booking foto wisuda malang',
    'kontak aksara picture',
    'alamat aksara picture malang',
    'nomor whatsapp fotografer malang',
    'studio foto sengkaling',
  ],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
