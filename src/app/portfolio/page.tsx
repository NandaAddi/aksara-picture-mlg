import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio | Galeri Foto Aksara Picture',
  description:
    'Lihat portofolio terbaik Aksara Picture. Kumpulan foto wisuda estetik, prewedding romantis, dan momen studio di Malang, Surabaya, Kediri.',
  keywords: [
    'portfolio aksara picture',
    'hasil foto wisuda malang',
    'contoh foto wisuda ub',
    'galeri foto prewedding malang',
    'portofolio fotografer malang',
  ],
  alternates: {
    canonical: '/portfolio',
  },
};

export const revalidate = 60; // Revalidate every minute

export default async function PortfolioPage() {
  // Fetch Projects and Images in parallel (async-parallel & server-serialization)
  const [projectsResult, imagesResult] = await Promise.all([
    supabase
      .from('projects')
      .select('id, title, category, slug, sort_order')
      .order('sort_order', { ascending: true }),
    supabase
      .from('project_images')
      .select('id, project_id, image_url, aspect_ratio, sort_order')
      .order('sort_order', { ascending: true }),
  ]);

  const projects = projectsResult.data || [];
  const images = imagesResult.data || [];

  return (
    <section id="portfolio" className="page-section active">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-studio-black/70 z-10" />
        <Image
          src="/assets/img/5.webp"
          alt="Portfolio Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 grayscale"
        />
      </div>

      <PortfolioClient projects={projects} images={images} />
    </section>
  );
}
