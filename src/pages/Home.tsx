import React from 'react';
import { Link } from 'react-router-dom';
import { SEED_PRODUCTS } from '../data/seedProducts';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Users,
  Sprout,
  Store,
  Layers,
  Leaf
} from 'lucide-react';
import {
  TopLeftEdgeAccent,
  MidRightEdgeAccent,
  LowerLeftEdgeAccent,
  BottomRightEdgeAccent
} from '../components/OrganicEdgeAccents';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0 pb-0">
      
      {/* 1. HERO SECTION: Exact Reference Composition */}
      <section className="relative bg-[#FBF9F4] overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-[#E2E8DF]/60">
        
        {/* Curated Organic Abstract Blobs & Monstera Edge Accent (Top-Left) */}
        <TopLeftEdgeAccent className="opacity-90 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Kicker & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Three-part Kicker */}
              <div className="text-xs font-semibold tracking-wider uppercase text-[#637064] flex items-center gap-2">
                <span>BETTER SEEDS</span>
                <span className="text-[#C49A45]">|</span>
                <span>HEALTHIER CROPS</span>
                <span className="text-[#C49A45]">|</span>
                <span>BRIGHTER FUTURE</span>
              </div>

              {/* Main Headline in Serif Display */}
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#16361E] tracking-tight leading-[1.12]">
                Quality Seeds <br />
                for a Stronger <br />
                Tomorrow
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#4A544C] leading-relaxed max-w-xl font-normal">
                Orbit Seeds (Pvt.) Ltd. provides high-quality Cotton, Wheat, and Hybrid Corn Seeds to help farmers grow more, earn more, and build a sustainable future.
              </p>

              {/* Buttons: Dark Green Pill + Outline Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#22512D] hover:bg-[#1a3e23] rounded-full shadow-xs transition-colors"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#252E27] border border-[#252E27]/30 hover:border-[#22512D] hover:bg-[#EEF4EE]/50 rounded-full transition-colors"
                >
                  <span>About Us</span>
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>

            </div>

            {/* Right Column: Hero Agricultural Photography with Handwritten Cursive Tag (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] shadow-md border border-[#E2E8DF]">
                <img
                  src="/images/hero_agricultural_field_1793084847501.jpg"
                  alt="Punjab agricultural farmland with crops and canal"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                
                {/* Natural warm vignette on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Handwritten cursive annotation in corner */}
                <div className="absolute bottom-6 right-6 text-right select-none pointer-events-none">
                  <div className="font-handwriting text-3xl sm:text-4xl text-white drop-shadow-md -rotate-6 font-bold tracking-wide">
                    Good Seeds <br />
                    Great Harvests
                  </div>
                </div>
              </div>

              {/* Decorative leaf at bottom right */}
              <div className="absolute -bottom-4 -right-4 opacity-30 pointer-events-none hidden sm:block">
                <svg className="w-14 h-14 text-[#22512D]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION: "OUR PRODUCTS" / "Premium Seeds for Every Season" */}
      <section className="relative bg-white py-20 border-b border-[#E2E8DF]/60 overflow-hidden">
        {/* Curated Organic Edge Accent (Mid-Right) */}
        <MidRightEdgeAccent className="top-8 opacity-85 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header: Subtitle + Serif Title + Right Paragraph */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#637064]">
                OUR PRODUCTS
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#16361E]">
                Premium Seeds for Every Season
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4A544C] max-w-md leading-relaxed">
              We offer a wide range of certified and high-yielding seeds suitable for different soil types and climate conditions across Punjab.
            </p>
          </div>

          {/* 4 Products Cards Grid with Floating Circular Icon Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Cotton Bt Seeds */}
            <div className="bg-[#FBF9F4] rounded-2xl overflow-hidden border border-[#E2E8DF] flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/images/cotton_seed_crop_1793084847344.jpg"
                  alt="Cotton crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Floating circular green badge */}
                <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-full bg-[#22512D] text-white flex items-center justify-center shadow-md">
                  <Sprout className="w-5 h-5 stroke-[2]" />
                </div>
              </div>

              <div className="p-5 pt-7 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#16361E]">
                    Cotton Bt Seeds
                  </h3>
                  <p className="text-xs text-[#637064] leading-relaxed mt-1">
                    High yield, pest resistant and reliable performance in Southern Punjab.
                  </p>
                </div>
                <Link
                  to="/catalog?category=Cotton"
                  className="inline-flex items-center text-xs font-semibold text-[#16361E] hover:text-[#22512D] group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 2. Wheat Seeds */}
            <div className="bg-[#FBF9F4] rounded-2xl overflow-hidden border border-[#E2E8DF] flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/images/wheat_seed_crop_1793084847876.jpg"
                  alt="Wheat crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Floating circular green badge */}
                <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-full bg-[#22512D] text-white flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2v20M10 4v16M14 8v8"/>
                  </svg>
                </div>
              </div>

              <div className="p-5 pt-7 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#16361E]">
                    Wheat Seeds
                  </h3>
                  <p className="text-xs text-[#637064] leading-relaxed mt-1">
                    Better germination, stronger roots, and robust tillering potential.
                  </p>
                </div>
                <Link
                  to="/catalog?category=Wheat"
                  className="inline-flex items-center text-xs font-semibold text-[#16361E] hover:text-[#22512D] group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 3. Corn Seeds */}
            <div className="bg-[#FBF9F4] rounded-2xl overflow-hidden border border-[#E2E8DF] flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/images/hybrid_corn_crop_1793084849344.jpg"
                  alt="Hybrid corn crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Floating circular green badge */}
                <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-full bg-[#22512D] text-white flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a4 4 0 0 1 4 4c0 7-4 12-4 12S8 13 8 6a4 4 0 0 1 4-4Z"/>
                  </svg>
                </div>
              </div>

              <div className="p-5 pt-7 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#16361E]">
                    Corn Seeds
                  </h3>
                  <p className="text-xs text-[#637064] leading-relaxed mt-1">
                    High productivity, deep orange-yellow kernels, quality harvests.
                  </p>
                </div>
                <Link
                  to="/catalog?category=Hybrid+Corn"
                  className="inline-flex items-center text-xs font-semibold text-[#16361E] hover:text-[#22512D] group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 4. Fodder / Silage Seeds */}
            <div className="bg-[#FBF9F4] rounded-2xl overflow-hidden border border-[#E2E8DF] flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/images/seed_research_field_1793084849237.jpg"
                  alt="Fodder and Silage crops"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Floating circular green badge */}
                <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-full bg-[#22512D] text-white flex items-center justify-center shadow-md">
                  <Leaf className="w-5 h-5 stroke-[2]" />
                </div>
              </div>

              <div className="p-5 pt-7 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#16361E]">
                    Fodder & Silage
                  </h3>
                  <p className="text-xs text-[#637064] leading-relaxed mt-1">
                    Healthy livestock nutrition, prolonged stay-green and high biomass.
                  </p>
                </div>
                <Link
                  to="/catalog"
                  className="inline-flex items-center text-xs font-semibold text-[#16361E] hover:text-[#22512D] group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SECTION: "WHY CHOOSE US" / "Your Trusted Seed Partner" */}
      <section className="relative bg-[#EEF4EE] py-20 border-b border-[#E2E8DF]/60 overflow-hidden">
        {/* Curated Organic Edge Accent (Lower-Left) */}
        <LowerLeftEdgeAccent className="-bottom-8 opacity-80 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Title Area (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#637064]">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#16361E] leading-tight">
                Your Trusted <br />
                Seed Partner
              </h2>
              <p className="text-xs sm:text-sm text-[#4A544C] leading-relaxed pt-2">
                With years of experience and a commitment to quality, we deliver seeds that perform — because farmers' success is our success.
              </p>
            </div>

            {/* Right 4-Column Feature List with Dividers (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x-0 sm:divide-x divide-[#E2E8DF]">
              
              {/* Feature 1 */}
              <div className="space-y-3 sm:px-4 first:pl-0 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#22512D] shadow-xs">
                  <Leaf className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif-display text-sm font-bold text-[#16361E]">
                  High Quality <br className="hidden sm:inline" /> Seeds
                </h3>
                <p className="text-[11px] text-[#637064] leading-relaxed">
                  Certified & tested for best germination.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-3 sm:px-4 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#22512D] shadow-xs">
                  <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif-display text-sm font-bold text-[#16361E]">
                  Pest & Heat <br className="hidden sm:inline" /> Resistance
                </h3>
                <p className="text-[11px] text-[#637064] leading-relaxed">
                  Stronger crops, less field loss in heat.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-3 sm:px-4 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#22512D] shadow-xs">
                  <Truck className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif-display text-sm font-bold text-[#16361E]">
                  Reliable <br className="hidden sm:inline" /> Supply
                </h3>
                <p className="text-[11px] text-[#637064] leading-relaxed">
                  On-time delivery across the Punjab region.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-3 sm:px-4 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#22512D] shadow-xs">
                  <Users className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif-display text-sm font-bold text-[#16361E]">
                  Farmer <br className="hidden sm:inline" /> Support
                </h3>
                <p className="text-[11px] text-[#637064] leading-relaxed">
                  Expert guidance whenever you need.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION: "ABOUT ORBIT SEEDS" / "Rooted in Agriculture, Committed to Farmers" */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* Curated Pre-Footer Bottom-Right Edge Accent */}
        <BottomRightEdgeAccent className="-bottom-8 opacity-80 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Arched Image with "Growing Together" Handwriting Badge (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-t-[120px] rounded-b-xl overflow-hidden bg-[#EEF4EE]">
                <img
                  src="/images/seed_research_field_1793084849237.jpg"
                  alt="Orbit Seeds research and cultivation plots"
                  className="w-full h-full object-cover block"
                />
                
                {/* Natural dark vignette for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Handwritten cursive annotation in corner */}
                <div className="absolute bottom-5 right-6 text-right select-none pointer-events-none z-10">
                  <div className="font-handwriting text-3xl sm:text-4xl text-white drop-shadow-md -rotate-6 font-bold tracking-wide">
                    Growing Together
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#637064]">
                ABOUT ORBIT SEEDS CORPORATION
              </span>

              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#16361E] leading-tight">
                Rooted in Agriculture, <br />
                Committed to Farmers
              </h2>

              <p className="text-sm text-[#4A544C] leading-relaxed font-normal">
                Orbit Seeds (Pvt.) Ltd. has been serving the farming community in Vehari and Southern Punjab with trusted, high-quality seeds for cotton, wheat, and hybrid corn. We believe in sustainable agriculture and the power of dependable seed genetics to create lasting change for generations to come.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#16361E] border border-[#16361E]/40 hover:border-[#22512D] hover:bg-[#EEF4EE]/60 rounded-full transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
