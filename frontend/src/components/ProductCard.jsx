import React, { useState } from 'react';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const primaryImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1]?.url || primaryImage;
  const currentImage = isHovered && product.images?.length > 1 ? secondaryImage : primaryImage;

  const discount = product.discountPercentage || 
    (product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null);

  const isLowStock = product.inventory?.stockQuantity > 0 && product.inventory?.stockQuantity <= 10;
  const isOutOfStock = product.inventory?.stockQuantity === 0 || !product.inventory?.isAvailable;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      className="group relative bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-stone-100/70 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discount && (
            <span className="px-2 py-0.5 text-[10px] font-bold font-mono tracking-wider bg-stone-900 text-amber-400 rounded-md shadow-xs">
              -{discount}%
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-400 text-stone-950 rounded-md shadow-xs">
              Featured
            </span>
          )}
          {isLowStock && (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200 rounded-md">
              Only {product.inventory.stockQuantity} left
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-stone-200 text-stone-700 rounded-md">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick View Button Hover Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-stone-400 uppercase mb-1">
            <span>{product.brand}</span>
            {product.category?.name && (
              <span className="truncate max-w-[120px] text-stone-400 font-sans normal-case">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-semibold text-stone-900 line-clamp-2 hover:text-stone-600 cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center space-x-1.5 mt-2">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.ratings?.average || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-200 fill-stone-100'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-medium text-stone-700">
              {product.ratings?.average ? product.ratings.average.toFixed(1) : '5.0'}
            </span>
            <span className="text-[11px] text-stone-400">
              ({product.ratings?.count || 0})
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-base font-bold font-mono text-stone-950">
              ${product.price?.toLocaleString()}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs font-mono text-stone-400 line-through">
                ${product.compareAtPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              added
                ? 'bg-emerald-700 text-white'
                : isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-50 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

