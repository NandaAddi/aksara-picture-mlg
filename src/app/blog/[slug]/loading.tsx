import React from 'react';

export default function BlogDetailLoading() {
  return (
    <div className="relative z-10 pb-24 px-6 md:px-12 pt-10 max-w-[1200px] mx-auto min-h-screen animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Content Skeleton (8 columns) */}
        <div className="lg:col-span-8 w-full space-y-8">
          <header className="space-y-4">
            {/* Badge */}
            <div className="h-8 w-44 bg-white/10 rounded-full" />
            {/* Title lines */}
            <div className="h-10 w-full bg-white/15 rounded-sm" />
            <div className="h-10 w-3/4 bg-white/15 rounded-sm" />
          </header>

          {/* Thumbnail image */}
          <div className="w-full aspect-video bg-white/5 rounded-sm border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
          </div>

          {/* Article Body box */}
          <div className="bg-black/40 border border-white/5 p-6 md:p-10 rounded-sm space-y-6">
            <div className="h-4 w-full bg-white/10 rounded-sm" />
            <div className="h-4 w-full bg-white/10 rounded-sm" />
            <div className="h-4 w-5/6 bg-white/10 rounded-sm" />
            <div className="h-4 w-full bg-white/10 rounded-sm" />
            <div className="h-4 w-4/5 bg-white/10 rounded-sm" />
            
            <div className="h-6 w-1/3 bg-white/15 rounded-sm pt-4" />
            
            <div className="h-4 w-full bg-white/10 rounded-sm" />
            <div className="h-4 w-11/12 bg-white/10 rounded-sm" />
          </div>
        </div>

        {/* Sidebar Recommended Articles Skeleton (4 columns) */}
        <div className="lg:col-span-4 w-full space-y-6">
          <div className="bg-black/40 border border-white/5 p-6 rounded-sm space-y-6">
            <div className="h-6 w-36 bg-white/15 rounded-sm border-b border-white/10 pb-3" />
            
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div className="w-16 h-16 bg-white/5 rounded-sm flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 bg-white/10 rounded-sm" />
                  <div className="h-4 w-full bg-white/15 rounded-sm" />
                  <div className="h-4 w-2/3 bg-white/15 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
