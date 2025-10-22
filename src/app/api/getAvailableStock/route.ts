import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Entries from '@/models/entryModel';
import { currentUser } from '@clerk/nextjs/server';
import { 
  StockItem, 
  AvailableProduct, 
  ApiResponse 
} from '@/components/types';

// Database Product interface (without _id as it's not needed for stock calculation)
interface DatabaseProduct {
  description: string;
  hsnCode: string;
  quantity: string;
  rate: string;
  taxableAmount: string;
}

// Database Entry interface (matches the MongoDB document structure)
interface DatabaseEntry {
  userId: string;
  buyerName: string;
  mobileNumber: string;
  placeOfSupply: string;
  buyerGST: string;
  state: string;
  district: string;
  invoiceNo: string;
  invoiceDate: Date;
  transport: string;
  type: string;
  products: DatabaseProduct[];
  value: {
    cgst: string;
    sgst: string;
    totalAmount: string;
  };
}

export async function GET(): Promise<NextResponse<ApiResponse<AvailableProduct[]>>> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const purchaseData: DatabaseEntry[] = await Entries.find({ userId: user.id, type: 'purchase' }).exec();
    const saleData: DatabaseEntry[] = await Entries.find({ userId: user.id, type: 'sale' }).exec();

    const purchaseProducts: DatabaseProduct[] = purchaseData.map((entry: DatabaseEntry) => entry.products).flat();
    const saleProducts: DatabaseProduct[] = saleData.map((entry: DatabaseEntry) => entry.products).flat();

    const stockMap = new Map<string, StockItem>();

    // Calculate total purchased quantities for each HSN code
    purchaseProducts.forEach((product: DatabaseProduct) => {
      const { hsnCode, description, quantity } = product;
      const current: StockItem = stockMap.get(hsnCode) || { description, quantity: 0 };
      current.quantity += parseInt(quantity, 10);
      stockMap.set(hsnCode, current);
    });

    // Subtract sold quantities from purchased quantities
    saleProducts.forEach((product: DatabaseProduct) => {
      const { hsnCode, quantity } = product;
      const current: StockItem | undefined = stockMap.get(hsnCode);
      if (current) {
        current.quantity -= parseInt(quantity, 10);
        stockMap.set(hsnCode, current);
      }
    });

    const availableStock: AvailableProduct[] = Array.from(stockMap.entries())
      .map(([hsnCode, { description, quantity }]: [string, StockItem]) => ({
        hsnCode,
        description,
        availableQuantity: quantity
      }))
      .filter((item: AvailableProduct) => item.availableQuantity > 0);

    return NextResponse.json({
      success: true,
      data: availableStock,
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error calculating available stock:', error);
    return NextResponse.json({
      success: false,
      error: 'An error occurred while calculating available stock',
    }, { status: 500 });
  }
}
