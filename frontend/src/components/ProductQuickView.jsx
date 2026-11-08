import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function ProductQuickView({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', alt: product.name }];

  const discount = product.discountPercentage || 
    (product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null);

  const handleAdd = () => {
    if (onAddToCart) onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-stone-50 flex flex-col justify-between">
              {/* Primary Image View */}
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-stone-200 mb-4 shadow-xs">
                <img
                  src={images[activeImageIndex]?.url}
                  alt={images[activeImageIndex]?.alt || product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-stone-900 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
              <div>
                {/* Brand & SKU */}
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                  <span className="font-semibold text-stone-700">{product.brand}</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-500">
                    SKU: {product.sku}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  {product.name}
                </h2>

                {/* Ratings */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.ratings?.average || 0)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-medium text-stone-800">
                    {product.ratings?.average ? product.ratings.average.toFixed(1) : '5.0'}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({product.ratings?.count || 0} reviews)
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-emerald-600 font-medium">
                    {product.inventory?.stockQuantity} units available
                  </span>
                </div>

                {/* Price block */}
                <div className="flex items-baseline space-x-3 mb-6 pb-4 border-b border-stone-100">
                  <span className="text-2xl font-bold font-mono text-stone-950">
                    ${product.price?.toLocaleString()}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-sm font-mono text-stone-400 line-through">
                      ${product.compareAtPrice?.toLocaleString()}
                    </span>
                  )}
                  {discount && (
                    <span className="px-2 py-0.5 text-xs font-mono font-bold bg-stone-900 text-amber-400 rounded">
                      Save {discount}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono mb-2">
                    Overview
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Table */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono mb-2">
                      Technical Specifications
                    </h4>
                    <div className="bg-stone-50 rounded-lg p-3 text-xs space-y-1.5 border border-stone-200">
                      {product.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-stone-100 pb-1 last:border-b-0 last:pb-0">
                          <span className="text-stone-500">{spec.name}</span>
                          <span className="font-medium text-stone-800 text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center space-x-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-stone-600 hover:text-stone-900 font-mono text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-xs font-medium text-stone-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.inventory?.stockQuantity || 10, q + 1))}
                      className="px-3 py-2 text-stone-600 hover:text-stone-900 font-mono text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                      added
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-98 shadow-sm'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag • ${(product.price * quantity).toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Assurance pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-stone-500 font-medium text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Truck className="w-3 h-3 text-stone-400" />
                    <span>Free Global Courier</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-stone-400" />
                    <span>Authenticity Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <RefreshCw className="w-3 h-3 text-stone-400" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

