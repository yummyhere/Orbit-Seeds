import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { URDU_TERMS } from '../data/translations';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    districtTehsil: '',
    cropInterest: 'Cotton Seeds',
    estimatedBags: '50-100 Bags',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.businessName.trim()) {
      newErrors.businessName = 'Business or Farm name is required.';
    }
    if (!form.contactName.trim()) {
      newErrors.contactName = 'Contact person name is required.';
    }
    const cleanPhone = form.phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Valid Pakistani contact number is required (e.g. 0310 7733113).';
    }
    if (!form.districtTehsil.trim()) {
      newErrors.districtTehsil = 'District and Tehsil / Town is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#527A49]">
          <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Vehari, Punjab · Adda 24/WB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#214B35] font-['Manrope'] tracking-tight">
          Contact Orbit Seeds (Pvt.) Ltd.
        </h1>
        <p className="text-base text-[#6B736B] leading-relaxed">
          Get in touch with our team for seed availability, dealership allocations, contract growing opportunities, or facility visits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Verified Contact Information & Map */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white border border-[#E1E5DC] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#214B35] font-['Manrope']">
              Head Office & Seed Facility
            </h3>

            <div className="space-y-4 text-xs text-[#252A26]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#214B35] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Adda 24/WB</div>
                  <div className="text-[#6B736B] leading-relaxed">
                    5 km Khanewal Road, Vehari 61100, Punjab, Pakistan
                  </div>
                  <div className="text-[11px] text-[#C6A15B] mt-1" dir="rtl">
                    {URDU_TERMS.location}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#214B35] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Direct Phone Line</div>
                  <a href="tel:+923107733113" className="text-[#214B35] hover:underline font-mono text-sm font-semibold">
                    +92 310 7733113
                  </a>
                  <div className="text-[11px] text-[#6B736B]">Official company line for dealer inquiries</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#527A49] shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Official WhatsApp Desk</div>
                  <a
                    href="https://wa.me/923107733113"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#527A49] hover:underline font-mono text-sm font-semibold inline-flex items-center gap-1"
                  >
                    <span>+92 310 7733113</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <div className="text-[11px] text-[#6B736B]">Instant seasonal price and bag allocation replies</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E1E5DC]">
              <a
                href="https://maps.google.com/?q=Adda+24/WB,+Khanewal+Road,+Vehari,+Punjab,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#F7F6F0] hover:bg-[#E1E5DC] text-[#214B35] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#E1E5DC]"
              >
                <span>Open in Google Maps / Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A15B]" />
              </a>
            </div>
          </div>

          {/* Social references card */}
          <div className="bg-[#F7F6F0] border border-[#E1E5DC] rounded-xl p-5 space-y-2 text-xs text-[#6B736B]">
            <h4 className="font-bold text-[#214B35] uppercase tracking-wider text-[11px]">
              Verified Digital References
            </h4>
            <p>
              Orbit Seeds Vehari shares updates and agricultural videos with Punjab farming communities via:
            </p>
            <div className="space-y-1.5 pt-1">
              <a
                href="https://www.facebook.com/OrbitSeedsVehari/videos/3590269517926554/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#214B35] hover:underline flex items-center gap-1.5 font-medium"
              >
                <span>Orbit Seeds Vehari Official Facebook Video</span>
                <ArrowUpRight className="w-3 h-3 text-[#C6A15B]" />
              </a>
              <a
                href="https://www.facebook.com/groups/1130849254405877/posts/1879773986180063/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#214B35] hover:underline flex items-center gap-1.5 font-medium"
              >
                <span>Agricultural Community Forum Post Reference</span>
                <ArrowUpRight className="w-3 h-3 text-[#C6A15B]" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Dealer Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E1E5DC] rounded-2xl p-6 sm:p-10 shadow-xs">
            
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 bg-[#214B35] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#C6A15B]" />
                </div>
                <h3 className="text-2xl font-bold text-[#214B35] font-['Manrope']">
                  Enquiry Recorded (Demonstration)
                </h3>
                <p className="text-sm text-[#6B736B] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{form.contactName}</strong> from <strong>{form.businessName}</strong>. Your interest in <strong>{form.cropInterest}</strong> ({form.estimatedBags}) has been logged in this prototype view.
                </p>
                <div className="bg-[#F7F6F0] border border-[#E1E5DC] rounded-xl p-4 max-w-md mx-auto text-xs text-[#6B736B]">
                  <strong className="text-[#252A26] block mb-1">Frontend Prototype Notice:</strong>
                  In live production, enquiries are dispatched directly to our sales coordination office in Vehari. For urgent commercial requirements, please dial <strong>+92 310 7733113</strong> directly.
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({
                        businessName: '',
                        contactName: '',
                        phone: '',
                        districtTehsil: '',
                        cropInterest: 'Cotton Seeds',
                        estimatedBags: '50-100 Bags',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-[#214B35] text-white text-xs font-semibold rounded-lg hover:bg-[#1a3b2a]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#214B35] font-['Manrope']">
                    Dealer & Grower Partnership Enquiry
                  </h3>
                  <p className="text-xs text-[#6B736B] mt-1">
                    Complete the form below to enquire about seed agency dealership, bulk volume delivery, or contract multiplication.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Dealer / Business / Farm Name *
                    </label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      placeholder="e.g. Al-Madina Agri Services"
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] transition-colors ${
                        errors.businessName ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.businessName}
                      </p>
                    )}
                  </div>

                  {/* Contact Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="e.g. Muhammad Tariq"
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] transition-colors ${
                        errors.contactName ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {errors.contactName && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.contactName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 0310 7733113"
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* District / Tehsil */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Location (District & Tehsil) *
                    </label>
                    <input
                      type="text"
                      value={form.districtTehsil}
                      onChange={(e) => setForm({ ...form, districtTehsil: e.target.value })}
                      placeholder="e.g. Vehari, Burewala, Mailsi, Khanewal"
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] transition-colors ${
                        errors.districtTehsil ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {errors.districtTehsil && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.districtTehsil}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Crop Focus */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Primary Crop Focus
                    </label>
                    <select
                      value={form.cropInterest}
                      onChange={(e) => setForm({ ...form, cropInterest: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] focus:border-[#214B35]"
                    >
                      <option value="Cotton Seeds">Cotton Seeds (Kharif)</option>
                      <option value="Wheat Seeds">Wheat Seeds (Rabi)</option>
                      <option value="Hybrid Corn Seeds">Hybrid Corn Seeds (Spring/Autumn)</option>
                      <option value="All Three Crops">Multi-Crop Dealership</option>
                    </select>
                  </div>

                  {/* Volume Requirement */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Estimated Volume Requirement
                    </label>
                    <select
                      value={form.estimatedBags}
                      onChange={(e) => setForm({ ...form, estimatedBags: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] focus:border-[#214B35]"
                    >
                      <option value="Under 50 Bags">Under 50 Bags (Sample / Trial Acreage)</option>
                      <option value="50-100 Bags">50 – 100 Bags (Sub-dealer)</option>
                      <option value="100-500 Bags">100 – 500 Bags (Commercial Dealer)</option>
                      <option value="500+ Bags">500+ Bags (Institutional / Bulk Distribution)</option>
                    </select>
                  </div>
                </div>

                {/* Additional notes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#252A26]">
                    Additional Notes or Delivery Specifications (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Enter any specific requirements regarding sowing dates, delivery terms, or dealership inquiries..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg focus:bg-white text-[#252A26] transition-colors focus:border-[#214B35]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#214B35] hover:bg-[#1a3b2a] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4 text-[#C6A15B]" />
                    <span>Submit Dealer Enquiry</span>
                  </button>
                  <p className="text-[11px] text-[#6B736B] text-center mt-2">
                    * Interactive prototype form. Validates input fields and shows confirmation state locally.
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
