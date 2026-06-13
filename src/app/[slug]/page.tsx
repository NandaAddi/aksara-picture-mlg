'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface ShortlinkPageProps {
  params: Promise<{ slug: string }>;
}

export default function ShortlinkPage({ params }: ShortlinkPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  
  const [statusText, setStatusText] = useState('Connecting');
  const [progressWidth, setProgressWidth] = useState('w-0');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Initial progress bar animation
    const timer = setTimeout(() => {
      setProgressWidth('w-[30%]');
    }, 50);

    const resolveRedirect = async () => {
      try {
        setStatusText('Locating...');
        
        const { data, error } = await supabase
          .from('shortlinks')
          .select('original_url, clicks, id')
          .eq('slug', slug)
          .single();

        if (data && data.original_url) {
          setStatusText('Redirecting...');
          setProgressWidth('w-full');

          // Increment clicks in background
          supabase
            .from('shortlinks')
            .update({ clicks: (data.clicks || 0) + 1 })
            .eq('id', data.id)
            .then();

          setTimeout(() => {
            window.location.replace(data.original_url);
          }, 800);
        } else {
          throw new Error('Link not found');
        }
      } catch (err) {
        setIsError(true);
        setStatusText('Link Not Found');
        setProgressWidth('w-full');
        
        setTimeout(() => {
          router.replace('/');
        }, 1500);
      }
    };

    resolveRedirect();

    return () => clearTimeout(timer);
  }, [slug, router]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f3f4f6_0%,_#ffffff_60%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl italic text-charcoal mb-2 tracking-wide font-medium text-black">
          Aksara<span className="text-studio-gold">Picture.</span>
        </h2>
        
        <div className="flex flex-col items-center gap-4 mt-6">
          <p 
            className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${
              isError ? 'text-red-500' : statusText === 'Redirecting...' ? 'text-studio-gold' : 'text-gray-400'
            }`}
          >
            {statusText}
          </p>

          <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              style={{
                width: progressWidth === 'w-full' ? '100%' : progressWidth === 'w-[30%]' ? '30%' : '0%'
              }}
              className={`h-full transition-all duration-700 ease-out ${
                isError ? 'bg-red-500 shadow-none' : 'bg-studio-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
              }`}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-[10px] text-gray-300 tracking-widest uppercase animate-fade-in-up">
        Secure Redirect
      </div>
    </div>
  );
}
