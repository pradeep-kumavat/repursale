"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { SignOutButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  Package,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
  { name: "Purchase", icon: ShoppingCart, link: "/purchase" },
  { name: "Sales", icon: TrendingUp, link: "/sales" },
  { name: "Inventory", icon: Package, link: "/inventory" },
  { name: "Reports", icon: BarChart2, link: "/reports" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { user } = useUser();
  const pathname = usePathname(); // Get the current route

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-gray-800 ${isMenuOpen ? "w-64" : "w-16"} transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center p-2 rounded-md ${
                pathname === item.link
                  ? "bg-blue-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isMenuOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="ml-2 font-semibold text-white">
              {user ? user.fullName : "Loading..."}
            </span>
          </div>
          <SignOutButton>
            <button className="flex items-center px-5 py-2 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </SignOutButton>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
