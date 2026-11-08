import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useFilters } from '../context/FilterContext';
import useDebounce from '../hooks/useDebounce';

export default function SearchBar() {
  const { search, setSearch, setPage } = useFilters();
  const [localValue, setLocalValue] = useState(search);
  const debouncedValue = useDebounce(localValue, 300);

  // Sync debounced search to context
  useEffect(() => {
    if (debouncedValue !== search) {
      setSearch(debouncedValue);
      setPage(1);
    }
  }, [debouncedValue]);

  // Keep local in sync if search reset externally
  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  const handleClear = () => {
    setLocalValue('');
    setSearch('');
    setPage(1);
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Search products, brands, specifications (e.g. Sony, mechanical, 40MP)..."
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-200 rounded-lg text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 shadow-xs transition-all"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

