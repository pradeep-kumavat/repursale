"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  BarChart2, 
  ShoppingCart, 
  Package, 
  FileText,
} from "lucide-react";
import { CompanyDetailsPopup } from "@/components/CompanyDetailsPopup"; 


export default function DashboardLayout() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [totalPurchase, setTotalPurchase] = useState<number | null>(null);
  const [salesGrowth, setSalesGrowth] = useState<number | null>(null);
  const [purchaseGrowth, setPurchaseGrowth] = useState<number | null>(null);
  
  // State for animated counters
  const [animatedSales, setAnimatedSales] = useState(0);
  const [animatedPurchase, setAnimatedPurchase] = useState(0);
  
  // Track if data has loaded
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Animation duration in milliseconds
  const animationDuration = 1500;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total sales
        const salesResponse = await fetch('/api/getTotalSales');
        if (salesResponse.status === 200) {
          const salesData = await salesResponse.json();
          if (salesData.success) {
            setTotalSales(salesData.data);
          }
        }

        // Fetch total purchase
        const purchaseResponse = await fetch('/api/getTotalPurchase');
        if (purchaseResponse.status === 200) {
          const purchaseData = await purchaseResponse.json();
          if (purchaseData.success) {
            setTotalPurchase(purchaseData.data);
          }
        }
        
        // Fetch monthly sales growth
        const monthlySalesResponse = await fetch('/api/getMonthlySales');
        if (monthlySalesResponse.status === 200) {
          const monthlySalesData = await monthlySalesResponse.json();
          if (monthlySalesData.success) {
            setSalesGrowth(monthlySalesData.growthPercentage);
              console.log(monthlySalesData.growthPercentage)
          }
        }
        
        // Fetch monthly purchase growth
        const monthlyPurchaseResponse = await fetch('/api/getMonthlyPurchase');
        if (monthlyPurchaseResponse.status === 200) {
          const monthlyPurchaseData = await monthlyPurchaseResponse.json();
          if (monthlyPurchaseData.success) {
            setPurchaseGrowth(monthlyPurchaseData.growthPercentage);
            console.log(monthlyPurchaseData.growthPercentage)
          }
        }
        
        // Mark data as loaded to trigger animations
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Check if this is the first time after login/signup
    const hasSeenPopup = localStorage.getItem('hasCompletedCompanyDetails');
    
    // Only show popup if the user hasn't completed it before
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);
  
  // Animation effect for counters
  useEffect(() => {
    if (!dataLoaded) return;
    
    const finalSalesValue = totalSales || 0;
    const finalPurchaseValue = totalPurchase || 0;
    
    // Reset counters to 0
    setAnimatedSales(0);
    setAnimatedPurchase(0);
    
    // Calculate step size based on animation duration and frame rate
    const frameDuration = 16; // ~60fps
    const totalFrames = animationDuration / frameDuration;

    
    let currentSales = 0;
    let currentPurchase = 0;
    let frameCount = 0;
    
    // Start animation
    const animationInterval = setInterval(() => {
      frameCount++;
      
      // Calculate current values with easing (ease-out cubic)
      const progress = frameCount / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      currentSales = Math.min(finalSalesValue, Math.round(finalSalesValue * easedProgress));
      currentPurchase = Math.min(finalPurchaseValue, Math.round(finalPurchaseValue * easedProgress));
      
      setAnimatedSales(currentSales);
      setAnimatedPurchase(currentPurchase);
      
      // Stop animation when complete
      if (frameCount >= totalFrames) {
        setAnimatedSales(finalSalesValue);
        setAnimatedPurchase(finalPurchaseValue);
        clearInterval(animationInterval);
      }
    }, frameDuration);
    
    return () => clearInterval(animationInterval);
  }, [dataLoaded, totalSales, totalPurchase]);

  const handlePopupSubmit = (data: unknown) => {
    // Set flag to indicate user has completed the form
    localStorage.setItem('hasCompletedCompanyDetails', 'true');
    
    // Close the popup
    setShowPopup(false);
    
    // Additional logic for form submission (e.g., API call to save data)
    console.log('Company details submitted:', data);
  };

  const handlePopupClose = () => {
    // When the user explicitly closes the popup, also mark it as seen
    // so it doesn't show again on page refresh
    localStorage.setItem('hasCompletedCompanyDetails', 'true');
    setShowPopup(false);
  };

  // Format growth percentage with + or - sign
  const formatGrowthPercentage = (percentage: number | null): string => {
    if (percentage === null) return "0";
    return `${percentage.toFixed(1)}%`;
  };

  // Determine color based on growth percentage
  const getGrowthColor = (percentage: number | null): string => {
    if (percentage === null) return "text-gray-400";
    return percentage >= 0 ? "text-green-400" : "text-red-400";
  };

  const stats = [
    { 
      label: "Total Purchase", 
      value: animatedPurchase, 
      growth: formatGrowthPercentage(purchaseGrowth), 
      color: getGrowthColor(purchaseGrowth)
    },
    { 
      label: "Total Sales", 
      value: animatedSales, 
      growth: formatGrowthPercentage(salesGrowth), 
      color: getGrowthColor(salesGrowth)
    },
  ];

  const cards = [
    {
      title: "Create Purchase Invoice",
      description: "Generate and manage purchase invoices for your suppliers.",
      icon: <ShoppingCart className="w-8 h-8 text-blue-400" />,
      link: "/addEntry",
      linkText: "Create Now",
      gradient: "from-blue-500/20 to-blue-600/20",
      hoverGradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Create Sales Invoice",
      description: "Create and track sales invoices for your customers.",
      icon: <FileText className="w-8 h-8 text-green-400" />,
      link: "/addEntry",
      linkText: "Create Now",
      gradient: "from-green-500/20 to-green-600/20",
      hoverGradient: "from-green-500 to-green-600",
    },
    {
      title: "Manage Inventory",
      description: "Track stock levels and manage your inventory effectively.",
      icon: <Package className="w-8 h-8 text-purple-400" />,
      link: "/inventory",
      linkText: "Manage Now",
      gradient: "from-purple-500/20 to-purple-600/20",
      hoverGradient: "from-purple-500 to-purple-600",
    },
    {
      title: "View Reports",
      description: "Access detailed analytics and performance reports.",
      icon: <BarChart2 className="w-8 h-8 text-yellow-400" />,
      gradient: "from-yellow-500/20 to-yellow-600/20",
      hoverGradient: "from-yellow-500 to-yellow-600",
      sublinks: [
        { title: "Purchase Records", href: "/reports/purchase-reports" },
        { title: "Sales Records", href: "/reports/sales-reports" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header Section */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome!!!</h1>
            <p className="text-gray-400">Here&apos;s an overview of your business</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white transition-all duration-200 ease-out">
                      ₹{stat.value.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`flex items-center ${stat.color}`}>
                    {/* <TrendingUp className="w-4 h-4 mr-1" />
                    <span>{stat.growth}</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredCard(card.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden h-full transition-all duration-300 group-hover:border-gray-700">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 transition-all duration-300 group-hover:opacity-10`} />
                    <div className="relative p-6 flex flex-col h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        {card.icon}
                        <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-6 flex-grow">{card.description}</p>
                      {card.link ? (
                        <Link
                          href={card.link}
                          className="inline-flex items-center justify-center w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                        >
                          {card.linkText}
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                      ) : (
                        <div className="space-y-2">
                          {card.sublinks?.map((sublink, sublinkIndex) => (
                            <Link
                              key={sublinkIndex}
                              href={sublink.href}
                              className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                            >
                              <ChevronRight className="w-4 h-4 mr-1" />
                              {sublink.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                      card.hoverGradient
                    } transform origin-left transition-all duration-300 ${
                      hoveredCard === card.title ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              ))}
            </div>

        </div>
      </main>

      
      {showPopup && (
        <CompanyDetailsPopup 
          onClose={handlePopupClose} 
          onSubmit={handlePopupSubmit} 
        />
      )}
    </div>
  );
}