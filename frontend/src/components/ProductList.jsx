import React, { useState } from 'react';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';

export default function ProductList({ products = [], onQuickView, onAddToCart }) {
  const [addedIds, setAddedIds] = useState(new Set());

  const handleAdd = (product) => {
    if (onAddToCart) onAddToCart(product);
    setAddedIds((prev) => new Set(prev).add(product._id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product._id);
        return next;
      });
    }, 1600);
  };

  return (
    <div className="space-y-3">
      {products.map((product) => {
        const primaryImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
        const isAdded = addedIds.has(product._id);
        const isOutOfStock = product.inventory?.stockQuantity === 0 || !product.inventory?.isAvailable;

        return (
          <div
            key={product._id}
            className="group bg-white rounded-xl border border-stone-200/90 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-stone-300 transition-all"
          >
            {/* Image + info */}
            <div className="flex items-center space-x-4">
              <div
                onClick={() => onQuickView(product)}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0 cursor-pointer"
              >
                <img
                  src={primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-0.5">
                  <span className="font-semibold text-stone-600">{product.brand}</span>
                  <span>•</span>
                  <span>{product.category?.name}</span>
                </div>

                <h3
                  onClick={() => onQuickView(product)}
                  className="text-sm font-semibold text-stone-900 hover:text-stone-600 cursor-pointer transition-colors"
                >
                  {product.name}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                  {product.shortDescription || product.description}
                </p>

                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.ratings?.average || 0)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-stone-600">
                    {product.ratings?.average?.toFixed(1) || '5.0'}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    ({product.ratings?.count || 0})
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 gap-3">
              <div className="text-right">
                <span className="text-lg font-bold font-mono text-stone-950">
                  ${product.price?.toLocaleString()}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="block text-xs font-mono text-stone-400 line-through">
                    ${product.compareAtPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onQuickView(product)}
                  className="p-2 border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
                  title="Quick view"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleAdd(product)}
                  disabled={isOutOfStock}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : isOutOfStock
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-50'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
