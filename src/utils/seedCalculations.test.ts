import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBookingTotals,
  validateDealerBookingForm,
  calculateERPStats,
  filterProducts,
  filterSeedLots,
  filterGrowers,
} from './seedCalculations';
import { SeedProduct, BookingCartItem, ContractGrower, SeedLot } from '../types';

test('calculateBookingTotals correctly sums bags and weight in kg and metric tons', () => {
  const items: BookingCartItem[] = [
    {
      productId: 'p1',
      productName: 'Cotton Seed V-1',
      category: 'Cotton',
      packageUnit: '40 kg bag',
      packageWeightKg: 40,
      quantityBags: 25,
    },
    {
      productId: 'p2',
      productName: 'Wheat Seed W-10',
      category: 'Wheat',
      packageUnit: '50 kg bag',
      packageWeightKg: 50,
      quantityBags: 10,
    },
  ];

  const result = calculateBookingTotals(items);
  assert.equal(result.totalBags, 35);
  // (25 * 40) + (10 * 50) = 1000 + 500 = 1500 kg
  assert.equal(result.totalWeightKg, 1500);
  assert.equal(result.totalMetricTons, 1.5);
});

test('validateDealerBookingForm validates required fields correctly', () => {
  const invalidData = {
    dealerBusinessName: '',
    contactPerson: '',
    phone: '123',
    districtTehsil: '',
    items: [],
  };

  const invalidRes = validateDealerBookingForm(invalidData);
  assert.equal(invalidRes.isValid, false);
  assert.ok(invalidRes.errors.dealerBusinessName);
  assert.ok(invalidRes.errors.phone);
  assert.ok(invalidRes.errors.items);

  const validData = {
    dealerBusinessName: 'Al-Madina Agri Services',
    contactPerson: 'Muhammad Tariq',
    phone: '0310 7733113',
    districtTehsil: 'Vehari, Punjab',
    items: [
      {
        productId: 'p1',
        productName: 'Cotton Seed V-1',
        category: 'Cotton' as const,
        packageUnit: '40 kg bag',
        packageWeightKg: 40,
        quantityBags: 50,
      },
    ],
  };

  const validRes = validateDealerBookingForm(validData);
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});

test('calculateERPStats accurately aggregates acreage, contracts, and lot stages', () => {
  const growers: ContractGrower[] = [
    {
      growerId: 'G-101',
      farmName: 'Burewala Agri Farms',
      growerName: 'Haji Aslam',
      phone: '0300 1234567',
      tehsil: 'Burewala',
      district: 'Vehari',
      contractRef: 'ORB-CTR-2026-01',
      cropType: 'Cotton',
      allocatedAcres: 120,
      season: 'Kharif 2026',
      contractStatus: 'Active Contract',
      registeredDate: '2026-02-10',
    },
    {
      growerId: 'G-102',
      farmName: 'Mailsi Seed Farm',
      growerName: 'Rana Naveed',
      phone: '0301 7654321',
      tehsil: 'Mailsi',
      district: 'Vehari',
      contractRef: 'ORB-CTR-2026-02',
      cropType: 'Wheat',
      allocatedAcres: 80,
      season: 'Rabi 2025-26',
      contractStatus: 'Draft',
      registeredDate: '2026-02-12',
    },
  ];

  const lots: SeedLot[] = [
    {
      lotId: 'LOT-2026-CT-01',
      cropCategory: 'Cotton',
      variety: 'Cotton Commercial Lot A',
      growerSource: 'Burewala Agri Farms',
      growerId: 'G-101',
      harvestSeason: 'Kharif 2025',
      bagCount: 500,
      weightMetricTons: 20,
      stage: 'Packaged in Warehouse',
      warehouseLocation: 'Bin 4, Vehari Center',
      receivedDate: '2026-01-15',
      lastUpdated: '2026-02-01',
    },
    {
      lotId: 'LOT-2026-WH-02',
      cropCategory: 'Wheat',
      variety: 'Wheat Certified Lot B',
      growerSource: 'Mailsi Seed Farm',
      growerId: 'G-102',
      harvestSeason: 'Rabi 2025',
      bagCount: 300,
      weightMetricTons: 15,
      stage: 'Cleaning & Grading',
      warehouseLocation: 'Processing Line 2',
      receivedDate: '2026-02-05',
      lastUpdated: '2026-02-10',
    },
  ];

  const stats = calculateERPStats(growers, lots);
  assert.equal(stats.totalAllocatedAcres, 200);
  assert.equal(stats.activeContractsCount, 1);
  assert.equal(stats.totalLotsCount, 2);
  assert.equal(stats.totalInventoryTons, 35);
  assert.equal(stats.stageBreakdown['Packaged in Warehouse'], 1);
  assert.equal(stats.stageBreakdown['Cleaning & Grading'], 1);
  assert.equal(stats.stageBreakdown['Intake'], 0);
});

test('filterProducts filters by search query and category', () => {
  const products: SeedProduct[] = [
    {
      id: 'p1',
      name: 'Orbit Premium Cotton Select',
      category: 'Cotton',
      varietyDesignation: 'Kharif Selection',
      recommendedSeason: 'Kharif',
      packagingOptions: [{ unit: '40 kg bag', weightKg: 40, description: 'Standard Bag' }],
      overview: 'Quality seed selection for cotton growing regions of southern Punjab.',
      characteristics: [],
      sowingWindow: 'April - May',
      seedRatePerAcre: '6 - 8 kg',
      image: '',
      isDemonstration: true,
    },
    {
      id: 'p2',
      name: 'Orbit Wheat Grain Reserve',
      category: 'Wheat',
      varietyDesignation: 'Rabi Prime Selection',
      recommendedSeason: 'Rabi',
      packagingOptions: [{ unit: '50 kg bag', weightKg: 50, description: 'Standard Bag' }],
      overview: 'Clean wheat seed lot prepared for the Indus basin climate.',
      characteristics: [],
      sowingWindow: 'November - December',
      seedRatePerAcre: '40 - 50 kg',
      image: '',
      isDemonstration: true,
    },
  ];

  const cottonOnly = filterProducts(products, '', 'Cotton');
  assert.equal(cottonOnly.length, 1);
  assert.equal(cottonOnly[0].id, 'p1');

  const wheatSearch = filterProducts(products, 'Grain', 'All');
  assert.equal(wheatSearch.length, 1);
  assert.equal(wheatSearch[0].id, 'p2');
});
