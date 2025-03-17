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