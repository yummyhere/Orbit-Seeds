import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEED_PRODUCTS } from '../data/seedProducts';
import { ProductCard } from '../components/ProductCard';
import { filterProducts } from '../utils/seedCalculations';
import { CropCategory, SeedProduct } from '../types';
import { Search, Filter, SlidersHorizontal, ArrowLeft, Store, RefreshCw } from 'lucide-react';
import { MidRightEdgeAccent } from '../components/OrganicEdgeAccents';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');

  const filtered = useMemo(() => {
    let result = filterProducts(SEED_PRODUCTS, searchQuery, selectedCategory, selectedSeason);
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }
    return result;
  }, [searchQuery, selectedCategory, selectedSeason, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSeason('All');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Curated Edge Accent */}
      <MidRightEdgeAccent className="top-12 opacity-80 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10">
      
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#6B736B]">
          <Link to="/" className="hover:text-[#214B35]">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#214B35] font-medium">Seed Catalog</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#214B35] font-['Manrope'] tracking-tight">
              Our Seed Catalog
            </h1>
            <p className="text-sm text-[#6B736B] mt-1 max-w-2xl">
              Conditioned crop seeds developed for the agricultural zones of Punjab. Filter by crop category, sowing window, or search by variety reference.
            </p>
          </div>

          <Link
            to="/dealer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#214B35] text-white hover:bg-[#1a3b2a] rounded-lg text-xs font-semibold whitespace-nowrap self-start md:self-auto"
          >
            <Store className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Open Dealer Booking Portal</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 sm:p-5 space-y-4 shadow-2xs">
        
        {/* Top search & Sort controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-[#6B736B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by variety name, crop, or keywords..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg focus:bg-white text-[#252A26] placeholder-[#6B736B] focus:border-[#214B35] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B736B] hover:text-[#252A26]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Season Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] focus:border-[#214B35]"
              aria-label="Filter by season"
            >
              <option value="All">All Sowing Seasons</option>
              <option value="Kharif">Kharif Season (Summer)</option>
              <option value="Rabi">Rabi Season (Winter)</option>
              <option value="Spring">Spring / Autumn</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
              className="w-full py-2 px-3 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] focus:border-[#214B35]"
              aria-label="Sort products"
            >
              <option value="name">Sort: Name (A-Z)</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>

        </div>

        {/* Category Segmented Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E1E5DC]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-[#6B736B] mr-1 hidden sm:inline">Crop Category:</span>
            {['All', 'Cotton', 'Wheat', 'Hybrid Corn'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#214B35] text-white shadow-xs'
                    : 'bg-[#F7F6F0] text-[#6B736B] hover:text-[#252A26] hover:bg-[#E1E5DC]'
                }`}
              >
                {cat === 'All' ? 'All Crops' : cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#6B736B] flex items-center gap-3">
            <span>Showing <strong className="text-[#214B35] font-mono tabular-nums">{filtered.length}</strong> of {SEED_PRODUCTS.length} varieties</span>
            {(searchQuery || selectedCategory !== 'All' || selectedSeason !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#527A49] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Catalog Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E1E5DC] rounded-xl p-12 text-center max-w-lg mx-auto space-y-4">
          <Filter className="w-10 h-10 text-[#6B736B] mx-auto opacity-40" />
          <h3 className="text-base font-bold text-[#252A26]">No seed varieties match your criteria</h3>
          <p className="text-xs text-[#6B736B]">
            Try adjusting your search terms or resetting the crop category filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#214B35] rounded-lg hover:bg-[#1a3b2a]"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Agricultural Note on Specifications */}
      <div className="bg-[#E1E5DC]/50 rounded-xl p-5 border border-[#E1E5DC] text-xs text-[#6B736B] space-y-1">
        <p className="font-semibold text-[#252A26]">Note for Commercial Dealers & Growers:</p>
        <p>
          Seed performance varies depending on seasonal rainfall, irrigation water availability, soil electrical conductivity (EC), and localized pest pressure. Consult Orbit Seeds agronomists at Adda 24/WB for localized planting recommendations.
        </p>
      </div>

    </div>
  </div>
  );
};
