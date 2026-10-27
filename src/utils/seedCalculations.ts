import { CropCategory, SeedProduct, BookingCartItem, SeedLot, ContractGrower, SeedLotStage } from '../types';

export function filterProducts(
  products: SeedProduct[],
  query: string,
  selectedCategory: string,
  selectedSeason?: string
): SeedProduct[] {
  const cleanQuery = query.trim().toLowerCase();

  return products.filter((p) => {
    const matchesCategory =
      !selectedCategory || selectedCategory === 'All' || p.category === selectedCategory;

    const matchesSeason =
      !selectedSeason || selectedSeason === 'All' || p.recommendedSeason.includes(selectedSeason);

    const matchesQuery =
      !cleanQuery ||
      p.name.toLowerCase().includes(cleanQuery) ||
      p.varietyDesignation.toLowerCase().includes(cleanQuery) ||
      p.category.toLowerCase().includes(cleanQuery) ||
      p.overview.toLowerCase().includes(cleanQuery);

    return matchesCategory && matchesSeason && matchesQuery;
  });
}

export function calculateBookingTotals(items: BookingCartItem[]): {
  totalBags: number;
  totalWeightKg: number;
  totalMetricTons: number;
} {
  const totalBags = items.reduce((acc, item) => acc + (item.quantityBags || 0), 0);
  const totalWeightKg = items.reduce(
    (acc, item) => acc + (item.quantityBags || 0) * (item.packageWeightKg || 0),
    0
  );
  const totalMetricTons = Number((totalWeightKg / 1000).toFixed(2));

  return { totalBags, totalWeightKg, totalMetricTons };
}

export interface BookingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateDealerBookingForm(data: {
  dealerBusinessName: string;
  contactPerson: string;
  phone: string;
  districtTehsil: string;
  items: BookingCartItem[];
}): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!data.dealerBusinessName || data.dealerBusinessName.trim().length < 2) {
    errors.dealerBusinessName = 'Dealer business name is required.';
  }

  if (!data.contactPerson || data.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Contact person name is required.';
  }

  // Pakistan phone regex (+92 3xx xxxxxxx or 03xx xxxxxxx or 11 digits)
  const phoneClean = (data.phone || '').replace(/[\s\-()]/g, '');
  if (!phoneClean || phoneClean.length < 10) {
    errors.phone = 'Valid phone number is required (e.g. 0310 7733113 or +92 310 7733113).';
  }

  if (!data.districtTehsil || data.districtTehsil.trim().length < 2) {
    errors.districtTehsil = 'District and Tehsil / Town is required.';
  }

  if (!data.items || data.items.length === 0) {
    errors.items = 'Please select at least one seed product to book.';
  } else {
    const invalidQty = data.items.some((i) => !i.quantityBags || i.quantityBags <= 0);
    if (invalidQty) {
      errors.items = 'All selected seed products must have a quantity of at least 1 bag.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateERPStats(growers: ContractGrower[], lots: SeedLot[]) {
  const totalAllocatedAcres = growers.reduce((acc, g) => acc + (g.allocatedAcres || 0), 0);
  const activeContractsCount = growers.filter(
    (g) => g.contractStatus === 'Active Contract' || g.contractStatus === 'Harvest Delivered'
  ).length;

  const totalLotsCount = lots.length;
  const totalInventoryTons = Number(
    lots.reduce((acc, lot) => acc + (lot.weightMetricTons || 0), 0).toFixed(1)
  );

  const stageBreakdown: Record<SeedLotStage, number> = {
    'Intake': 0,
    'Cleaning & Grading': 0,
    'Moisture & Germination Testing': 0,
    'Seed Dressing': 0,
    'Packaged in Warehouse': 0,
    'Dispatched': 0,
  };

  lots.forEach((lot) => {
    if (stageBreakdown[lot.stage] !== undefined) {
      stageBreakdown[lot.stage] += 1;
    }
  });

  return {
    totalAllocatedAcres,
    activeContractsCount,
    totalLotsCount,
    totalInventoryTons,
    stageBreakdown,
  };
}

export function filterSeedLots(
  lots: SeedLot[],
  query: string,
  categoryFilter: string,
  stageFilter: string
): SeedLot[] {
  const clean = query.trim().toLowerCase();

  return lots.filter((lot) => {
    const matchCategory =
      !categoryFilter || categoryFilter === 'All' || lot.cropCategory === categoryFilter;
    const matchStage = !stageFilter || stageFilter === 'All' || lot.stage === stageFilter;
    const matchQuery =
      !clean ||
      lot.lotId.toLowerCase().includes(clean) ||
      lot.variety.toLowerCase().includes(clean) ||
      lot.growerSource.toLowerCase().includes(clean) ||
      lot.warehouseLocation.toLowerCase().includes(clean);

    return matchCategory && matchStage && matchQuery;
  });
}

export function filterGrowers(
  growers: ContractGrower[],
  query: string,
  cropFilter: string,
  statusFilter: string
): ContractGrower[] {
  const clean = query.trim().toLowerCase();

  return growers.filter((grower) => {
    const matchCrop = !cropFilter || cropFilter === 'All' || grower.cropType === cropFilter;
    const matchStatus =
      !statusFilter || statusFilter === 'All' || grower.contractStatus === statusFilter;
    const matchQuery =
      !clean ||
      grower.growerName.toLowerCase().includes(clean) ||
      grower.farmName.toLowerCase().includes(clean) ||
      grower.tehsil.toLowerCase().includes(clean) ||
      grower.contractRef.toLowerCase().includes(clean) ||
      grower.growerId.toLowerCase().includes(clean);

    return matchCrop && matchStatus && matchQuery;
  });
}
