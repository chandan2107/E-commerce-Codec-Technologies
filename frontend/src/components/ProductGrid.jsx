import React from 'react';
import { PackageX, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductList from './ProductList';
import SkeletonCard from './SkeletonCard';
import { useFilters } from '../context/FilterContext';

export default function ProductGrid({
  products = [],
  loading = false,
  onQuickView,
  onAddToCart
}) {
  const { viewMode, resetFilters, hasActiveFilters } = useFilters();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <SkeletonCard count={6} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200/90 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 mx-auto flex items-center justify-center mb-4">
          <PackageX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-900 mb-1">
          No matching products found
        </h3>
        <p className="text-xs text-stone-500 mb-6 leading-relaxed">
          We couldn&apos;t find any items matching your active search criteria or filters. Try adjusting your price boundaries, removing brand filters, or using broader search terms.
        </p>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg text-xs font-medium transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <ProductList
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

