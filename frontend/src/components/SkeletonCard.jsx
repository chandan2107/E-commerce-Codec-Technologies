import React from 'react';

export default function SkeletonCard({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs animate-pulse flex flex-col"
        >
          {/* Image skeleton */}
          <div className="w-full aspect-square bg-stone-200/80" />

          {/* Details skeleton */}
          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-16 h-3 bg-stone-200 rounded" />
              <div className="w-full h-4 bg-stone-200 rounded" />
              <div className="w-3/4 h-3 bg-stone-100 rounded" />
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <div className="w-16 h-5 bg-stone-200 rounded" />
              <div className="w-20 h-7 bg-stone-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
