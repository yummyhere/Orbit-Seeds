import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_CONTRACT_GROWERS } from '../data/demoGrowers';
import { DEMO_SEED_LOTS } from '../data/demoSeedLots';
import { ContractGrower, SeedLot, SeedLotStage, CropCategory } from '../types';
import { calculateERPStats, filterSeedLots, filterGrowers } from '../utils/seedCalculations';
import {
  LayoutDashboard,
  Users,
  Layers,
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  Warehouse,
  ArrowLeft,
  ChevronRight,
  X,
  ExternalLink,
  Edit,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';

export const ERPDashboard: React.FC = () => {
  // Navigation section in ERP: 'overview' | 'growers' | 'lots' | 'contracts'
  const [activeSection, setActiveSection] = useState<'overview' | 'growers' | 'lots' | 'contracts'>('overview');

  // State for growers & seed lots (allows interactive adding & updating in local session)
  const [growers, setGrowers] = useState<ContractGrower[]>(DEMO_CONTRACT_GROWERS);
  const [seedLots, setSeedLots] = useState<SeedLot[]>(DEMO_SEED_LOTS);

  // Filters for growers
  const [growerQuery, setGrowerQuery] = useState('');
  const [growerCropFilter, setGrowerCropFilter] = useState('All');
  const [growerStatusFilter, setGrowerStatusFilter] = useState('All');

  // Filters for seed lots
  const [lotQuery, setLotQuery] = useState('');
  const [lotCategoryFilter, setLotCategoryFilter] = useState('All');
  const [lotStageFilter, setLotStageFilter] = useState('All');

  // Modals state
  const [selectedLot, setSelectedLot] = useState<SeedLot | null>(null);
  const [selectedGrower, setSelectedGrower] = useState<ContractGrower | null>(null);
  const [showAddGrowerModal, setShowAddGrowerModal] = useState(false);
  const [contractUnderReview, setContractUnderReview] = useState<ContractGrower | null>(null);

  // New grower form
  const [newGrower, setNewGrower] = useState({
    farmName: '',
    growerName: '',
    phone: '',
    tehsil: 'Vehari',
    district: 'Vehari',
    cropType: 'Cotton' as CropCategory,
    allocatedAcres: 50,
    season: 'Kharif 2026',
    notes: '',
  });

  const [addGrowerError, setAddGrowerError] = useState('');

  // ERP calculated statistics
  const stats = useMemo(() => calculateERPStats(growers, seedLots), [growers, seedLots]);

  // Filtered datasets
  const filteredGrowers = useMemo(
    () => filterGrowers(growers, growerQuery, growerCropFilter, growerStatusFilter),
    [growers, growerQuery, growerCropFilter, growerStatusFilter]
  );

  const filteredLots = useMemo(
    () => filterSeedLots(seedLots, lotQuery, lotCategoryFilter, lotStageFilter),
    [seedLots, lotQuery, lotCategoryFilter, lotStageFilter]
  );

  const handleAddGrowerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrower.farmName.trim() || !newGrower.growerName.trim() || !newGrower.phone.trim()) {
      setAddGrowerError('Farm name, grower name, and contact phone are required.');
      return;
    }

    const createdGrower: ContractGrower = {
      growerId: `OS-GR-${String(growers.length + 1).padStart(3, '0')}`,
      farmName: newGrower.farmName.trim(),
      growerName: newGrower.growerName.trim(),
      phone: newGrower.phone.trim(),
      tehsil: newGrower.tehsil,
      district: newGrower.district,
      contractRef: `CTR-2026-${newGrower.cropType.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      cropType: newGrower.cropType,
      allocatedAcres: Number(newGrower.allocatedAcres) || 10,
      season: newGrower.season,
      contractStatus: 'Draft',
      registeredDate: new Date().toISOString().split('T')[0],
      notes: newGrower.notes,
    };

    setGrowers([createdGrower, ...growers]);
    setShowAddGrowerModal(false);
    setNewGrower({
      farmName: '',
      growerName: '',
      phone: '',
      tehsil: 'Vehari',
      district: 'Vehari',
      cropType: 'Cotton',
      allocatedAcres: 50,
      season: 'Kharif 2026',
      notes: '',
    });
    setAddGrowerError('');
    setActiveSection('growers');
  };

  const handleUpdateContractStatus = (growerId: string, nextStatus: ContractGrower['contractStatus']) => {
    setGrowers((prev) =>
      prev.map((g) => (g.growerId === growerId ? { ...g, contractStatus: nextStatus } : g))
    );
    if (contractUnderReview && contractUnderReview.growerId === growerId) {
      setContractUnderReview({ ...contractUnderReview, contractStatus: nextStatus });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] flex flex-col">
      
      {/* Top ERP Header */}
      <header className="bg-white border-b border-[#E1E5DC] px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-[#6B736B] hover:text-[#214B35]"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Orbit Website</span>
          </Link>
          <div className="h-4 w-px bg-[#E1E5DC]" />
          <div>
            <h1 className="text-base font-bold text-[#214B35] font-['Manrope']">
              Orbit Operations ERP & Seed-Lot Tracking
            </h1>
            <p className="text-[11px] text-[#6B736B]">
              Adda 24/WB Facility · Internal Management Console (Demonstration Mode)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs bg-[#F7F6F0] px-3 py-1.5 rounded-lg border border-[#E1E5DC] font-mono tabular-nums">
            <span className="text-[#6B736B]">Active Lots:</span>
            <strong className="text-[#214B35]">{stats.totalLotsCount}</strong>
            <span className="text-[#6B736B] ml-2">Total Tons:</span>
            <strong className="text-[#214B35]">{stats.totalInventoryTons} t</strong>
          </div>
          <button
            onClick={() => setShowAddGrowerModal(true)}
            className="px-3.5 py-1.5 bg-[#214B35] hover:bg-[#1a3b2a] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Add Contract Grower</span>
          </button>
        </div>
      </header>

      {/* Main ERP Layout: Sidebar + Viewport */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Compact Sidebar */}
        <aside className="w-full md:w-60 bg-white border-r border-[#E1E5DC] p-4 flex flex-row md:flex-col justify-between shrink-0">
          <div className="space-y-1 w-full flex md:flex-col gap-1 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeSection === 'overview'
                  ? 'bg-[#214B35] text-white'
                  : 'text-[#252A26] hover:bg-[#F7F6F0]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Operations Overview</span>
            </button>

            <button
              onClick={() => setActiveSection('growers')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeSection === 'growers'
                  ? 'bg-[#214B35] text-white'
                  : 'text-[#252A26] hover:bg-[#F7F6F0]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4 shrink-0" />
                <span>Contract Growers</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10 tabular-nums">
                {growers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection('lots')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeSection === 'lots'
                  ? 'bg-[#214B35] text-white'
                  : 'text-[#252A26] hover:bg-[#F7F6F0]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 shrink-0" />
                <span>Seed-Lot Tracking</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10 tabular-nums">
                {seedLots.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection('contracts')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeSection === 'contracts'
                  ? 'bg-[#214B35] text-white'
                  : 'text-[#252A26] hover:bg-[#F7F6F0]'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Contract Workflows</span>
            </button>
          </div>

          <div className="hidden md:block pt-4 border-t border-[#E1E5DC] text-[11px] text-[#6B736B] space-y-2">
            <div className="font-semibold text-[#252A26]">Vehari Center Nodes</div>
            <div>• Processing Hall: Adda 24/WB</div>
            <div>• Scale: 60-Ton Weighbridge</div>
            <div>• Storage: Bins A1 - C4</div>
            <div className="pt-2 text-[10px] text-[#C6A15B] font-medium">
              Demo Environment Only
            </div>
          </div>
        </aside>

        {/* Viewport Content Area */}
        <main className="flex-1 p-6 max-w-7xl overflow-y-auto space-y-6">
          
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 space-y-1 shadow-2xs">
                  <div className="text-xs text-[#6B736B] flex items-center justify-between">
                    <span>Contract Acreage</span>
                    <Users className="w-4 h-4 text-[#527A49]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#214B35] tabular-nums">
                    {stats.totalAllocatedAcres} <span className="text-xs font-normal text-[#6B736B]">Acres</span>
                  </div>
                  <div className="text-[11px] text-[#6B736B]">
                    {stats.activeContractsCount} active grower contracts
                  </div>
                </div>

                <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 space-y-1 shadow-2xs">
                  <div className="text-xs text-[#6B736B] flex items-center justify-between">
                    <span>Warehouse Inventory</span>
                    <Warehouse className="w-4 h-4 text-[#527A49]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#214B35] tabular-nums">
                    {stats.totalInventoryTons} <span className="text-xs font-normal text-[#6B736B]">Tons</span>
                  </div>
                  <div className="text-[11px] text-[#6B736B]">
                    Recorded across {stats.totalLotsCount} seed batches
                  </div>
                </div>

                <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 space-y-1 shadow-2xs">
                  <div className="text-xs text-[#6B736B] flex items-center justify-between">
                    <span>Testing & Cleaning</span>
                    <Clock className="w-4 h-4 text-[#C6A15B]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#214B35] tabular-nums">
                    {stats.stageBreakdown['Cleaning & Grading'] + stats.stageBreakdown['Moisture & Germination Testing'] + stats.stageBreakdown['Seed Dressing']}
                    <span className="text-xs font-normal text-[#6B736B]"> Lots</span>
                  </div>
                  <div className="text-[11px] text-[#6B736B]">
                    Active conditioning in plant
                  </div>
                </div>

                <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 space-y-1 shadow-2xs">
                  <div className="text-xs text-[#6B736B] flex items-center justify-between">
                    <span>Ready for Dispatch</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#214B35] tabular-nums">
                    {stats.stageBreakdown['Packaged in Warehouse']}
                    <span className="text-xs font-normal text-[#6B736B]"> Lots</span>
                  </div>
                  <div className="text-[11px] text-[#6B736B]">
                    Bagged & palletized in bins
                  </div>
                </div>
              </div>

              {/* Seed Processing Stage Pipeline Visualizer */}
              <div className="bg-white border border-[#E1E5DC] rounded-xl p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#214B35] uppercase tracking-wider font-['Manrope']">
                    Seed-Lot Processing Pipeline Breakdown
                  </h3>
                  <button
                    onClick={() => setActiveSection('lots')}
                    className="text-xs font-semibold text-[#527A49] hover:underline flex items-center gap-1"
                  >
                    <span>View All Seed Lots</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  {(
                    [
                      'Intake',
                      'Cleaning & Grading',
                      'Moisture & Germination Testing',
                      'Seed Dressing',
                      'Packaged in Warehouse',
                      'Dispatched',
                    ] as SeedLotStage[]
                  ).map((stage) => (
                    <div
                      key={stage}
                      className="bg-[#F7F6F0] p-3 rounded-lg border border-[#E1E5DC] space-y-1"
                    >
                      <div className="text-[11px] text-[#6B736B] truncate font-medium">{stage}</div>
                      <div className="text-lg font-bold font-mono text-[#214B35] tabular-nums">
                        {stats.stageBreakdown[stage]} <span className="text-[10px] font-normal text-[#6B736B]">lots</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Split: Recent Growers & Active Seed Lots */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Contract Growers */}
                <div className="bg-white border border-[#E1E5DC] rounded-xl p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-2.5">
                    <h3 className="text-xs font-bold text-[#214B35] uppercase tracking-wider">
                      Contract Growers (Vehari & Khanewal)
                    </h3>
                    <button
                      onClick={() => setActiveSection('growers')}
                      className="text-xs text-[#527A49] hover:underline font-semibold"
                    >
                      View All ({growers.length})
                    </button>
                  </div>

                  <div className="divide-y divide-[#E1E5DC] text-xs">
                    {growers.slice(0, 4).map((g) => (
                      <div key={g.growerId} className="py-2.5 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#252A26]">{g.growerName}</div>
                          <div className="text-[11px] text-[#6B736B]">{g.farmName} · {g.tehsil}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium text-[#214B35]">{g.allocatedAcres} Acres ({g.cropType})</div>
                          <span className="text-[10px] text-[#6B736B]">{g.contractStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Seed Lots */}
                <div className="bg-white border border-[#E1E5DC] rounded-xl p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-2.5">
                    <h3 className="text-xs font-bold text-[#214B35] uppercase tracking-wider">
                      Traceable Seed Batches
                    </h3>
                    <button
                      onClick={() => setActiveSection('lots')}
                      className="text-xs text-[#527A49] hover:underline font-semibold"
                    >
                      View All ({seedLots.length})
                    </button>
                  </div>

                  <div className="divide-y divide-[#E1E5DC] text-xs">
                    {seedLots.slice(0, 4).map((lot) => (
                      <div key={lot.lotId} className="py-2.5 flex items-center justify-between">
                        <div>
                          <div className="font-mono font-bold text-[#214B35]">{lot.lotId}</div>
                          <div className="text-[11px] text-[#6B736B]">{lot.variety}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium text-[#252A26]">{lot.weightMetricTons} t ({lot.bagCount} bags)</div>
                          <span className="text-[10px] text-[#527A49] font-medium">{lot.stage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* SECTION 2: CONTRACT GROWERS TABLE */}
          {activeSection === 'growers' && (
            <div className="space-y-4">
              
              {/* Filter controls */}
              <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="w-full md:w-80 relative">
                  <Search className="w-4 h-4 text-[#6B736B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={growerQuery}
                    onChange={(e) => setGrowerQuery(e.target.value)}
                    placeholder="Search grower, farm, or contract #..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] focus:border-[#214B35]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select
                    value={growerCropFilter}
                    onChange={(e) => setGrowerCropFilter(e.target.value)}
                    className="py-1.5 px-3 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                    aria-label="Filter growers by crop"
                  >
                    <option value="All">All Crops</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Hybrid Corn">Hybrid Corn</option>
                  </select>

                  <select
                    value={growerStatusFilter}
                    onChange={(e) => setGrowerStatusFilter(e.target.value)}
                    className="py-1.5 px-3 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                    aria-label="Filter growers by status"
                  >
                    <option value="All">All Contract Statuses</option>
                    <option value="Draft">Draft</option>
                    <option value="Active Contract">Active Contract</option>
                    <option value="Harvest Delivered">Harvest Delivered</option>
                    <option value="Fulfilled">Fulfilled</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-[#E1E5DC] rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#252A26] border-collapse">
                    <thead className="bg-[#F7F6F0] border-b border-[#E1E5DC] text-[#6B736B] uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Grower ID</th>
                        <th className="py-2.5 px-4">Grower & Farm Name</th>
                        <th className="py-2.5 px-4">Location</th>
                        <th className="py-2.5 px-4">Contract Ref</th>
                        <th className="py-2.5 px-4">Crop</th>
                        <th className="py-2.5 px-4 text-right">Acres</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E5DC]">
                      {filteredGrowers.map((g) => (
                        <tr key={g.growerId} className="hover:bg-[#F7F6F0]/60 transition-colors">
                          <td className="py-2.5 px-4 font-mono font-bold text-[#214B35]">
                            {g.growerId}
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="font-semibold">{g.growerName}</div>
                            <div className="text-[11px] text-[#6B736B]">{g.farmName}</div>
                          </td>
                          <td className="py-2.5 px-4 text-[#6B736B]">
                            {g.tehsil}, {g.district}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-[11px]">
                            {g.contractRef}
                          </td>
                          <td className="py-2.5 px-4 font-medium">
                            {g.cropType}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-right tabular-nums">
                            {g.allocatedAcres}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              g.contractStatus === 'Active Contract'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : g.contractStatus === 'Harvest Delivered'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : g.contractStatus === 'Fulfilled'
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}>
                              {g.contractStatus}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedGrower(g)}
                              className="text-[#214B35] hover:underline font-semibold"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => {
                                setContractUnderReview(g);
                                setActiveSection('contracts');
                              }}
                              className="text-[#527A49] hover:underline"
                            >
                              Workflow
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredGrowers.length === 0 && (
                  <div className="text-center py-8 text-[#6B736B] text-xs">
                    No contract growers found matching your search criteria.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* SECTION 3: SEED-LOT TRACKING TABLE */}
          {activeSection === 'lots' && (
            <div className="space-y-4">
              
              {/* Lot Filters */}
              <div className="bg-white border border-[#E1E5DC] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="w-full md:w-80 relative">
                  <Search className="w-4 h-4 text-[#6B736B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={lotQuery}
                    onChange={(e) => setLotQuery(e.target.value)}
                    placeholder="Search Lot ID, variety, or grower..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26] focus:border-[#214B35]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select
                    value={lotCategoryFilter}
                    onChange={(e) => setLotCategoryFilter(e.target.value)}
                    className="py-1.5 px-3 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                    aria-label="Filter lots by crop"
                  >
                    <option value="All">All Crops</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Hybrid Corn">Hybrid Corn</option>
                  </select>

                  <select
                    value={lotStageFilter}
                    onChange={(e) => setLotStageFilter(e.target.value)}
                    className="py-1.5 px-3 text-xs bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                    aria-label="Filter lots by stage"
                  >
                    <option value="All">All Processing Stages</option>
                    <option value="Intake">Intake</option>
                    <option value="Cleaning & Grading">Cleaning & Grading</option>
                    <option value="Moisture & Germination Testing">Moisture & Testing</option>
                    <option value="Seed Dressing">Seed Dressing</option>
                    <option value="Packaged in Warehouse">Packaged in Warehouse</option>
                    <option value="Dispatched">Dispatched</option>
                  </select>
                </div>
              </div>

              {/* Lots Table */}
              <div className="bg-white border border-[#E1E5DC] rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#252A26] border-collapse">
                    <thead className="bg-[#F7F6F0] border-b border-[#E1E5DC] text-[#6B736B] uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Lot Reference</th>
                        <th className="py-2.5 px-4">Crop & Variety</th>
                        <th className="py-2.5 px-4">Production Source</th>
                        <th className="py-2.5 px-4 text-right">Bags</th>
                        <th className="py-2.5 px-4 text-right">Weight (Tons)</th>
                        <th className="py-2.5 px-4">Current Stage</th>
                        <th className="py-2.5 px-4">Location / Bay</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E5DC]">
                      {filteredLots.map((lot) => (
                        <tr key={lot.lotId} className="hover:bg-[#F7F6F0]/60 transition-colors">
                          <td className="py-2.5 px-4 font-mono font-bold text-[#214B35]">
                            {lot.lotId}
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="font-semibold">{lot.variety}</div>
                            <div className="text-[11px] text-[#6B736B]">{lot.cropCategory}</div>
                          </td>
                          <td className="py-2.5 px-4 text-[#6B736B]">
                            {lot.growerSource}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-right tabular-nums">
                            {lot.bagCount}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-right tabular-nums font-semibold">
                            {lot.weightMetricTons.toFixed(1)}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E1E5DC] text-[#252A26]">
                              {lot.stage}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-[11px] text-[#6B736B]">
                            {lot.warehouseLocation}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedLot(lot)}
                              className="px-2.5 py-1 bg-[#F7F6F0] hover:bg-[#E1E5DC] text-[#214B35] rounded font-semibold text-[11px] border border-[#E1E5DC]"
                            >
                              Inspect Lot
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredLots.length === 0 && (
                  <div className="text-center py-8 text-[#6B736B] text-xs">
                    No seed lots match the specified filters.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* SECTION 4: CONTRACT WORKFLOW */}
          {activeSection === 'contracts' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-[#E1E5DC] rounded-xl p-5 space-y-2 shadow-2xs">
                <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">
                  Seed Multiplication Contract Lifecycle
                </h3>
                <p className="text-xs text-[#6B736B]">
                  Manage verification standards, crop acreage allocations, and harvest intake status for contract farming partners.
                </p>
              </div>

              {contractUnderReview ? (
                <div className="bg-white border border-[#E1E5DC] rounded-xl p-6 space-y-6 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-4">
                    <div>
                      <span className="text-[11px] font-mono text-[#527A49]">
                        Contract #{contractUnderReview.contractRef}
                      </span>
                      <h3 className="text-xl font-bold text-[#214B35] font-['Manrope']">
                        {contractUnderReview.growerName} · {contractUnderReview.farmName}
                      </h3>
                      <div className="text-xs text-[#6B736B]">
                        {contractUnderReview.tehsil}, {contractUnderReview.district} · {contractUnderReview.phone}
                      </div>
                    </div>

                    <button
                      onClick={() => setContractUnderReview(null)}
                      className="text-xs text-[#6B736B] hover:text-[#252A26] font-semibold"
                    >
                      Close Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-[#F7F6F0] rounded-lg border border-[#E1E5DC]">
                      <span className="text-[#6B736B] block">Assigned Crop:</span>
                      <strong className="text-sm text-[#214B35]">{contractUnderReview.cropType}</strong>
                    </div>
                    <div className="p-3 bg-[#F7F6F0] rounded-lg border border-[#E1E5DC]">
                      <span className="text-[#6B736B] block">Multiplication Acreage:</span>
                      <strong className="text-sm text-[#214B35] font-mono tabular-nums">{contractUnderReview.allocatedAcres} Acres</strong>
                    </div>
                    <div className="p-3 bg-[#F7F6F0] rounded-lg border border-[#E1E5DC]">
                      <span className="text-[#6B736B] block">Target Cropping Season:</span>
                      <strong className="text-sm text-[#214B35]">{contractUnderReview.season}</strong>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <label className="font-semibold text-[#252A26] block">
                      Contract Verification Status:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['Draft', 'Active Contract', 'Harvest Delivered', 'Fulfilled'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleUpdateContractStatus(contractUnderReview.growerId, status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            contractUnderReview.contractStatus === status
                              ? 'bg-[#214B35] text-white shadow-xs'
                              : 'bg-[#F7F6F0] text-[#6B736B] hover:text-[#252A26] border border-[#E1E5DC]'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {contractUnderReview.notes && (
                    <div className="bg-[#F7F6F0] p-4 rounded-lg border border-[#E1E5DC] text-xs text-[#6B736B] space-y-1">
                      <strong className="text-[#252A26] block">Field Isolation & Audit Notes:</strong>
                      <p>{contractUnderReview.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {growers.map((g) => (
                    <div
                      key={g.growerId}
                      className="bg-white border border-[#E1E5DC] rounded-xl p-5 space-y-3 shadow-2xs hover:border-[#214B35]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between border-b border-[#E1E5DC]/70 pb-2">
                        <span className="font-mono text-xs font-bold text-[#214B35]">
                          {g.contractRef}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F7F6F0] text-[#252A26]">
                          {g.contractStatus}
                        </span>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="font-bold text-[#252A26] text-sm">{g.growerName}</div>
                        <div className="text-[#6B736B]">{g.farmName} · {g.tehsil}</div>
                        <div className="text-[#527A49] font-medium pt-1">
                          {g.allocatedAcres} Acres allocated for {g.cropType} ({g.season})
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setContractUnderReview(g)}
                          className="w-full py-1.5 bg-[#F7F6F0] hover:bg-[#E1E5DC] text-[#214B35] font-semibold text-xs rounded transition-colors"
                        >
                          Review & Update Workflow State
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* SEED LOT DETAIL MODAL */}
      {selectedLot && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-[#E1E5DC] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#527A49]">
                  {selectedLot.lotId}
                </span>
                <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">
                  {selectedLot.variety}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLot(null)}
                className="text-[#6B736B] hover:text-[#252A26] p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#F7F6F0] p-3 rounded-lg border border-[#E1E5DC]">
                <div>
                  <span className="text-[#6B736B] block">Crop:</span>
                  <strong>{selectedLot.cropCategory}</strong>
                </div>
                <div>
                  <span className="text-[#6B736B] block">Production Season:</span>
                  <strong>{selectedLot.harvestSeason}</strong>
                </div>
                <div>
                  <span className="text-[#6B736B] block">Total Packaged Bags:</span>
                  <strong className="font-mono">{selectedLot.bagCount} bags</strong>
                </div>
                <div>
                  <span className="text-[#6B736B] block">Net Metric Tons:</span>
                  <strong className="font-mono">{selectedLot.weightMetricTons} t</strong>
                </div>
              </div>

              <div>
                <span className="text-[#6B736B] block mb-1">Contract Grower Source:</span>
                <div className="p-2.5 bg-[#F7F6F0] rounded border border-[#E1E5DC] font-medium">
                  {selectedLot.growerSource} (ID: {selectedLot.growerId})
                </div>
              </div>

              <div>
                <span className="text-[#6B736B] block mb-1">Physical Warehouse Location:</span>
                <div className="p-2.5 bg-[#F7F6F0] rounded border border-[#E1E5DC] font-mono text-[11px]">
                  {selectedLot.warehouseLocation}
                </div>
              </div>

              {selectedLot.lotNotes && (
                <div>
                  <span className="text-[#6B736B] block mb-1">Quality & Processing Log:</span>
                  <div className="p-2.5 bg-[#F7F6F0] rounded border border-[#E1E5DC] text-[#6B736B]">
                    {selectedLot.lotNotes}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-[#6B736B] pt-1">
                <span>Received: {selectedLot.receivedDate}</span>
                <span>Last Updated: {selectedLot.lastUpdated}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLot(null)}
                className="px-4 py-2 bg-[#214B35] text-white rounded-lg text-xs font-semibold"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GROWER DETAIL MODAL */}
      {selectedGrower && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-[#E1E5DC] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#527A49]">
                  {selectedGrower.growerId}
                </span>
                <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">
                  {selectedGrower.growerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGrower(null)}
                className="text-[#6B736B] hover:text-[#252A26] p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#F7F6F0] p-3 rounded-lg border border-[#E1E5DC] space-y-1">
                <div><strong>Farm:</strong> {selectedGrower.farmName}</div>
                <div><strong>Location:</strong> Tehsil {selectedGrower.tehsil}, District {selectedGrower.district}</div>
                <div><strong>Phone:</strong> {selectedGrower.phone}</div>
                <div><strong>Registered:</strong> {selectedGrower.registeredDate}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#F7F6F0] p-3 rounded-lg border border-[#E1E5DC]">
                <div>
                  <span className="text-[#6B736B] block">Contract Ref:</span>
                  <span className="font-mono font-bold">{selectedGrower.contractRef}</span>
                </div>
                <div>
                  <span className="text-[#6B736B] block">Multiplication Crop:</span>
                  <span className="font-bold">{selectedGrower.cropType}</span>
                </div>
                <div>
                  <span className="text-[#6B736B] block">Acreage:</span>
                  <span className="font-mono font-bold">{selectedGrower.allocatedAcres} Acres</span>
                </div>
                <div>
                  <span className="text-[#6B736B] block">Status:</span>
                  <span className="font-bold text-[#527A49]">{selectedGrower.contractStatus}</span>
                </div>
              </div>

              {selectedGrower.notes && (
                <div className="p-3 bg-[#F7F6F0] rounded-lg border border-[#E1E5DC] text-[#6B736B]">
                  <strong className="text-[#252A26] block mb-0.5">Agronomic Inspection Notes:</strong>
                  {selectedGrower.notes}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedGrower(null)}
                className="px-4 py-2 bg-[#214B35] text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CONTRACT GROWER MODAL */}
      {showAddGrowerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-[#E1E5DC] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E1E5DC] pb-3">
              <h3 className="text-base font-bold text-[#214B35] font-['Manrope']">
                Add Contract Seed Grower
              </h3>
              <button
                onClick={() => setShowAddGrowerModal(false)}
                className="text-[#6B736B] hover:text-[#252A26] p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addGrowerError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{addGrowerError}</span>
              </div>
            )}

            <form onSubmit={handleAddGrowerSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252A26]">Farm / Land Name *</label>
                  <input
                    type="text"
                    value={newGrower.farmName}
                    onChange={(e) => setNewGrower({ ...newGrower, farmName: e.target.value })}
                    placeholder="e.g. Al-Faisal Seed Lands"
                    className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#252A26]">Grower Name *</label>
                  <input
                    type="text"
                    value={newGrower.growerName}
                    onChange={(e) => setNewGrower({ ...newGrower, growerName: e.target.value })}
                    placeholder="e.g. Chaudhry Tariq"
                    className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252A26]">Phone Number *</label>
                  <input
                    type="tel"
                    value={newGrower.phone}
                    onChange={(e) => setNewGrower({ ...newGrower, phone: e.target.value })}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#252A26]">Tehsil</label>
                  <select
                    value={newGrower.tehsil}
                    onChange={(e) => setNewGrower({ ...newGrower, tehsil: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                  >
                    <option value="Vehari">Vehari</option>
                    <option value="Burewala">Burewala</option>
                    <option value="Mailsi">Mailsi</option>
                    <option value="Jahanian">Jahanian (Khanewal)</option>
                    <option value="Lodhran">Lodhran</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252A26]">Assigned Crop</label>
                  <select
                    value={newGrower.cropType}
                    onChange={(e) => setNewGrower({ ...newGrower, cropType: e.target.value as CropCategory })}
                    className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                  >
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Hybrid Corn">Hybrid Corn</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#252A26]">Allocated Acres</label>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    value={newGrower.allocatedAcres}
                    onChange={(e) => setNewGrower({ ...newGrower, allocatedAcres: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252A26]">Field Notes / Soil Isolation</label>
                <textarea
                  rows={2}
                  value={newGrower.notes}
                  onChange={(e) => setNewGrower({ ...newGrower, notes: e.target.value })}
                  placeholder="Distance from adjacent fields, canal water schedule..."
                  className="w-full px-3 py-1.5 bg-[#F7F6F0] border border-[#E1E5DC] rounded-lg text-[#252A26]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E1E5DC]">
                <button
                  type="button"
                  onClick={() => setShowAddGrowerModal(false)}
                  className="px-4 py-2 border border-[#E1E5DC] rounded-lg text-xs font-semibold text-[#6B736B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#214B35] text-white rounded-lg text-xs font-bold hover:bg-[#1a3b2a]"
                >
                  Create Contract Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
