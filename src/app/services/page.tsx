import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Pricelist & Paket Jasa Foto Wisuda Malang Surabaya | Aksara Picture',
  description:
    'Cek daftar harga paket foto wisuda terbaik dari Aksara Picture. Paket wisuda self session, couple session, group/grup, dan MUA kolaborasi di Malang & Surabaya.',
  keywords: [
    'pricelist aksara picture',
    'harga foto wisuda malang',
    'paket foto wisuda surabaya',
    'paket foto wisuda murah malang',
    'biaya fotografer wisuda',
  ],
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
