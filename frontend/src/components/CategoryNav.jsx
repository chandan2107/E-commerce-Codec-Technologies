import React from 'react';
import { Layers, ChevronRight, Headphones, Keyboard, Camera, Armchair, Lamp, Watch, Briefcase } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

const ICON_MAP = {
  Headphones,
  Keyboard,
  Camera,
  Armchair,
  Lamp,
  Watch,
  Briefcase
};

export default function CategoryNav({ categories = [], facetCounts = [] }) {
  const { category: activeCategory, setCategory } = useFilters();

  // Helper to get product count for a category slug
  const getCount = (slug) => {
    const item = facetCounts.find((f) => f.slug === slug);
    return item ? item.count : null;
  };

  return (
    <div className="bg-stone-50 border-b border-stone-200 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
          {/* All Items pill */}
          <button
            onClick={() => setCategory('')}
            className={`shrink-0 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === ''
                ? 'bg-stone-900 text-stone-50 shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Catalog</span>
          </button>

          {/* Root and Subcategory items */}
          {categories.map((root) => {
            const isRootActive = activeCategory === root.slug;
            const rootCount = getCount(root.slug);

            return (
              <React.Fragment key={root._id}>
                {/* Root Category */}
                <button
                  onClick={() => setCategory(root.slug)}
                  className={`shrink-0 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isRootActive
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <span>{root.name}</span>
                  {rootCount !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isRootActive ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {rootCount}
                    </span>
                  )}
                </button>

                {/* Subcategories (if any) */}
                {root.children?.map((sub) => {
                  const isSubActive = activeCategory === sub.slug;
                  const subCount = getCount(sub.slug);
                  const Icon = ICON_MAP[sub.icon] || Layers;

                  return (
                    <button
                      key={sub._id}
                      onClick={() => setCategory(sub.slug)}
                      className={`shrink-0 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                        isSubActive
                          ? 'bg-stone-900 text-stone-50 font-medium shadow-xs'
                          : 'bg-stone-100/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-transparent hover:border-stone-200'
                      }`}
                    >
                      <Icon className="w-3 h-3 text-stone-400" />
                      <span>{sub.name}</span>
                      {subCount !== null && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isSubActive ? 'bg-stone-700 text-stone-200' : 'bg-stone-200/80 text-stone-600'
                          }`}
                        >
                          {subCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
