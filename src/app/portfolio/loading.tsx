import React from 'react';

export default function PortfolioLoading() {
  return (
    <div className="relative z-10 px-6 md:px-12 pb-24 pt-10 max-w-7xl mx-auto min-h-screen">
      {/* Title skeleton */}
      <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-white/20 pb-8 mb-12 animate-pulse">
        <div className="h-10 w-48 bg-white/10 rounded-sm" />
        <div className="h-4 w-32 bg-white/10 rounded-sm mt-4 md:mt-0" />
      </div>

      {/* Category filter buttons skeleton */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-white/10 rounded-full" />
        ))}
      </div>

      {/* Portfolio Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const aspectClass = i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]';
          return (
            <div
              key={i}
              className={`bg-white/5 border border-white/5 ${aspectClass} rounded-sm relative overflow-hidden`}
            >
              {/* Shimmer sweep overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
