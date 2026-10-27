import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142C1B] text-white pt-14 pb-8 border-t border-[#142C1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* 1. Brand Logo & Tagline (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display font-bold text-2xl text-white tracking-tight">
                  Orbit Seeds
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#C49A45] uppercase font-semibold">
                  Seed Corporation · Vehari
                </span>
              </div>
            </div>

            <p className="text-[11px] text-white/70 tracking-wider uppercase font-medium pt-1">
              Quality Seeds &nbsp;|&nbsp; Healthy Crops &nbsp;|&nbsp; Prosperous Farmers
            </p>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm pt-1">
              Serving the agricultural communities of Southern Punjab with dependable, research-selected cotton, wheat, and hybrid corn seeds.
            </p>
          </div>

          {/* 2. Contact & Address Details (3 cols) */}
          <div className="md:col-span-3 space-y-4 text-xs text-white/80">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
              <div className="leading-snug">
                <p className="text-white font-medium">Adda 24/WB, 5 km Khanewal Rd</p>
                <p className="text-white/70 text-[11px]">Vehari 61100, Punjab, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
              <div>
                <a href="tel:+923107733113" className="block text-white font-mono hover:underline font-semibold">
                  +92 310 7733113
                </a>
                <span className="text-white/60 text-[11px]">Official Dealer Desk</span>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/923107733113"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#22512D] text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/OrbitSeedsVehari/videos/3590269517926554/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#22512D] text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="Facebook"
              >
                f
              </a>
            </div>
          </div>

          {/* 3. Illustrated Map Card + Visit Us Details (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Illustrated Map Card */}
            <div className="sm:col-span-7 bg-[#F4F4EE] rounded-xl p-2.5 shadow-sm border border-white/10 text-neutral-800 relative overflow-hidden h-[115px] flex flex-col justify-between">
              {/* Subtle vector map graphics */}
              <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 200 100" fill="none">
                <path d="M0 45 Q 60 40, 100 55 T 200 50" stroke="#7E8B7A" strokeWidth="3" />
                <path d="M40 0 L 70 100" stroke="#CBD5C8" strokeWidth="2" />
                <path d="M140 0 L 120 100" stroke="#CBD5C8" strokeWidth="2" />
                <path d="M0 80 Q 80 70, 200 85" stroke="#CBD5C8" strokeWidth="1.5" />
                <circle cx="105" cy="48" r="4" fill="#DC2626" />
                <circle cx="105" cy="48" r="8" stroke="#DC2626" strokeWidth="1" strokeDasharray="2 2" />
              </svg>

              <div className="relative z-10 flex items-start gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0 mt-1" />
                <div>
                  <div className="text-[10px] font-bold text-[#142C1B] leading-tight">Orbit Seeds Corporation</div>
                  <div className="text-[8px] text-neutral-500 font-mono">Adda 24/WB · Khanewal Rd</div>
                </div>
              </div>

              <div className="relative z-10 text-[9px] text-neutral-600 font-medium">
                Vehari 61100, Punjab
              </div>
            </div>

            {/* Visit Us Info Right of Map */}
            <div className="sm:col-span-5 space-y-1.5 text-xs">
              <h4 className="font-semibold text-white text-xs">Visit Us</h4>
              <p className="text-white/70 text-[11px] leading-tight">
                Adda 24/WB, 5 km Khanewal Road, Vehari
              </p>
              <a
                href="https://maps.google.com/?q=Adda+24/WB,+Khanewal+Road,+Vehari,+Punjab,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C49A45] hover:text-white transition-colors pt-0.5"
              >
                <span>Get Directions</span>
                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Quick Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
          <p>© {new Date().getFullYear()} Orbit Seeds (Pvt.) Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/catalog" className="hover:text-white transition-colors">Products</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/rd" className="hover:text-white transition-colors">Why Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
