"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  Menu,
  X,
  LayoutDashboard,
  BadgePlus,
  Package,
  BarChart2,
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
  { name: "Add Invoice", icon: BadgePlus, link: "/addEntry" },
  { name: "Inventory", icon: Package, link: "/inventory" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-gray-900 border-r border-gray-800 ${
          isMenuOpen ? "w-72" : "w-20"
        } transition-all duration-300 shadow-xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          {isMenuOpen && (
            <h1 className="text-xl font-bold text-gray-100 flex-1">Menu</h1>
          )}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (!isMenuOpen) setIsReportsOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                pathname === item.link
                  ? "bg-indigo-900/50 text-indigo-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              }`}
            >
              <item.icon className={`h-5 w-5 ${pathname === item.link ? "text-indigo-400" : "text-gray-500"}`} />
              {isMenuOpen && <span className="ml-3 font-medium">{item.name}</span>}
            </Link>
          ))}

          {/* Reports Section */}
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={() => isMenuOpen && setIsReportsOpen(!isReportsOpen)}
              className={`flex items-center w-full p-3 rounded-lg ${
                pathname.includes("/reports")
                  ? "bg-indigo-900/50 text-indigo-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              }`}
            >
              <div className="flex items-center flex-1">
                <BarChart2 className={`h-5 w-5 ${pathname.includes("/reports") ? "text-indigo-400" : "text-gray-500"}`} />
                {isMenuOpen && <span className="ml-3 font-medium">Reports</span>}
              </div>
              {isMenuOpen && (
                <div className="text-gray-500">
                  {isReportsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              )}
            </button>

            {isReportsOpen && isMenuOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {[
                  { name: "Purchase Records", path: "/reports/purchase-reports" },
                  { name: "Sales Records", path: "/reports/sales-reports" },
                ].map((report) => (
                  <Link
                    key={report.path}
                    href={report.path}
                    className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                      pathname === report.path
                        ? "bg-indigo-900/50 text-indigo-400"
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                    }`}
                  >
                    {report.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-100">
              {user?.fullName ?? "Loading..."}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400">
              <Bell className="h-5 w-5" />
            </button>
            
            <SignOutButton>
              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                <LogOut className="mr-2 h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </SignOutButton>
            
            <Link href="/settings">
            <button className="flex items-center px-4 py-2 bg-gray-800 text-gray-100 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              <Settings className="mr-2 h-5 w-5" />
              <span className="font-medium">Settings</span>
            </button>
          </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-950">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;