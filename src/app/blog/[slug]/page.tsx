import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { supabase } from '@/lib/supabase';
import ShareButtons from '@/components/ShareButtons';

const FALLBACK_IMAGE = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%27http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg%27 width%3D%27100%27 height%3D%27100%27 viewBox%3D%270 0 100 100%27%3E%3Crect width%3D%27100%25%27 height%3D%27100%25%27 fill%3D%27%23111%27%2F%3E%3C%2Fsvg%3E';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, thumbnail_url')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} | Aksara Journal`,
    description: article.excerpt || 'Baca artikel selengkapnya di Aksara Journal.',
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Baca artikel selengkapnya di Aksara Journal.',
      type: 'article',
      url: `/blog/${slug}`,
      images: [
        {
          url: article.thumbnail_url || '/assets/img/hz1.webp',
          alt: article.title,
        },
      ],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

// Generate static routes at build time (SSG)
export async function generateStaticParams() {
  const { data: articles } = await supabase
    .from('articles')
    .select('slug')
    .eq('is_published', true);

  if (!articles) return [];

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const revalidate = 60; // Revalidate every minute

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  // Fetch the article details and recommendations in parallel (async-parallel)
  const [articleResult, recommendationsResult] = await Promise.all([
    supabase
      .from('articles')
      .select('title, excerpt, content, thumbnail_url, created_at')
      .eq('slug', slug)
      .eq('is_published', true)
      .single(),
    supabase
      .from('articles')
      .select('title, excerpt, thumbnail_url, created_at, slug')
      .eq('is_published', true)
      .neq('slug', slug)
      .order('created_at', { ascending: false })
      .limit(3),
  ]);

  const { data: article, error } = articleResult;
  const recommendations = recommendationsResult.data || [];

  if (error || !article) {
    notFound();
  }

  const date = new Date(article.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedContent = (article.content || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00A0/g, ' ');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.excerpt || '',
    'image': article.thumbnail_url || 'https://aksarapicture.web.id/assets/img/hz1.webp',
    'datePublished': article.created_at,
    'author': {
      '@type': 'Person',
      'name': 'Aksara Picture Editorial',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Aksara Picture',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://aksarapicture.web.id/assets/img/favicon.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://aksarapicture.web.id/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <section id="article" className="page-section active min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-studio-black/80 z-10" />
        <Image
          src="/assets/img/hz1.webp"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 grayscale"
        />
      </div>

      <div className="relative z-10 pb-24 px-4 md:px-12 pt-6 md:pt-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Article Content (8 columns) */}
          <article className="lg:col-span-8 w-full animate-fade-in-up">
            <header className="text-left mb-6 md:mb-8">
              <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 border border-white/10 rounded-full bg-black/30 backdrop-blur-sm">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  {date}
                </span>
                <span className="w-1 h-1 bg-studio-gold rounded-full" />
                <span className="text-[10px] text-studio-gold uppercase tracking-widest font-bold">
                  Aksara Journal
                </span>
              </div>

              <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white italic leading-tight mb-4">
                {article.title}
              </h1>
            </header>

            {/* Thumbnail */}
            {article.thumbnail_url && (
              <div className="w-full aspect-video overflow-hidden rounded-sm border border-white/10 shadow-2xl mb-6 md:mb-8 bg-studio-black relative">
                <Image
                  src={article.thumbnail_url}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Body */}
            <div className="bg-black/40 backdrop-blur-md border border-white/5 p-4 md:p-10 rounded-sm shadow-xl">
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formattedContent) }}
              />

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <Link
                  href="/blog"
                  className="text-xs text-gray-400 hover:text-white uppercase tracking-widest transition-colors font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
                </Link>
                <ShareButtons title={article.title} />
              </div>
            </div>
          </article>

          {/* Sidebar Recommended Articles (4 columns) */}
          {recommendations && recommendations.length > 0 && (
            <aside className="lg:col-span-4 w-full lg:sticky lg:top-28 space-y-6">
              <div className="bg-black/40 backdrop-blur-md border border-white/5 p-6 rounded-sm shadow-xl">
                <h2 className="font-serif text-xl text-white italic mb-6 border-b border-white/10 pb-3">
                  Rekomendasi Artikel
                </h2>
                <div className="space-y-6">
                  {recommendations.map((rec) => {
                    const recDate = new Date(rec.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                    return (
                      <Link
                        key={rec.slug}
                        href={`/blog/${rec.slug}`}
                        className="group flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0 block"
                      >
                        <div className="aspect-square w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm relative bg-studio-black">
                          <Image
                            src={rec.thumbnail_url || FALLBACK_IMAGE}
                            alt={rec.title}
                            fill
                            sizes="100px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[8px] text-studio-gold uppercase tracking-widest font-bold mb-1">
                            {recDate}
                          </span>
                          <h3 className="font-serif text-sm text-white group-hover:text-studio-gold transition-colors leading-snug line-clamp-2 mb-2 italic">
                            {rec.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  </>
  );
}
