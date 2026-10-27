import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CheckCircle2, Calendar, Sun, Droplets, Layers, ArrowRight } from 'lucide-react';

export const RD: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'Kharif' | 'Rabi' | 'Spring'>('Kharif');

  const seasonalCalendar = {
    Kharif: {
      title: 'Kharif Cropping Cycle (Summer Monsoon)',
      crops: 'Cotton & Autumn Maize',
      period: 'April to October',
      characteristics: [
        'High ambient temperatures exceeding 42°C during early vegetative growth.',
        'Canal water scheduling critical during squaring and flowering stages.',
        'Requires uniform physical seed delinting for smooth mechanical drop through tractor seed drills.',
      ],
      sowingTips: 'Pre-sowing deep irrigation (Rauni) is mandatory. Avoid planting on dry seedbeds under peak midday temperatures.',
    },
    Rabi: {
      title: 'Rabi Cropping Cycle (Winter Grain)',
      crops: 'Wheat & Late Winter Rotations',
      period: 'November to April',
      characteristics: [
        'Optimal temperature for crown root initiation is 18°C–22°C.',
        'Late-sown plots following late cotton picking require higher seed density to offset reduced tillering days.',
        'Seed lots graded on gravity tables to eliminate shriveled or lightweight grains.',
      ],
      sowingTips: 'Ensure uniform drilling depth of 4–5 cm. Seed rate should increase by 10–15% if sowing is delayed past November 25.',
    },
    Spring: {
      title: 'Spring & Autumn Hybrid Maize Cycle',
      crops: 'Spring Corn & Grain Silage',
      period: 'February – March & July – August',
      characteristics: [
        'Spring maize benefits from rapid thermal accumulation during kernel fill.',
        'Autumn maize requires heat-tolerant pollination traits to prevent tassel blast.',
        'Requires precision flat/round seed size grading for uniform pneumatic plate pickup.',
      ],
      sowingTips: 'Ridge planting is strongly recommended for optimized root aeration and efficient furrow irrigation.',
    },
  };

  const currentCycle = seasonalCalendar[activeSeason];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#527A49]">
          <Sprout className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Agricultural Evaluation & Trial Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#214B35] font-['Manrope'] tracking-tight">
          Research & Field Evaluation
        </h1>
        <p className="text-base text-[#6B736B] leading-relaxed">
          Grounded agronomic observation, variety selection, and conditioning practices aligned with the agro-climatic demands of Punjab's canal colonies.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E1E5DC] rounded-xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#214B35]">
            <Sun className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">Thermal Adaptability</h3>
          <p className="text-xs text-[#6B736B] leading-relaxed">
            Screening varieties that exhibit consistent seedling vigor during Southern Punjab's harsh pre-monsoon heat and low humidity.
          </p>
        </div>

        <div className="bg-white border border-[#E1E5DC] rounded-xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#214B35]">
            <Droplets className="w-5 h-5 text-[#527A49]" />
          </div>
          <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">Canal & Tube Well Water</h3>
          <p className="text-xs text-[#6B736B] leading-relaxed">
            Evaluating crop response across mixed irrigation regimens where tubewell water salinity fluctuates between canal turns.
          </p>
        </div>

        <div className="bg-white border border-[#E1E5DC] rounded-xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#214B35]">
            <Layers className="w-5 h-5 text-[#214B35]" />
          </div>
          <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">Seed Lot Uniformity</h3>
          <p className="text-xs text-[#6B736B] leading-relaxed">
            Rigorous mechanical scalping, aspiration, and specific gravity sorting at Adda 24/WB to ensure uniform germination across the field.
          </p>
        </div>
      </div>

      {/* Seasonal Crop Planning Interactive Tool */}
      <div className="bg-white border border-[#E1E5DC] rounded-2xl p-6 sm:p-10 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1E5DC] pb-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#527A49]">
              Regional Calendar
            </span>
            <h3 className="text-2xl font-bold text-[#214B35] font-['Manrope']">
              Seasonal Crop Management Guidelines
            </h3>
          </div>

          {/* Interactive Season Tabs */}
          <div className="flex items-center gap-1 bg-[#F7F6F0] p-1 border border-[#E1E5DC] rounded-lg">
            {(['Kharif', 'Rabi', 'Spring'] as const).map((season) => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeSeason === season
                    ? 'bg-[#214B35] text-white shadow-xs'
                    : 'text-[#6B736B] hover:text-[#252A26]'
                }`}
              >
                {season} Season
              </button>
            ))}
          </div>
        </div>

        {/* Active Cycle Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#6B736B]">
              <Calendar className="w-4 h-4 text-[#527A49]" />
              <span className="font-semibold text-[#252A26]">{currentCycle.period}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C6A15B] font-medium">{currentCycle.crops}</span>
            </div>
            <h4 className="text-xl font-bold text-[#214B35] font-['Manrope']">
              {currentCycle.title}
            </h4>

            <div className="space-y-2.5 pt-2">
              {currentCycle.characteristics.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#6B736B]">
                  <CheckCircle2 className="w-4 h-4 text-[#527A49] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[#252A26]">{point}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#F7F6F0] rounded-xl p-4 border border-[#E1E5DC] text-xs text-[#6B736B] space-y-1 mt-4">
              <span className="font-bold text-[#214B35]">Practical Agronomist Advice:</span>
              <p>{currentCycle.sowingTips}</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-[#214B35] uppercase tracking-wider">
              Relevant Orbit Seeds Varieties
            </h4>
            <p className="text-xs text-[#6B736B]">
              Browse available seed lots conditioned for the {activeSeason} planting season:
            </p>
            <div className="space-y-2 pt-1">
              <Link
                to={`/catalog?category=${activeSeason === 'Kharif' ? 'Cotton' : activeSeason === 'Rabi' ? 'Wheat' : 'Hybrid+Corn'}`}
                className="w-full py-2.5 px-4 bg-white border border-[#E1E5DC] hover:border-[#214B35] text-[#214B35] rounded-lg text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>View {activeSeason} Varieties</span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Grower and Field Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#214B35] text-white rounded-2xl p-8 sm:p-12">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
            Farmer & Dealer Field Demonstrations
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-['Manrope']">
            Participate in Field Walkthroughs
          </h3>
          <p className="text-xs sm:text-sm text-[#F7F6F0]/80 leading-relaxed">
            During peak flowering and harvest windows, Orbit Seeds hosts localized field evaluations for regional dealers and contract farmers at Adda 24/WB to observe crop stand, boll retention, and ear fill firsthand.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <Link
            to="/contact"
            className="px-6 py-3 bg-[#C6A15B] text-[#214B35] hover:bg-[#d4b068] text-xs font-bold rounded-lg text-center transition-colors"
          >
            Inquire About Next Field Day
          </Link>
          <a
            href="tel:+923107733113"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-lg text-center transition-colors"
          >
            Call Technical Team
          </a>
        </div>
      </div>

    </div>
  );
};
