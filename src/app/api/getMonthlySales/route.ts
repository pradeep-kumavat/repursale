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

    const salesData = await Entries.find({ 
      userId: user.id,
      type: "sale",
      invoiceDate: { $gte: sixMonthsAgo }
    }).exec();

    if (!salesData || salesData.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No sales data found for the user in the last 6 months',
      }, { status: 404 });
    }

    // Group sales by month
    const monthlySales: Record<string, number> = {};
    
    salesData.forEach(sale => {
      const date = new Date(sale.invoiceDate);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthlySales[monthYear]) {
        monthlySales[monthYear] = 0;
      }
      
      monthlySales[monthYear] += parseFloat(sale.value.totalAmount) || 0;
    });

    // Convert to array format for easier consumption
    const monthlyData: MonthlyDataItem[] = Object.keys(monthlySales).map(monthYear => {
      const [year, month] = monthYear.split('-');
      return {
        month: new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleString('default', { month: 'short' }),
        year: year,
        value: monthlySales[monthYear],
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
    console.error('Error fetching monthly sales data:', error);
    return NextResponse.json({
      error: 'An error occurred while fetching monthly sales data',
    }, { status: 500 });
  }
}