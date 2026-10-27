import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEED_PRODUCTS } from '../data/seedProducts';
import { BookingCartItem, DealerBookingOrder, CropCategory, SeedProduct } from '../types';
import { calculateBookingTotals, validateDealerBookingForm } from '../utils/seedCalculations';
import {
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Phone,
  MessageSquare,
  ArrowLeft,
  Store,
  Layers,
  ChevronRight,
  Package,
  AlertCircle
} from 'lucide-react';

export const DealerApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedProductId = searchParams.get('product');

  // Navigation tab state: 'catalog' | 'cart' | 'status'
  const [activeTab, setActiveTab] = useState<'catalog' | 'cart' | 'status'>('catalog');
  
  // Search & filter inside dealer catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');

  // Booking Cart state
  const [cart, setCart] = useState<BookingCartItem[]>([
    {
      productId: 'orbit-cotton-01',
      productName: 'Orbit Cotton Selection - Lot C1',
      category: 'Cotton',
      packageUnit: '40 kg bag',
      packageWeightKg: 40,
      quantityBags: 25,
    },
  ]);

  // If query param provided, add/highlight that product
  useEffect(() => {
    if (preselectedProductId) {
      const match = SEED_PRODUCTS.find((p) => p.id === preselectedProductId);
      if (match) {
        setCart((prev) => {
          const exists = prev.find((item) => item.productId === match.id);
          if (exists) return prev;
          const defaultPack = match.packagingOptions[0] || { unit: '40 kg bag', weightKg: 40 };
          return [
            ...prev,
            {
              productId: match.id,
              productName: match.name,
              category: match.category,
              packageUnit: defaultPack.unit,
              packageWeightKg: defaultPack.weightKg,
              quantityBags: 10,
            },
          ];
        });
        setActiveTab('cart');
      }
    }
  }, [preselectedProductId]);

  // Booking Request Form State
  const [formData, setFormData] = useState({
    dealerBusinessName: '',
    contactPerson: '',
    phone: '',
    districtTehsil: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<DealerBookingOrder | null>(null);

  // Sample historical demo bookings
  const [demoOrders, setDemoOrders] = useState<DealerBookingOrder[]>([
    {
      bookingId: 'OSB-2026-4891',
      dealerBusinessName: 'Al-Rehman Zarai Markaz',
      contactPerson: 'Chaudhry Naveed',
      phone: '+92 300 7891234',
      districtTehsil: 'Burewala, Vehari',
      items: [
        {
          productId: 'orbit-cotton-01',
          productName: 'Orbit Cotton Selection - Lot C1',
          category: 'Cotton',
          packageUnit: '40 kg bag',
          packageWeightKg: 40,
          quantityBags: 50,
        },
      ],
      totalBags: 50,
      totalWeightKg: 2000,
      status: 'Confirmed',
      submittedAt: '2026-02-12 11:30 AM',
      notes: 'Scheduled for warehouse dock dispatch on Monday.',
    },
    {
      bookingId: 'OSB-2026-4890',
      dealerBusinessName: 'Mailsi Agri Supply Co.',
      contactPerson: 'Mian Tariq',
      phone: '+92 301 6543210',
      districtTehsil: 'Mailsi, Vehari',
      items: [
        {
          productId: 'orbit-wheat-01',
          productName: 'Orbit Wheat Selection - Lot W1',
          category: 'Wheat',
          packageUnit: '50 kg bag',
          packageWeightKg: 50,
          quantityBags: 30,
        },
      ],
      totalBags: 30,
      totalWeightKg: 1500,
      status: 'Under Review',
      submittedAt: '2026-02-15 04:15 PM',
      notes: 'Stock allocation check in progress at Adda 24/WB.',
    },
  ]);

  // Cart helper functions
  const handleAddToCart = (product: SeedProduct) => {
    const defaultPack = product.packagingOptions[0] || { unit: '40 kg bag', weightKg: 40 };
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantityBags += 10;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          category: product.category,
          packageUnit: defaultPack.unit,
          packageWeightKg: defaultPack.weightKg,
          quantityBags: 20,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const nextQty = Math.max(1, item.quantityBags + delta);
            return { ...item, quantityBags: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantityBags > 0)
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const totals = calculateBookingTotals(cart);

  const handleValidateAndReview = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDealerBookingForm({
      dealerBusinessName: formData.dealerBusinessName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      districtTehsil: formData.districtTehsil,
      items: cart,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setShowReviewModal(true);
  };

  const handleFinalSubmit = () => {
    const newBooking: DealerBookingOrder = {
      bookingId: `OSB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      dealerBusinessName: formData.dealerBusinessName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      districtTehsil: formData.districtTehsil,
      items: [...cart],
      totalBags: totals.totalBags,
      totalWeightKg: totals.totalWeightKg,
      notes: formData.notes,
      status: 'Request Submitted',
      submittedAt: new Date().toLocaleString(),
    };

    setDemoOrders([newBooking, ...demoOrders]);
    setSubmittedBooking(newBooking);
    setShowReviewModal(false);
    setCart([]);
    setActiveTab('status');
  };

  // Filtered seed products for dealer catalog view
  const filteredProducts = SEED_PRODUCTS.filter((p) => {
    const matchesCrop = selectedCrop === 'All' || p.category === selectedCrop;
    const matchesQuery =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesQuery;
  });

  return (
    <div className="bg-[#F7F6F0] min-h-screen pb-20">
      
      {/* 1. Mobile-First Application Header */}
      <header className="sticky top-0 z-30 bg-[#214B35] text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="p-1 -ml-1 text-white/80 hover:text-white"
              title="Return to Corporate Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-base font-bold font-['Manrope'] leading-tight">
                Orbit Dealer Portal
              </div>
              <div className="text-[10px] text-[#C6A15B] font-medium">
                Vehari Booking System (Mobile-First Prototype)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+923107733113"
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/10"
              title="Call Sales Office"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/923107733113"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/10"
              title="WhatsApp Sales Desk"
            >
              <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
            </a>
          </div>
        </div>

        {/* Segmented Navigation Bar for Dealer App */}
        <div className="max-w-4xl mx-auto px-4 pb-2.5 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors ${
              activeTab === 'catalog'
                ? 'bg-white text-[#214B35] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            1. Seed Catalog
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors relative ${
              activeTab === 'cart'
                ? 'bg-white text-[#214B35] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>2. Booking Request</span>
            {cart.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-[#C6A15B] text-[#214B35] rounded-full text-[10px] font-bold">
                {cart.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors ${
              activeTab === 'status'
                ? 'bg-white text-[#214B35] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            3. Order Status ({demoOrders.length})
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-4">
        
        {/* Prototype Transparency Note */}
        <div className="bg-[#E1E5DC]/60 border border-[#E1E5DC] rounded-lg p-2.5 text-[11px] text-[#6B736B] flex items-center justify-between mb-4">
          <span>* Commercial seed allocations and pricing require official confirmation from Adda 24/WB office.</span>
          <span className="font-semibold text-[#214B35]">Demo Portal</span>
        </div>

        {/* TAB 1: CATALOG BROWSING */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            
            {/* Search and Category Filter */}
            <div className="bg-white border border-[#E1E5DC] rounded-xl p-3 space-y-3 shadow-2xs">
              <div className="relative">
                <Search className="w-4 h-4 text-[#6B736B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cotton, wheat, or corn varieties..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] placeholder-[#6B736B] focus:border-[#214B35]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                {['All', 'Cotton', 'Wheat', 'Hybrid Corn'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCrop(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                      selectedCrop === cat
                        ? 'bg-[#214B35] text-white font-semibold'
                        : 'bg-[#F7F6F0] text-[#6B736B] hover:text-[#252A26]'
                    }`}
                  >
                    {cat === 'All' ? 'All Crops' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards for Dealers */}
            <div className="space-y-3">
              {filteredProducts.map((product) => {
                const defaultPack = product.packagingOptions[0] || { unit: '40 kg bag', weightKg: 40 };
                const inCart = cart.find((item) => item.productId === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E1E5DC] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-14 h-14 rounded-lg bg-[#F7F6F0] border border-[#E1E5DC] overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#6B736B]">
                          <span className="font-semibold text-[#214B35]">{product.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{defaultPack.unit}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#252A26] font-['Manrope']">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#6B736B] line-clamp-2">
                          {product.overview}
                        </p>
                        <div className="text-[11px] text-[#527A49] font-medium pt-0.5">
                          Sowing Window: {product.sowingWindow}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E1E5DC]">
                      {inCart ? (
                        <div className="flex items-center gap-2 bg-[#F7F6F0] p-1 rounded-lg border border-[#E1E5DC]">
                          <button
                            onClick={() => updateQuantity(product.id, -5)}
                            className="w-7 h-7 bg-white text-[#252A26] rounded flex items-center justify-center hover:bg-[#E1E5DC]"
                            aria-label="Decrease quantity by 5 bags"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold px-2 tabular-nums">
                            {inCart.quantityBags} bags
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 5)}
                            className="w-7 h-7 bg-[#214B35] text-white rounded flex items-center justify-center hover:bg-[#1a3b2a]"
                            aria-label="Increase quantity by 5 bags"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full sm:w-auto px-4 py-2 bg-[#214B35] text-white text-xs font-semibold rounded-lg hover:bg-[#1a3b2a] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Add to Booking</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Floating Bar when cart has items */}
            {cart.length > 0 && (
              <div className="fixed bottom-3 left-4 right-4 max-w-4xl mx-auto z-20">
                <div className="bg-[#214B35] text-white rounded-xl p-3 sm:p-4 shadow-lg flex items-center justify-between border border-white/20">
                  <div className="text-xs">
                    <span className="text-[#C6A15B] font-bold font-mono tabular-nums">{totals.totalBags} Bags</span>
                    <span className="text-white/80"> ({totals.totalWeightKg.toLocaleString()} kg · {totals.totalMetricTons} tons)</span>
                    <div className="text-[10px] text-white/70">{cart.length} variety selections</div>
                  </div>
                  <button
                    onClick={() => setActiveTab('cart')}
                    className="px-4 py-2 bg-[#C6A15B] text-[#214B35] text-xs font-bold rounded-lg hover:bg-[#d4b068] transition-colors flex items-center gap-1"
                  >
                    <span>Review & Request</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CART & BOOKING REQUEST FORM */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            
            {/* Cart Items List */}
            <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-3">
                <h3 className="text-sm font-bold text-[#214B35] uppercase tracking-wider font-['Manrope']">
                  Selected Seed Lots for Booking
                </h3>
                <span className="text-xs text-[#6B736B]">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <Package className="w-10 h-10 text-[#6B736B] mx-auto opacity-40" />
                  <p className="text-xs text-[#6B736B]">Your booking list is currently empty.</p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="px-4 py-2 bg-[#214B35] text-white rounded-lg text-xs font-semibold"
                  >
                    Browse Seed Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-[#E1E5DC]">
                  {cart.map((item) => (
                    <div key={item.productId} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-semibold text-[#527A49]">{item.category}</span>
                        <div className="text-sm font-bold text-[#252A26]">{item.productName}</div>
                        <div className="text-xs text-[#6B736B]">
                          Packing: {item.packageUnit} ({item.packageWeightKg} kg/bag)
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center gap-2 bg-[#F7F6F0] p-1 rounded-lg border border-[#E1E5DC]">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="w-7 h-7 bg-white text-[#252A26] rounded flex items-center justify-center hover:bg-[#E1E5DC]"
                            aria-label={`Decrease quantity of ${item.productName}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold px-2 tabular-nums">
                            {item.quantityBags} bags
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="w-7 h-7 bg-[#214B35] text-white rounded flex items-center justify-center hover:bg-[#1a3b2a]"
                            aria-label={`Increase quantity of ${item.productName}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <div className="text-xs font-mono font-semibold text-[#214B35] tabular-nums">
                            {(item.quantityBags * item.packageWeightKg).toLocaleString()} kg
                          </div>
                          <div className="text-[10px] text-[#6B736B]">
                            {((item.quantityBags * item.packageWeightKg) / 1000).toFixed(2)} tons
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-[#6B736B] hover:text-red-600 p-1.5"
                          title="Remove item"
                          aria-label={`Remove ${item.productName} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Summary Totals Strip */}
                  <div className="pt-4 flex items-center justify-between bg-[#F7F6F0] p-3 rounded-lg border border-[#E1E5DC] text-xs">
                    <div>
                      <span className="text-[#6B736B] block">Total Estimated Volume</span>
                      <strong className="text-[#214B35] text-sm font-mono tabular-nums">
                        {totals.totalBags} Bags
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#6B736B] block">Gross Weight</span>
                      <strong className="text-[#214B35] text-sm font-mono tabular-nums">
                        {totals.totalWeightKg.toLocaleString()} kg ({totals.totalMetricTons} Metric Tons)
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dealer Details & Submission Form */}
            {cart.length > 0 && (
              <form onSubmit={handleValidateAndReview} className="bg-white border border-[#E1E5DC] rounded-xl p-4 sm:p-6 space-y-4 shadow-2xs">
                <div>
                  <h3 className="text-sm font-bold text-[#214B35] uppercase tracking-wider font-['Manrope']">
                    Dealer Contact & Delivery Specifications
                  </h3>
                  <p className="text-xs text-[#6B736B] mt-0.5">
                    Please provide your dealership details for dispatch scheduling from our Vehari warehouse.
                  </p>
                </div>

                {formErrors.items && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formErrors.items}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Dealer Business / Agency Name *
                    </label>
                    <input
                      type="text"
                      value={formData.dealerBusinessName}
                      onChange={(e) => setFormData({ ...formData, dealerBusinessName: e.target.value })}
                      placeholder="e.g. Al-Madina Agri Services"
                      className={`w-full px-3 py-2 text-xs bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] ${
                        formErrors.dealerBusinessName ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {formErrors.dealerBusinessName && (
                      <p className="text-[10px] text-red-600">{formErrors.dealerBusinessName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Authorized Contact Person *
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Malik Asif Mehmood"
                      className={`w-full px-3 py-2 text-xs bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] ${
                        formErrors.contactPerson ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {formErrors.contactPerson && (
                      <p className="text-[10px] text-red-600">{formErrors.contactPerson}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0310 7733113"
                      className={`w-full px-3 py-2 text-xs bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] ${
                        formErrors.phone ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#252A26]">
                      City / Delivery Tehsil *
                    </label>
                    <input
                      type="text"
                      value={formData.districtTehsil}
                      onChange={(e) => setFormData({ ...formData, districtTehsil: e.target.value })}
                      placeholder="e.g. Vehari, Burewala, Mailsi, Khanewal"
                      className={`w-full px-3 py-2 text-xs bg-[#F7F6F0] border rounded-lg focus:bg-white text-[#252A26] ${
                        formErrors.districtTehsil ? 'border-red-500' : 'border-[#E1E5DC] focus:border-[#214B35]'
                      }`}
                    />
                    {formErrors.districtTehsil && (
                      <p className="text-[10px] text-red-600">{formErrors.districtTehsil}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#252A26]">
                    Logistics / Preferred Delivery Window (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Enter transport preference (e.g. Goods transport to Burewala, or self-pickup from Adda 24/WB)..."
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg focus:bg-white text-[#252A26] focus:border-[#214B35]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#214B35] hover:bg-[#1a3b2a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <span>Proceed to Order Review</span>
                    <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 3: DEMO BOOKING STATUS & AUDIT */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            
            {submittedBooking && (
              <div className="bg-[#214B35] text-white rounded-xl p-5 space-y-3 shadow-sm border border-white/10">
                <div className="flex items-center gap-2 text-[#C6A15B] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Request Logged Successfully</span>
                </div>
                <h3 className="text-xl font-bold font-['Manrope']">
                  Booking Reference: {submittedBooking.bookingId}
                </h3>
                <p className="text-xs text-[#F7F6F0]/80 leading-relaxed">
                  Your booking request for <strong>{submittedBooking.totalBags} bags</strong> ({submittedBooking.totalWeightKg} kg) on behalf of <strong>{submittedBooking.dealerBusinessName}</strong> has been received at our Vehari coordination desk.
                </p>
                <div className="text-[11px] text-[#C6A15B] font-mono">
                  Current Status: Request Submitted (Awaiting Sales Allocation)
                </div>
              </div>
            )}

            <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-3">
                <h3 className="text-sm font-bold text-[#214B35] uppercase tracking-wider font-['Manrope']">
                  Dealer Booking Requests (Demonstration Log)
                </h3>
                <span className="text-xs text-[#6B736B]">
                  Simulated Records
                </span>
              </div>

              <div className="space-y-4">
                {demoOrders.map((order) => {
                  const statusColors: Record<string, string> = {
                    'Draft': 'text-slate-600 bg-slate-100',
                    'Request Submitted': 'text-amber-700 bg-amber-50 border border-amber-200',
                    'Under Review': 'text-blue-700 bg-blue-50 border border-blue-200',
                    'Confirmed': 'text-emerald-800 bg-emerald-50 border border-emerald-200',
                  };

                  return (
                    <div
                      key={order.bookingId}
                      className="p-4 rounded-xl border border-[#E1E5DC] bg-[#F7F6F0]/50 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E1E5DC]/70 pb-2.5">
                        <div>
                          <span className="font-mono font-bold text-xs text-[#214B35]">
                            {order.bookingId}
                          </span>
                          <span className="text-xs text-[#6B736B] ml-2">
                            · {order.dealerBusinessName} ({order.districtTehsil})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${statusColors[order.status] || 'bg-slate-100'}`}>
                            {order.status}
                          </span>
                          <span className="text-[10px] text-[#6B736B]">{order.submittedAt}</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[#252A26]">
                            <span>{item.quantityBags} bags × {item.productName}</span>
                            <span className="font-mono text-[#6B736B]">{(item.quantityBags * item.packageWeightKg).toLocaleString()} kg</span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <div className="text-[11px] text-[#6B736B] bg-white p-2 rounded border border-[#E1E5DC]">
                          <strong className="text-[#252A26]">Dispatch Note:</strong> {order.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ORDER REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-[#E1E5DC] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-3">
              <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">
                Confirm Booking Request Details
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-[#6B736B] hover:text-[#252A26] text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#F7F6F0] p-3 rounded-lg border border-[#E1E5DC] space-y-1">
                <div><strong>Business:</strong> {formData.dealerBusinessName}</div>
                <div><strong>Contact:</strong> {formData.contactPerson} ({formData.phone})</div>
                <div><strong>Delivery Zone:</strong> {formData.districtTehsil}</div>
                {formData.notes && <div><strong>Logistics Note:</strong> {formData.notes}</div>}
              </div>

              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                <span className="font-semibold text-[#252A26] block">Order Manifest:</span>
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between border-b border-[#E1E5DC]/60 pb-1">
                    <span>{item.quantityBags} bags · {item.productName}</span>
                    <span className="font-mono font-medium">{(item.quantityBags * item.packageWeightKg).toLocaleString()} kg</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-[#214B35] text-white p-3 rounded-lg font-mono">
                <span>Total: {totals.totalBags} Bags</span>
                <span>{totals.totalMetricTons} Metric Tons</span>
              </div>

              <p className="text-[11px] text-[#6B736B]">
                * This is a demonstration submission. Your request will be recorded locally in the prototype order status tracker.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-[#E1E5DC] rounded-lg text-xs font-semibold text-[#252A26] hover:bg-[#F7F6F0]"
              >
                Back to Edit
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 bg-[#214B35] hover:bg-[#1a3b2a] text-white rounded-lg text-xs font-bold"
              >
                Submit Booking Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
