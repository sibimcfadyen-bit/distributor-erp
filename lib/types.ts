export interface Product {
  id: string;
  sku: string;
  name: string;

  hsnCode: string;
  gst: number;

  caseSize: number;

  mrp: number;
  distributorRate: number;
  retailerRate: number;

  reorderLevel: number;

  shelfLifeDays?: number;

  trackBatch: boolean;
  trackMfgDate: boolean;

  imageUrl: string;

  isActive: boolean;
}