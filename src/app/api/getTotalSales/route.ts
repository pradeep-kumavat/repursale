import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Entries from "@/models/entryModel";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req:Request) {
  
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();


    const salesData = await Entries
      .find({ 
        userId: user.id,
        type: "sale" 
      })
      .exec();

    if (!salesData || salesData.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No sales data found for the user',
      },
      { status: 404 });
    }

    let totalSales = 0;
    
    salesData.forEach(sale => {
      totalSales += parseFloat(sale.value.totalAmount) || 0;
    });

    return NextResponse.json({
      success: true,
      data: totalSales,
    },
    { status: 200 });

  } catch (error) {
    console.error('Error fetching total sales:', error);
    return NextResponse.json({
        error: 'An error occurred while fetching total sales',
        },
        { status: 500 });
  }
}