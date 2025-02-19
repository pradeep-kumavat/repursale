"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  BarChart2, 
  ShoppingCart, 
  Package, 
  FileText,
  TrendingUp,
  DollarSign
} from "lucide-react";

interface DashboardProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const stats = [
    { label: "Total Sales", value: "₹45,231", trend: "+12.5%", color: "text-green-400" },
    { label: "Total Purchase", value: "₹32,845", trend: "+8.2%", color: "text-blue-400" },
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
            <p className="text-gray-400">Here's an overview of your business</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`flex items-center ${stat.color}`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          {children ? (
            children
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
}