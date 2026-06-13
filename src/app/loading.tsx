import React from 'react';

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center">
      <div className="space-y-4 text-center animate-pulse">
        <h2 className="font-serif text-3xl italic text-white drop-shadow-md">Aksara Picture</h2>
        <div className="flex justify-center gap-1.5">
          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
