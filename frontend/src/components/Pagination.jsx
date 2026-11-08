import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

export default function Pagination({ pagination = {} }) {
  const { page, setPage } = useFilters();
  const { totalPages = 1, totalProducts = 0, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Generate page array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-between border-t border-stone-200 px-4 py-4 sm:px-0 mt-8">
      {/* Previous button */}
      <div className="flex w-0 flex-1">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrevPage}
          className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
            hasPrevPage
              ? 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              : 'border-transparent text-stone-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
      </div>

      {/* Numbered buttons */}
      <div className="hidden sm:flex items-center space-x-1">
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-3 py-2 text-xs font-mono text-stone-400">
                ...
              </span>
            );
          }
          const isCurrent = p === page;
          return (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`w-9 h-9 rounded-lg font-mono text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-stone-900 text-stone-50 font-bold shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <div className="flex w-0 flex-1 justify-end">
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
            hasNextPage
              ? 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              : 'border-transparent text-stone-300 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}

