import React, { useState } from 'react';
import { Filter, X, RotateCcw, Check, Star, DollarSign, Tag, CheckSquare, Square } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

export default function FilterSidebar({ facets = {} }) {
  const {
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
    setPage,
    isMobileFilterOpen,
    setIsMobileFilterOpen
  } = useFilters();

  const [brandSearch, setBrandSearch] = useState('');
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const brands = facets.brands || [];
  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const applyPrice = (e) => {
    e.preventDefault();
    setMinPrice(localMin);
    setMaxPrice(localMax);
    setPage(1);
  };

  const handleRatingSelect = (rating) => {
    setMinRating((prev) => (prev === rating ? 0 : rating));
    setPage(1);
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-stone-700" />
          <h3 className="font-semibold text-sm tracking-wide text-stone-900 uppercase font-mono">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 font-mono">
          Availability
        </h4>
        <label className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer transition-colors">
          <div className="flex items-center space-x-2.5">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked);
                setPage(1);
              }}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
            <span className="text-xs font-medium text-stone-800">In Stock Only</span>
          </div>
          {facets.availability && (
            <span className="text-[11px] font-mono text-stone-400">
              {facets.availability.inStock}
            </span>
          )}
        </label>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 font-mono">
          Price Range ($)
        </h4>
        <form onSubmit={applyPrice} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-stone-400 uppercase font-mono mb-1">
                Min ($)
              </label>
              <input
                type="number"
                placeholder={facets.priceRange?.min?.toString() || '0'}
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
                min="0"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <div>
              <label className="block text-[10px] text-stone-400 uppercase font-mono mb-1">
                Max ($)
              </label>
              <input
                type="number"
                placeholder={facets.priceRange?.max?.toString() || '6000'}
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
                min="0"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-md text-xs font-medium transition-colors"
          >
            Apply Price
          </button>
        </form>
      </div>

      {/* Brands Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
            Brands ({brands.length})
          </h4>
        </div>

        {brands.length > 6 && (
          <input
            type="text"
            placeholder="Search brand..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full mb-2.5 px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
        )}

        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {filteredBrands.map((b) => {
            const isSelected = selectedBrands.includes(b.name);
            return (
              <label
                key={b.name}
                onClick={() => toggleBrand(b.name)}
                className={`flex items-center justify-between p-1.5 rounded text-xs cursor-pointer select-none transition-colors ${
                  isSelected ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                      isSelected
                        ? 'bg-amber-400 border-amber-400 text-stone-950 font-bold'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span className="truncate">{b.name}</span>
                </div>
                <span
                  className={`text-[10px] font-mono ${
                    isSelected ? 'text-stone-300' : 'text-stone-400'
                  }`}
                >
                  {b.count}
                </span>
              </label>
            );
          })}
          {filteredBrands.length === 0 && (
            <p className="text-xs text-stone-400 italic py-2">No brand matches</p>
          )}
        </div>
      </div>

      {/* Customer Ratings */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 font-mono">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5].map((rating) => {
            const isSelected = minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingSelect(rating)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-stone-900 text-white font-medium'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(rating)
                            ? 'fill-amber-400 text-amber-400'
                            : i < rating
                            ? 'fill-amber-400/50 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1">{rating} & above</span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-stone-50/70 p-5 rounded-xl border border-stone-200/80 self-start sticky top-24">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white p-6 shadow-2xl overflow-y-auto">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
