'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { Article } from '@/lib/supabase';

const FALLBACK_IMAGE = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%27http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg%27 width%3D%27800%27 height%3D%27600%27 viewBox%3D%270 0 800 600%27%3E%3Crect width%3D%27100%25%27 height%3D%27100%25%27 fill%3D%27%23111%27%2F%3E%3C%2Fsvg%3E';

interface BlogClientProps {
  articles: Article[];
}

export default function BlogClient({ articles }: BlogClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const listItems = containerRef.current?.querySelectorAll('.article-card-link');
    if (listItems && listItems.length > 0) {
      gsap.from(listItems, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 px-6 md:px-12 pb-32 pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 mt-10">
          <span className="text-xs text-studio-gold tracking-widest uppercase mb-2 block font-bold drop-shadow-md">
            Stories & Tips
          </span>
          <h1 className="font-serif text-5xl md:text-6xl italic drop-shadow-md text-white">
            Aksara Journal
          </h1>
          <p className="text-gray-400 font-sans text-sm mt-4 font-medium max-w-2xl mx-auto">
            Temukan inspirasi, tips pose, dan cerita di balik layar setiap momen yang kami abadikan.
          </p>
        </div>

        {articles.length > 0 ? (
          <div id="article-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const date = article.formatted_date || '';
              const thumbnail = article.thumbnail_url || FALLBACK_IMAGE;

              return (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="article-card-link group block h-full"
                >
                  <article className="bg-black/40 backdrop-blur-sm border border-white/10 h-full hover:border-studio-gold transition-all duration-300 flex flex-col rounded-sm overflow-hidden shadow-lg relative group-hover:-translate-y-1">
                    <div className="aspect-video w-full overflow-hidden relative border-b border-white/5 bg-studio-black">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all z-10" />
                      <Image
                        src={thumbnail}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transform transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow relative z-20">
                      <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                        <span>{date}</span>
                        <span className="w-1 h-1 bg-studio-gold rounded-full" />
                        <span className="text-studio-gold">Tips</span>
                      </div>

                      <h3 className="font-serif text-xl italic text-white mb-3 group-hover:text-studio-gold transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 font-sans font-medium flex-grow">
                        {article.excerpt || 'Klik untuk membaca selengkapnya artikel ini...'}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/10 w-full">
                        <span className="text-xs text-white uppercase tracking-widest font-bold group-hover:text-studio-gold transition-colors inline-flex items-center gap-2">
                          Read Story{' '}
                          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            Belum ada artikel yang dipublish.
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-xs text-gray-500 font-sans uppercase tracking-widest font-medium">
            End of Journal
          </p>
        </div>
      </div>
    </div>
  );
}
