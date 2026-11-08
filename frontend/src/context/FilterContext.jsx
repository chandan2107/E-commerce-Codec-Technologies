import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  // Parse initial state from URL search params
  const getInitialParams = () => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      category: params.get('category') || '',
      brand: params.get('brand') ? params.get('brand').split(',') : [],
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : '',
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : '',
      minRating: params.get('minRating') ? Number(params.get('minRating')) : 0,
      inStock: params.get('inStock') === 'true',
      sort: params.get('sort') || 'newest',
      page: params.get('page') ? Number(params.get('page')) : 1,
      limit: 12
    };
  };

  const initial = getInitialParams();

  const [search, setSearch] = useState(initial.search);
  const [category, setCategory] = useState(initial.category);
  const [selectedBrands, setSelectedBrands] = useState(initial.brand);
  const [minPrice, setMinPrice] = useState(initial.minPrice);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice);
  const [minRating, setMinRating] = useState(initial.minRating);
  const [inStockOnly, setInStockOnly] = useState(initial.inStock);
  const [sort, setSort] = useState(initial.sort);
  const [page, setPage] = useState(initial.page);
  const [limit] = useState(12);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state to URL params cleanly
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','));
    if (minPrice !== '') params.set('minPrice', minPrice);
    if (maxPrice !== '') params.set('maxPrice', maxPrice);
    if (minRating > 0) params.set('minRating', minRating);
    if (inStockOnly) params.set('inStock', 'true');
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (page > 1) params.set('page', page);

    const queryStr = params.toString();
    const newRelativePathQuery = window.location.pathname + (queryStr ? `?${queryStr}` : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  }, [search, category, selectedBrands, minPrice, maxPrice, minRating, inStockOnly, sort, page]);

  const toggleBrand = useCallback((brandName) => {
    setSelectedBrands((prev) => {
      const exists = prev.includes(brandName);
      const next = exists ? prev.filter((b) => b !== brandName) : [...prev, brandName];
      setPage(1);
      return next;
    });
  }, []);

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory((prev) => (prev === newCategory ? '' : newCategory));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setInStockOnly(false);
    setSort('newest');
    setPage(1);
  }, []);

  const hasActiveFilters = Boolean(
    search ||
    category ||
    selectedBrands.length > 0 ||
    minPrice !== '' ||
    maxPrice !== '' ||
    minRating > 0 ||
    inStockOnly
  );

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory: handleCategoryChange,
        selectedBrands,
        toggleBrand,
        setSelectedBrands,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        minRating,
        setMinRating,
        inStockOnly,
        setInStockOnly,
        sort,
        setSort,
        page,
        setPage,
        limit,
        viewMode,
        setViewMode,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        resetFilters,
        hasActiveFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

