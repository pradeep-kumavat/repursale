import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Entries from '@/models/entryModel';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    
    const purchaseData = await Entries.find({ userId: user.id, type: 'purchase' }).exec();
    const saleData = await Entries.find({ userId: user.id, type: 'sale' }).exec();

    const purchaseProducts = purchaseData.map(entry => entry.products).flat();
    const saleProducts = saleData.map(entry => entry.products).flat();

    const stockMap = new Map();

    purchaseProducts.forEach(product => {
      const { description, quantity } = product;
      const currentQuantity = stockMap.get(description) || 0;
      stockMap.set(description, currentQuantity + parseInt(quantity, 10));
    });

    saleProducts.forEach(product => {
      const { description, quantity } = product;
      if (stockMap.has(description)) {
        const currentQuantity = stockMap.get(description);
        stockMap.set(description, currentQuantity - parseInt(quantity, 10));
      }
    });

    const availableStock = Array.from(stockMap.entries())
      .map(([description, quantity]) => ({
        description,
        availableQuantity: quantity
      }))
      .filter(item => item.availableQuantity > 0);

    return NextResponse.json({
      success: true,
      data: availableStock,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error calculating available stock:', error);
    return NextResponse.json({
      success: false,
      error: 'An error occurred while calculating available stock',
    }, { status: 500 });
  }
}