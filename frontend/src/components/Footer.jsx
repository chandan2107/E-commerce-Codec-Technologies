import React from 'react';
import { Database, Server, Cpu, Layers, GitBranch, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Architecture */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded bg-stone-100 text-stone-950 font-bold flex items-center justify-center text-xs tracking-tighter">
                AT
              </span>
              <span className="font-semibold tracking-wider text-sm text-stone-100 uppercase font-mono">
                ATELIER // CATALOG ENGINE
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              Engineered with Node.js, Express, and MongoDB. Designed for sub-50ms catalog lookups using compound indexing, materialized path category modeling, and faceted aggregation pipelines.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                Compound Indexes: 20
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                Full-Text Search (Weighted)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                Materialized Path Hierarchy
              </span>
            </div>
          </div>

          {/* Col 2: RESTful Endpoints */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 font-mono mb-3">
              Core REST Endpoints
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400 font-mono">
              <li>
                <span className="text-emerald-400">GET</span> /api/v1/products
              </li>
              <li>
                <span className="text-emerald-400">GET</span> /api/v1/products/facets
              </li>
              <li>
                <span className="text-emerald-400">GET</span> /api/v1/products/:idOrSlug
              </li>
              <li>
                <span className="text-emerald-400">GET</span> /api/v1/categories?tree=true
              </li>
              <li>
                <span className="text-emerald-400">GET</span> /api/v1/health
              </li>
            </ul>
          </div>

          {/* Col 3: Stack & Verification */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 font-mono mb-3">
              Design & Architecture
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-stone-400" />
                <span>MongoDB 7.0 + Mongoose 9</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Server className="w-3.5 h-3.5 text-stone-400" />
                <span>Express 5 Modular Services</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-stone-400" />
                <span>React 19 + Tailwind v4 + Vite</span>
              </li>
              <li className="pt-2">
                
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ATELIER E-Commerce Product Catalog. Built for Codec Technologies.</p>
          <p className="font-mono">Scalable Backend Design • Production-Ready Architecture</p>
        </div>
      </div>
    </footer>
  );
}

