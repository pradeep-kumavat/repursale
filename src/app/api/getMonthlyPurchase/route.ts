import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Entries from "@/models/entryModel";
import { currentUser } from "@clerk/nextjs/server";

interface MonthlyDataItem {
  month: string;
  year: string;
  value: number;
  monthYear: string;
}

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await dbConnect();

    
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 5); 
    sixMonthsAgo.setDate(1); 
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const purchaseData = await Entries.find({ 
      userId: user.id,
      type: "purchase",
      invoiceDate: { $gte: sixMonthsAgo }
    }).exec();

    if (!purchaseData || purchaseData.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No purchase data found for the user in the last 6 months',
      }, { status: 404 });
    }

    // Group purchases by month 
    const monthlyPurchases: Record<string, number> = {};
    
    purchaseData.forEach(purchase => {
      const date = new Date(purchase.invoiceDate);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthlyPurchases[monthYear]) {
        monthlyPurchases[monthYear] = 0;
      }
      
      monthlyPurchases[monthYear] += parseFloat(purchase.value.totalAmount) || 0;
    });

    // Convert to array format for easier consumption
    const monthlyData: MonthlyDataItem[] = Object.keys(monthlyPurchases).map(monthYear => {
      const [year, month] = monthYear.split('-');
      return {
        month: new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleString('default', { month: 'short' }),
        year: year,
        value: monthlyPurchases[monthYear],
        monthYear: monthYear // Used for sorting
      };
    });

    // Sort by date (oldest to newest)
    monthlyData.sort((a, b) => {
      return a.monthYear.localeCompare(b.monthYear);
    });

    // Calculate growth percentage between last two months
    let growthPercentage = 0;
    if (monthlyData.length >= 2) {
      const currentMonthValue = monthlyData[monthlyData.length - 1].value;
      const previousMonthValue = monthlyData[monthlyData.length - 2].value;
      
      if (previousMonthValue > 0) {
        growthPercentage = ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;
      }
    }

    return NextResponse.json({
      success: true,
      data: monthlyData,
      growthPercentage: growthPercentage
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching monthly purchase data:', error);
    return NextResponse.json({
      error: 'An error occurred while fetching monthly purchase data',
    }, { status: 500 });
  }
}