import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeedProduct } from '../types';
import { ArrowUpRight, Calendar, Package, Sprout } from 'lucide-react';

interface ProductCardProps {
  product: SeedProduct;
  onQuickBook?: (product: SeedProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickBook }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="bg-white border border-[#E1E5DC] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:border-[#214B35]/40 hover:shadow-sm group">
      
      {/* Product Image Slot with Resilient Fallback Container */}
      <div className="relative aspect-[4/3] bg-[#E1E5DC]/40 overflow-hidden">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={`${product.name} agricultural crop showcase`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F6F0] p-6 text-center text-[#6B736B]">
            <Sprout className="w-10 h-10 text-[#527A49] mb-2" />
            <span className="text-xs font-semibold text-[#252A26]">{product.category} Seed Variety</span>
            <span className="text-[11px] text-[#6B736B]">Adda 24/WB Quality Conditioned</span>
          </div>
        )}

        {/* Demo Indicator (Quiet unboxed badge in corner) */}
        {product.isDemonstration && (
          <div className="absolute top-3 left-3 bg-[#252A26]/80 text-[#F7F6F0] text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-medium">
            Demo Catalog Record
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B736B] mb-2">
            <span className="font-semibold text-[#214B35]">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.recommendedSeason}</span>
            <span aria-hidden="true">·</span>
            <span>{product.packagingOptions[0]?.unit || 'Standard Sack'}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-bold text-[#252A26] group-hover:text-[#214B35] transition-colors leading-snug mb-2 font-['Manrope']">
            <Link to={`/catalog/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          {/* Factual Overview */}
          <p className="text-xs text-[#6B736B] leading-relaxed line-clamp-3 mb-4">
            {product.overview}
          </p>

          {/* Technical Specs List */}
          <div className="border-t border-[#E1E5DC]/80 pt-3 space-y-1.5 text-xs text-[#252A26] mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[#6B736B] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#527A49]" />
                Sowing Window
              </span>
              <span className="font-medium text-right text-[11px]">{product.sowingWindow}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B736B] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#527A49]" />
                Seed Rate
              </span>
              <span className="font-medium text-[11px]">{product.seedRatePerAcre}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#E1E5DC] flex items-center gap-2">
          <Link
            to={`/catalog/${product.id}`}
            className="flex-1 py-2 px-3 text-xs font-semibold text-center text-[#214B35] bg-[#F7F6F0] hover:bg-[#E1E5DC] rounded-lg transition-colors"
          >
            Product Specs
          </Link>
          {onQuickBook ? (
            <button
              onClick={() => onQuickBook(product)}
              className="flex-1 py-2 px-3 text-xs font-semibold text-center text-white bg-[#214B35] hover:bg-[#1a3b2a] rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Book Stock</span>
              <ArrowUpRight className="w-3 h-3 text-[#C6A15B]" />
            </button>
          ) : (
            <Link
              to={`/dealer?product=${product.id}`}
              className="flex-1 py-2 px-3 text-xs font-semibold text-center text-white bg-[#214B35] hover:bg-[#1a3b2a] rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Book Stock</span>
              <ArrowUpRight className="w-3 h-3 text-[#C6A15B]" />
            </Link>
          )}
        </div>

      </div>
    </article>
  );
};
