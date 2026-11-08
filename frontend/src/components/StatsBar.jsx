import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, Zap } from 'lucide-react';
import { useFilters } from '../context/FilterContext';
import SortDropdown from './SortDropdown';

export default function StatsBar({ total = 0, count = 0, executionTimeMs = 0 }) {
  const { viewMode, setViewMode, setIsMobileFilterOpen } = useFilters();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
      {/* Result statistics & performance indicator */}
      <div className="flex items-center space-x-3 text-xs text-stone-600">
        <span className="font-medium text-stone-900">
          Showing <span className="font-mono">{count}</span> of <span className="font-mono">{total}</span> products
        </span>
        {executionTimeMs > 0 && (
          <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 font-mono text-[11px] border border-stone-200">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>{executionTimeMs}ms (indexed query)</span>
          </span>
        )}
      </div>

      {/* Right controls: Mobile Filter button + Sort + View Mode */}
      <div className="flex items-center space-x-2 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
        {/* Mobile filter button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden inline-flex items-center space-x-1.5 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
          <span>Filters</span>
        </button>

        <div className="flex items-center space-x-2">
          <SortDropdown />

          {/* View Mode Toggle */}
          <div className="hidden sm:inline-flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
