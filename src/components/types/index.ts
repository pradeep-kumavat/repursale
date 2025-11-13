export interface Product {
  description: string;
  hsnCode: string;
  quantity: string;
  rate: string;
  taxableAmount: string;
  _id: string;
}

export interface Buyer {
  _id: string;
  userId: string;
  buyerName: string;
  mobileNumber: string;
  placeOfSupply: string;
  buyerGST: string;
  state: string;
  district: string;
  invoiceNo: string;
  invoiceDate: string;
  transport: string;
  type: string;
  value: {
    cgst: string;
    sgst: string;
    totalAmount: string;
  };
  products: Product[];
}

export type SortConfig = {
  key: keyof Buyer | 'totalAmount';
  direction: 'asc' | 'desc';
} | null;

export interface TotalsData {
  totalTaxableValue: number;
  totalCGST: number;
  totalSGST: number;
  totalInvoiceValue: number;
}

// Inventory related types
export interface AvailableProduct {
  hsnCode: string;
  description: string;
  availableQuantity: number;
}

export interface StockItem {
  description: string;
  quantity: number;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse; 