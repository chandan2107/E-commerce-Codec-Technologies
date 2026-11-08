import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import ActiveFilterBadges from './components/ActiveFilterBadges';
import StatsBar from './components/StatsBar';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import ProductQuickView from './components/ProductQuickView';
import Footer from './components/Footer';
import { FilterProvider, useFilters } from './context/FilterContext';
import api from './services/api';

function CatalogContent() {
  const {
    search,
    category,
    selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    sort,
    page,
    limit
  } = useFilters();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [facets, setFacets] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  // 1. Initial Categories & Facets load
  useEffect(() => {
    const loadInitialMetadata = async () => {
      try {
        const [catsRes, facetsRes] = await Promise.all([
          api.getCategories(true),
          api.getFacets()
        ]);
        setCategories(catsRes.data || []);
        setFacets(facetsRes.data || {});
      } catch (err) {
        console.error('Error loading metadata:', err);
      }
    };
    loadInitialMetadata();
  }, []);

  // 2. Fetch products whenever filters or pagination change
  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page,
          limit,
          sort
        };

        if (search) params.search = search;
        if (category) params.category = category;
        if (selectedBrands.length > 0) params.brand = selectedBrands.join(',');
        if (minPrice !== '') params.minPrice = minPrice;
        if (maxPrice !== '') params.maxPrice = maxPrice;
        if (minRating > 0) params.minRating = minRating;
        if (inStockOnly) params.inStock = true;

        const res = await api.getProducts(params);

        if (!isCancelled) {
          setProducts(res.data || []);
          setPagination(res.meta?.pagination || {});
          setExecutionTimeMs(res.meta?.executionTimeMs || 0);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setProducts([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [search, category, selectedBrands, minPrice, maxPrice, minRating, inStockOnly, sort, page, limit]);

  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5]">
      <Header cartCount={totalCartCount} />
      <CategoryNav categories={categories} facetCounts={facets.categories || []} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Search bar */}
        <div className="mb-6 max-w-2xl">
          <SearchBar />
        </div>

        {/* Active Filter badges */}
        <ActiveFilterBadges categories={categories} />

        {/* Statistics & Sort View header */}
        <div className="mt-4 mb-6">
          <StatsBar
            total={pagination.totalProducts || 0}
            count={products.length}
            executionTimeMs={executionTimeMs}
          />
        </div>

        {/* Main Content Area: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FilterSidebar facets={facets} />

          <div className="flex-1 w-full min-w-0">
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl text-center">
                <p className="font-medium text-sm mb-1">Failed to load catalog data</p>
                <p className="text-xs text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700"
                >
                  Reload Page
                </button>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  loading={loading}
                  onQuickView={(prod) => setSelectedProduct(prod)}
                  onAddToCart={handleAddToCart}
                />

                <Pagination pagination={pagination} />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <CatalogContent />
    </FilterProvider>
  );
}
