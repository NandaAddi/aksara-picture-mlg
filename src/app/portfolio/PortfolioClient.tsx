'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Project, ProjectImage } from '@/lib/supabase';
import { useLenis } from 'lenis/react';

interface PortfolioClientProps {
  projects: Project[];
  images: ProjectImage[];
}

const FALLBACK_IMAGE = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%27http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg%27 width%3D%27800%27 height%3D%27600%27 viewBox%3D%270 0 800 600%27%3E%3Crect width%3D%27100%25%27 height%3D%27100%25%27 fill%3D%27%23111%27%2F%3E%3C%2Fsvg%3E';

export default function PortfolioClient({ projects, images }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Get active project details
  const activeProject = projects.find((p) => p.slug === activeProjectSlug);
  const activeProjectImages = activeProject
    ? images.filter((img) => img.project_id === activeProject.id)
    : [];

  // Filtered projects
  const filteredProjects = projects.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Stagger entry animation on mount/filter change
  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll('.portfolio-item-card');
    if (items && items.length > 0) {
      gsap.killTweensOf(items);
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, { dependencies: [selectedCategory, projects], scope: containerRef });

  // Modal animations
  useGSAP(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      const divs = galleryRef.current?.querySelectorAll('.gallery-img-wrapper');
      if (divs && divs.length > 0) {
        gsap.killTweensOf(divs);
        gsap.fromTo(
          divs,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.1, ease: 'power2.out' }
        );
      }
    }
  }, { dependencies: [isModalOpen], scope: modalRef });

  // Handle open/close project modal
  const openProject = (slug: string) => {
    setActiveProjectSlug(slug);
    setIsModalOpen(true);
    if (lenis) lenis.stop();
  };

  const closeProject = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setIsModalOpen(false);
          setActiveProjectSlug(null);
          if (lenis) lenis.start();
        },
      });
    } else {
      setIsModalOpen(false);
      setActiveProjectSlug(null);
      if (lenis) lenis.start();
    }
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Categories
  const categories = ['all', 'graduation', 'wedding', 'others'];

  return (
    <div ref={containerRef} className="relative z-10 px-6 md:px-12 pb-24 pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 mt-10">
          <span className="text-xs text-studio-gold tracking-widest uppercase mb-2 block font-bold drop-shadow-md">
            Selected Works
          </span>
          <h1 className="font-serif text-4xl italic drop-shadow-md text-white">Curated Moments</h1>
          <p className="text-gray-400 font-sans text-xs mt-2 font-medium">
            Click on any image to view the full story.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-sans uppercase tracking-widest border-b pb-1 transition-all font-medium ${
                selectedCategory === cat
                  ? 'text-white border-studio-gold'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {filteredProjects.map((proj) => {
              const thumb = images.find((img) => img.project_id === proj.id);
              const thumbUrl = thumb ? thumb.image_url : FALLBACK_IMAGE;
              const isLandscape = thumb && thumb.aspect_ratio > 1;
              const aspectClass = isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]';

              return (
                <div
                  key={proj.id}
                  onClick={() => openProject(proj.slug)}
                  className={`portfolio-item-card group cursor-pointer relative bg-studio-gray ${aspectClass} overflow-hidden rounded-sm border border-white/5 shadow-md`}
                >
                  <Image
                    src={thumbUrl}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-xs text-studio-gold tracking-widest uppercase mb-2">
                      {proj.category}
                    </span>
                    <span className="font-serif italic text-2xl text-white">
                      {proj.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            Belum ada karya dalam kategori ini.
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-xs text-gray-400 font-sans uppercase tracking-widest font-medium">
            End of selection
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && activeProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[70] bg-black overflow-y-auto"
          data-lenis-prevent
        >
          <button
            onClick={closeProject}
            aria-label="Tutup detail proyek"
            className="fixed top-6 right-6 z-[80] text-white hover:text-studio-gold transition-colors bg-black/50 p-2 rounded-full backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="min-h-screen p-6 md:p-12 pb-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 pt-10">
                <span className="text-xs text-studio-gold tracking-widest uppercase mb-4 block">
                  {activeProject.category}
                </span>
                <h2 className="font-serif text-4xl md:text-6xl italic text-white">
                  {activeProject.title}
                </h2>
              </div>
              
              <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {activeProjectImages.map((img) => {
                  const imgLandscape = img.aspect_ratio > 1;
                  const imgAspectClass = imgLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]';
                  return (
                    <div
                      key={img.id}
                      className={`gallery-img-wrapper w-full ${imgAspectClass} bg-studio-gray overflow-hidden relative rounded-sm border border-white/5 shadow-lg`}
                    >
                      <Image
                        src={img.image_url}
                        alt={activeProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-24">
                <button
                  onClick={closeProject}
                  className="text-xs uppercase tracking-widest text-gray-500 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
