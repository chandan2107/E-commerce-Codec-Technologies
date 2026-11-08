import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'title-asc', label: 'Alphabetical: A-Z' }
];

export default function SortDropdown() {
  const { sort, setSort, setPage } = useFilters();

  const handleChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-select" className="sr-only">
        Sort Products
      </label>
      <div className="flex items-center space-x-1.5 bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs font-medium text-stone-700 shadow-xs hover:border-stone-300">
        <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="text-stone-400 font-normal">Sort:</span>
        <select
          id="sort-select"
          value={sort}
          onChange={handleChange}
          className="bg-transparent border-none text-stone-800 font-medium text-xs focus:ring-0 cursor-pointer pr-1"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
