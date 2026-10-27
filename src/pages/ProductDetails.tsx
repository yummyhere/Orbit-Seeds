import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEED_PRODUCTS } from '../data/seedProducts';
import { ArrowLeft, ArrowUpRight, Calendar, Package, Check, Phone, MessageSquare, Sprout, ShieldAlert } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = SEED_PRODUCTS.find((p) => p.id === id);

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#214B35]">Seed Variety Not Found</h2>
        <p className="text-sm text-[#6B736B]">The requested variety record could not be located in the catalog database.</p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#214B35] rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Seed Catalog</span>
        </Link>
      </div>
    );
  }

  const selectedPack = product.packagingOptions[selectedPackIndex] || product.packagingOptions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B736B]">
        <Link to="/" className="hover:text-[#214B35]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/catalog" className="hover:text-[#214B35]">Seed Catalog</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#214B35] font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Visual Asset & Packaging */}
        <div className="lg:col-span-5 space-y-6">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E1E5DC] bg-white relative shadow-xs">
            {!imageError && product.image ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F6F0] p-8 text-center text-[#6B736B]">
                <Sprout className="w-12 h-12 text-[#527A49] mb-3" />
                <span className="text-sm font-semibold text-[#252A26]">{product.category} Seed</span>
                <span className="text-xs text-[#6B736B]">Orbit Seeds Conditioning Facility, Vehari</span>
              </div>
            )}

            {product.isDemonstration && (
              <div className="absolute top-4 left-4 bg-[#252A26]/85 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-xs font-medium">
                Prototype Catalog Entry
              </div>
            )}
          </div>

          {/* Packaging Configurations */}
          <div className="bg-white border border-[#E1E5DC] rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#214B35] uppercase tracking-wider">
              Available Packaging Units
            </h3>
            <div className="space-y-2">
              {product.packagingOptions.map((pack, idx) => (
                <button
                  key={pack.unit}
                  onClick={() => setSelectedPackIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-center justify-between ${
                    selectedPackIndex === idx
                      ? 'border-[#214B35] bg-[#F7F6F0] ring-1 ring-[#214B35]'
                      : 'border-[#E1E5DC] hover:border-[#214B35]/40 bg-white'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#252A26]">{pack.unit}</div>
                    <div className="text-[11px] text-[#6B736B]">{pack.description}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-medium text-[#214B35]">{pack.weightKg} kg</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#6B736B] pt-1">
              * Packaging weights follow Punjab agricultural seed distribution regulations.
            </p>
          </div>

          {/* Quick Direct Dealer Contact */}
          <div className="bg-[#214B35] text-white rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
              Immediate Dealer Allocation
            </h4>
            <p className="text-xs text-[#F7F6F0]/80">
              For volume allocations, freight logistics to Khanewal, Multan, or Vehari, contact our sales desk directly.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <a
                href="tel:+923107733113"
                className="flex-1 py-2 px-3 text-center bg-white text-[#214B35] rounded text-xs font-semibold hover:bg-[#F7F6F0]"
              >
                Call +92 310 7733113
              </a>
              <a
                href="https://wa.me/923107733113"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-[#527A49] text-white rounded text-xs font-semibold hover:bg-[#43643c] flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Variety Profile & Agronomic Guidance */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#6B736B]">
              <span className="font-semibold text-[#214B35]">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.recommendedSeason}</span>
              <span aria-hidden="true">·</span>
              <span>{product.varietyDesignation}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#214B35] font-['Manrope']">
              {product.name}
            </h1>
            <p className="text-sm text-[#6B736B] leading-relaxed pt-1">
              {product.overview}
            </p>
          </div>

          {/* Key Agronomic Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#6B736B]">
                <Calendar className="w-4 h-4 text-[#527A49]" />
                <span className="font-semibold text-[#252A26]">Recommended Sowing Window</span>
              </div>
              <div className="text-sm font-bold text-[#214B35] pl-6 font-['Manrope']">
                {product.sowingWindow}
              </div>
            </div>

            <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#6B736B]">
                <Package className="w-4 h-4 text-[#527A49]" />
                <span className="font-semibold text-[#252A26]">Standard Seed Rate</span>
              </div>
              <div className="text-sm font-bold text-[#214B35] pl-6 font-['Manrope']">
                {product.seedRatePerAcre}
              </div>
            </div>
          </div>

          {/* Technical Attributes Checklist */}
          <div className="bg-white border border-[#E1E5DC] rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#214B35] uppercase tracking-wider font-['Manrope']">
              Seed Lot Characteristics & Handling
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {product.characteristics.map((c, i) => (
                <div key={i} className="border-b border-[#E1E5DC]/60 pb-2.5">
                  <span className="text-[#6B736B] block text-[11px] mb-0.5">{c.label}</span>
                  <span className="font-semibold text-[#252A26]">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sowing & Field Recommendations */}
          <div className="bg-[#F7F6F0] border border-[#E1E5DC] rounded-xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-[#214B35] font-['Manrope']">
              Field Preparation & Regional Suitability
            </h3>
            <p className="text-xs text-[#6B736B] leading-relaxed">
              Conditioned at the Orbit Seeds plant on Khanewal Road, Vehari. We advise using laser-leveled fields with appropriate seedbed tilth. Ensure pre-sowing irrigation (Rauni) allows deep moisture penetration for rapid taproot elongation.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate(`/dealer?product=${product.id}&unit=${encodeURIComponent(selectedPack.unit)}`)}
              className="px-6 py-3 bg-[#214B35] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#1a3b2a] flex items-center gap-2 shadow-xs transition-colors"
            >
              <Package className="w-4 h-4 text-[#C6A15B]" />
              <span>Book in Dealer Application ({selectedPack.unit})</span>
            </button>

            <Link
              to="/contact"
              className="px-5 py-3 bg-white text-[#214B35] border border-[#E1E5DC] text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#F7F6F0] transition-colors"
            >
              Send Enquiry About This Variety
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
