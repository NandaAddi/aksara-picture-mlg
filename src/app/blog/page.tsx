import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog & Artikel | Aksara Journal',
  description:
    'Tips foto wisuda, inspirasi pose, dan cerita di balik layar Aksara Picture. Baca artikel terbaru kami di sini.',
  keywords: [
    'blog fotografi',
    'tips foto wisuda',
    'ide pose wisuda',
    'artikel fotografi malang',
    'aksara journal',
  ],
  alternates: {
    canonical: '/blog',
  },
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  // Fetch published articles from Supabase with selective columns (server-serialization)
  const { data: articlesData } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, thumbnail_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const articles = (articlesData || []).map((art) => ({
    ...art,
    formatted_date: new Date(art.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return (
    <section id="blog" className="page-section active">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-studio-black/70 z-10" />
        <Image
          src="/assets/img/hz1.webp"
          alt="Blog Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 grayscale"
        />
      </div>

      <BlogClient articles={articles} />
    </section>
  );
}
