import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Entries from '@/models/entryModel';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
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

    // Collect all sold HSN codes
    const soldHsnCodes = new Set(saleProducts.map(product => product.hsnCode));

    const stockMap = new Map();

    // Include only purchased products with HSN not sold
    purchaseProducts.forEach(product => {
      const { hsnCode, description, quantity } = product;
      if (!soldHsnCodes.has(hsnCode)) {
        const current = stockMap.get(hsnCode) || { description, quantity: 0 };
        current.quantity += parseInt(quantity, 10);
        stockMap.set(hsnCode, current);
      }
    });

    const availableStock = Array.from(stockMap.entries())
      .map(([hsnCode, { description, quantity }]) => ({
        hsnCode,
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
