"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"
import { ChevronRight, BarChart2, ShoppingCart, Package, FileText } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const cards = [
    {
      title: "Create Purchase Invoice",
      description: "Quickly create purchase invoices for your suppliers.",
      icon: <ShoppingCart className="w-8 h-8 text-blue-400" />,
      link: "/addEntry",
      linkText: "Create Now",
    },
    {
      title: "Create Sales Invoice",
      description: "Quickly Create sales invoices for your customers.",
      icon: <FileText className="w-8 h-8 text-green-400" />,
      link: "/addEntry",
      linkText: "Create Now",
    },
    {
      title: "Manage Inventory",
      description: "Track and manage your inventory efficiently.",
      icon: <Package className="w-8 h-8 text-purple-400" />,
      link: "/inventory",
      linkText: "Manage Now",
    },
    {
      title: "View Reports",
      description: "Analyze reports for sales, purchases, and inventory.",
      icon: <BarChart2 className="w-8 h-8 text-yellow-400" />,
      sublinks: [
        { title: "Purchase Records", href: "/reports/purchase-reports" },
        { title: "Sales Records", href: "/reports/sales-reports" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out hover:scale-105"
                onMouseEnter={() => setHoveredCard(card.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-start mb-4 space-x-4">
                    {card.icon}
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{card.description}</p>
                  {card.link ? (
                    <Link
                      href={card.link}
                      className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
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
                          className="block text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        >
                          {sublink.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className={`h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform origin-left transition-all duration-300 ease-out ${
                    hoveredCard === card.title ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
