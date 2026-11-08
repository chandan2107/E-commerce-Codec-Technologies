import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

export default function ActiveFilterBadges({ categories = [] }) {
  const {
    search,
    setSearch,
    category,
    setCategory,
    selectedBrands,
    toggleBrand,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    resetFilters,
    hasActiveFilters,
    setPage
  } = useFilters();

  if (!hasActiveFilters) return null;

  // Find category display name
  let categoryName = category;
  if (category) {
    for (const cat of categories) {
      if (cat.slug === category) {
        categoryName = cat.name;
        break;
      }
      const sub = cat.children?.find((c) => c.slug === category);
      if (sub) {
        categoryName = sub.name;
        break;
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 py-2">
      <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mr-1">
        Active Filters:
      </span>

      {/* Search */}
      {search && (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-stone-900 text-stone-100">
          <span>Search: &ldquo;{search}&rdquo;</span>
          <button
            onClick={() => {
              setSearch('');
              setPage(1);
            }}
            className="hover:text-amber-400 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Category */}
      {category && (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-stone-900 text-stone-100">
          <span>Category: {categoryName}</span>
          <button
            onClick={() => {
              setCategory('');
              setPage(1);
            }}
            className="hover:text-amber-400 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Brands */}
      {selectedBrands.map((b) => (
        <span
          key={b}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-stone-800 text-stone-100"
        >
          <span>{b}</span>
          <button onClick={() => toggleBrand(b)} className="hover:text-amber-400 p-0.5">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {/* Price Range */}
      {(minPrice !== '' || maxPrice !== '') && (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-stone-800 text-stone-100">
          <span>
            Price: ${minPrice || '0'} - ${maxPrice || '∞'}
          </span>
          <button
            onClick={() => {
              setMinPrice('');
              setMaxPrice('');
              setPage(1);
            }}
            className="hover:text-amber-400 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Minimum Rating */}
      {minRating > 0 && (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-stone-800 text-stone-100">
          <span>{minRating}★ & above</span>
          <button
            onClick={() => {
              setMinRating(0);
              setPage(1);
            }}
            className="hover:text-amber-400 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* In-Stock Only */}
      {inStockOnly && (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-emerald-950 text-emerald-200 border border-emerald-800">
          <span>In Stock Only</span>
          <button
            onClick={() => {
              setInStockOnly(false);
              setPage(1);
            }}
            className="hover:text-emerald-400 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Clear All */}
      <button
        onClick={resetFilters}
        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors ml-1"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear all</span>
      </button>
    </div>
  );
}
