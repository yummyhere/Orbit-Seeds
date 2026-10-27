import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Sprout, CheckCircle2, Shield, ArrowRight, Store } from 'lucide-react';
import { URDU_TERMS } from '../data/translations';
import { TopLeftEdgeAccent, BottomRightEdgeAccent } from '../components/OrganicEdgeAccents';

export const About: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Curated Edge Accents */}
      <TopLeftEdgeAccent className="opacity-75 -top-10 -left-12 hidden lg:block" />
      <BottomRightEdgeAccent className="opacity-75 -bottom-10 -right-8 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative z-10">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#527A49]">
          <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Vehari, Punjab · Adda 24/WB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#214B35] font-['Manrope'] tracking-tight">
          About Orbit Seeds (Pvt.) Ltd.
        </h1>
        <p className="text-base text-[#6B736B] leading-relaxed">
          An agricultural seed enterprise operating from Vehari, Punjab, dedicated to providing dependable seed varieties for cotton, wheat, and hybrid corn growers.
        </p>
        <p className="text-xs text-[#C6A15B] font-medium" dir="rtl">
          {URDU_TERMS.companyName} · {URDU_TERMS.location}
        </p>
      </div>

      {/* Visual & Context Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 text-sm text-[#252A26] leading-relaxed">
          <h2 className="text-2xl font-bold text-[#214B35] font-['Manrope']">
            Rooted in Punjab's Agricultural Heartland
          </h2>
          <p className="text-[#6B736B]">
            Vehari sits at the center of the Lower Bari Doab and Pakpattan canal irrigation commands—one of the most intensive agricultural zones in Pakistan. Here, farmers rely on precision crop timing, robust emergence under searing summer temperatures, and physical seed quality.
          </p>
          <p className="text-[#6B736B]">
            At Orbit Seeds (Pvt.) Ltd., our operations on Khanewal Road focus on the systematic evaluation, cleaning, conditioning, and distribution of high-purity seed stocks. We bridge the gap between crop trials and the commercial farming community through certified contract multiplication.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#E1E5DC] rounded-xl space-y-1">
              <h4 className="font-bold text-[#214B35] text-xs uppercase tracking-wide">
                Seed Conditioning
              </h4>
              <p className="text-xs text-[#6B736B]">
                Mechanical scalping, air-screen cleaning, and gravity grading to remove light debris and unviable kernels.
              </p>
            </div>
            <div className="p-4 bg-white border border-[#E1E5DC] rounded-xl space-y-1">
              <h4 className="font-bold text-[#214B35] text-xs uppercase tracking-wide">
                Contract Multiplication
              </h4>
              <p className="text-xs text-[#6B736B]">
                Collaborative seed production contracts with progressive growers across Vehari, Burewala, and Mailsi.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E1E5DC] shadow-sm">
          <img
            src="/src/assets/images/seed_research_field_1793084849237.jpg"
            alt="Orbit Seeds research and trial fields in Vehari"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-wider">
              Adda 24/WB Facility
            </span>
            <span className="text-xs text-white/90">
              5 km Khanewal Road, Vehari 61100, Punjab, Pakistan
            </span>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-white border border-[#E1E5DC] rounded-2xl p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#527A49]">
            Operational Values
          </span>
          <h3 className="text-2xl font-bold text-[#214B35] font-['Manrope']">
            Our Commitments to Farmers & Dealers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#6B736B]">
          <div className="space-y-2.5 p-5 bg-[#F7F6F0] rounded-xl border border-[#E1E5DC]">
            <CheckCircle2 className="w-5 h-5 text-[#527A49]" />
            <h4 className="text-sm font-bold text-[#252A26]">Physical Purity & Sizing</h4>
            <p className="leading-relaxed">
              Every lot processed through our plant is assessed for mechanical uniformity to promote predictable seed drill meterability and field emergence.
            </p>
          </div>

          <div className="space-y-2.5 p-5 bg-[#F7F6F0] rounded-xl border border-[#E1E5DC]">
            <CheckCircle2 className="w-5 h-5 text-[#527A49]" />
            <h4 className="text-sm font-bold text-[#252A26]">Fair Dealer Partnerships</h4>
            <p className="leading-relaxed">
              We provide transparent allocation terms, reliable delivery schedules, and responsive agronomic guidance to our network of agricultural retailers.
            </p>
          </div>

          <div className="space-y-2.5 p-5 bg-[#F7F6F0] rounded-xl border border-[#E1E5DC]">
            <CheckCircle2 className="w-5 h-5 text-[#527A49]" />
            <h4 className="text-sm font-bold text-[#252A26]">Grower Integrity</h4>
            <p className="leading-relaxed">
              Our contract growers are supported with quality foundation seed, isolation monitoring, and clear settlement timelines upon grain intake.
            </p>
          </div>
        </div>
      </div>

      {/* Location Card & Verification Details */}
      <div className="bg-[#214B35] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">
            Visit Our Operations
          </div>
          <h3 className="text-2xl font-bold font-['Manrope']">
            Orbit Seeds (Pvt.) Ltd. Facility
          </h3>
          <p className="text-xs text-[#F7F6F0]/80 leading-relaxed">
            Adda 24/WB, 5 km Khanewal Road, Vehari 61100, Punjab, Pakistan.
            <br />
            Telephone / Inquiries: +92 310 7733113
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="tel:+923107733113"
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-[#214B35] text-xs font-semibold rounded-lg hover:bg-[#F7F6F0] text-center"
          >
            Call Facility
          </a>
          <a
            href="https://wa.me/923107733113"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#527A49] text-white text-xs font-semibold rounded-lg hover:bg-[#43643c] text-center flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  </div>
  );
};
