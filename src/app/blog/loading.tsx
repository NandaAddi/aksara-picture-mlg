import React from 'react';

export default function BlogLoading() {
  return (
    <div className="relative z-10 px-6 md:px-12 pb-24 pt-10 max-w-7xl mx-auto min-h-screen">
      {/* Title skeleton */}
      <div className="flex items-baseline justify-between border-b border-white/20 pb-8 mb-12 animate-pulse">
        <div className="h-10 w-40 bg-white/10 rounded-sm" />
        <div className="h-4 w-28 bg-white/10 rounded-sm" />
      </div>

      {/* Blog Cards Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-black/40 border border-white/10 rounded-sm overflow-hidden h-[400px] flex flex-col relative"
          >
            {/* Aspect ratio video for thumbnail image skeleton */}
            <div className="aspect-video w-full bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            </div>
            
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              {/* Date */}
              <div className="h-3 w-20 bg-white/10 rounded-sm" />
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 w-full bg-white/15 rounded-sm" />
                <div className="h-5 w-4/5 bg-white/15 rounded-sm" />
              </div>
              {/* Excerpt */}
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-white/5 rounded-sm" />
                <div className="h-3 w-full bg-white/5 rounded-sm" />
                <div className="h-3 w-2/3 bg-white/5 rounded-sm" />
              </div>
              {/* Link at bottom */}
              <div className="h-4 w-24 bg-white/10 rounded-sm mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
