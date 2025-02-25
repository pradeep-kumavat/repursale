import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Entries from "@/models/entryModel";
import { currentUser } from "@clerk/nextjs/server";

export default async function GET(req:Request) {
    await dbConnect();

  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchaseData = await Entries
      .find({ 
        userId: user.id,
        type: "purchase" 
      })
      .exec();

    if (!purchaseData || purchaseData.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No purchase data found for the user',
      },
      { status: 404 });
    }

    let totalPurchase = 0;
    
    purchaseData.forEach(purchase => {
      totalPurchase += parseFloat(purchase.value.totalAmount) || 0;
    });

    return NextResponse.json({
      success: true,
      totalPurchase,
    },
    { status: 200 });

  } catch (error) {
    console.error('Error fetching total Purchases:', error);
    return NextResponse.json({
        error: 'An error occurred while fetching total Purchases',
        },
        { status: 500 });
  }
}