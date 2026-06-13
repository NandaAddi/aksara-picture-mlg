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
    <div className="fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes premiumPulse {
          0% {
            transform: scale(0.95);
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.15));
            opacity: 0.8;
          }
          100% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.6));
            opacity: 1;
          }
        }
        .animate-pulse-premium {
          animation: premiumPulse 1.5s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Premium Dark Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(20,20,20,0.8)_0%,_#000000_80%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsating Logo SVG */}
        <div className="w-[180px] h-[72px] mb-8 flex items-center justify-center animate-pulse-premium transition-transform">
          <img 
            src="/assets/img/preloader.svg" 
            alt="Aksara Picture Preloader Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-2">
          {/* Status text */}
          <p 
            className={`text-[9px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${
              isError ? 'text-red-500' : statusText === 'Redirecting...' ? 'text-studio-gold' : 'text-gray-400'
            }`}
          >
            {statusText}
          </p>

          {/* Thin premium loading line */}
          <div className="w-[140px] h-[1px] bg-white/10 overflow-hidden">
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
      
      <div className="absolute bottom-8 text-[9px] text-white/30 tracking-[0.3em] uppercase">
        Secure Redirect
      </div>
    </div>
  );
}
