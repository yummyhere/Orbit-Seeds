export type CropCategory = 'Cotton' | 'Wheat' | 'Hybrid Corn';

export interface SeedProduct {
  id: string;
  name: string;
  category: CropCategory;
  varietyDesignation: string;
  recommendedSeason: string;
  packagingOptions: {
    unit: string;
    weightKg: number;
    description: string;
  }[];
  overview: string;
  characteristics: {
    label: string;
    value: string;
  }[];
  sowingWindow: string;
  seedRatePerAcre: string;
  image: string;
  isDemonstration: boolean;
}

export interface BookingCartItem {
  productId: string;
  productName: string;
  category: CropCategory;
  packageUnit: string;
  packageWeightKg: number;
  quantityBags: number;
}

export interface DealerBookingOrder {
  bookingId: string;
  dealerBusinessName: string;
  contactPerson: string;
  phone: string;
  districtTehsil: string;
  items: BookingCartItem[];
  totalBags: number;
  totalWeightKg: number;
  notes?: string;
  status: 'Draft' | 'Request Submitted' | 'Under Review' | 'Confirmed';
  submittedAt: string;
}

export type SeedLotStage = 
  | 'Intake' 
  | 'Cleaning & Grading' 
  | 'Moisture & Germination Testing' 
  | 'Seed Dressing' 
  | 'Packaged in Warehouse' 
  | 'Dispatched';

export interface SeedLot {
  lotId: string;
  cropCategory: CropCategory;
  variety: string;
  growerSource: string;
  growerId: string;
  harvestSeason: string;
  bagCount: number;
  weightMetricTons: number;
  stage: SeedLotStage;
  warehouseLocation: string;
  receivedDate: string;
  lastUpdated: string;
  lotNotes?: string;
}

export interface ContractGrower {
  growerId: string;
  farmName: string;
  growerName: string;
  phone: string;
  tehsil: string;
  district: string;
  contractRef: string;
  cropType: CropCategory;
  allocatedAcres: number;
  season: string;
  contractStatus: 'Draft' | 'Active Contract' | 'Harvest Delivered' | 'Fulfilled';
  registeredDate: string;
  notes?: string;
}
