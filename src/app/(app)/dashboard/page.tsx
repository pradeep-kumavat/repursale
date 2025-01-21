"use client";

import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900">
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Overview Cards */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">Create Purchase Invoice</h3>
              <p className="text-gray-300">Quickly create purchase invoices for your suppliers.</p>
              <Link
                href="/dashboard/purchase-invoice"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Create Now
              </Link>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">Create Sales Invoice</h3>
              <p className="text-gray-300">Create sales invoices for your customers.</p>
              <Link
                href="/dashboard/sales-invoice"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Create Now
              </Link>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">Manage Inventory</h3>
              <p className="text-gray-300">Track and manage your inventory efficiently.</p>
              <Link
                href="/dashboard/inventory"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Manage Now
              </Link>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">View Reports</h3>
              <p className="text-gray-300">Analyze reports for sales, purchases, and inventory.</p>
              <Link
                href="/dashboard/reports"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View Reports
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
