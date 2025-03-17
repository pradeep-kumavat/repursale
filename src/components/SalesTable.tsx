"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buyer, SortConfig } from "./types";
import { filterBuyers, getSortedBuyers, exportToExcel } from "../utils/salesUtils";

// Import modularized components
import FilterBar from "./sales/FilterBar";
import TableHeader from "./sales/TableHeader";
import TableRow from "./sales/TableRow";
import DetailModal from "./sales/DetailModal";

const SalesTable: React.FC = () => {
  const { user } = useUser();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [entriesPerPage, setEntriesPerPage] = useState<string>("10");

  useEffect(() => {
    const fetchBuyers = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await axios.get("/api/addEntry");
        // Filter buyers whose type is "sale"
        const saleBuyers = response.data.filter((buyer: Buyer) => buyer.type.toLowerCase() === "sale");
        setBuyers(saleBuyers);
      } catch (err: unknown) {
        setError((err as Error).message || "Failed to fetch buyers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [user]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(e.target.value);
  };

  const handleRowClick = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleCloseModal = () => {
    setSelectedBuyer(null);
  };

  const handleSort = (key: keyof Buyer | 'totalAmount') => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  const handleSelectEntry = (buyerId: string) => {
    const newSelected = new Set(selectedEntries);
    if (newSelected.has(buyerId)) {
      newSelected.delete(buyerId);
    } else {
      newSelected.add(buyerId);
    }
    setSelectedEntries(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedEntries.size === sortedAndFilteredBuyers.length) {
      setSelectedEntries(new Set());
    } else {
      setSelectedEntries(new Set(sortedAndFilteredBuyers.map(buyer => buyer._id)));
    }
  };

  const handleExportClick = () => {
    const selectedBuyers = sortedAndFilteredBuyers.filter(buyer => 
      selectedEntries.has(buyer._id)
    );
    exportToExcel(selectedBuyers, selectedMonth);
  };

  // Filter and sort buyers
  const filteredBuyers = filterBuyers(buyers, filter, selectedMonth, selectedYear);
  const sortedAndFilteredBuyers = getSortedBuyers(filteredBuyers, sortConfig);

  return (
    <>
      {!user ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Please sign in to view your sales data
            </h2>
            {/* Add your sign-in button or redirect logic here */}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <FilterBar 
            filter={filter}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            entriesPerPage={entriesPerPage}
            selectedEntriesCount={selectedEntries.size}
            onFilterChange={handleFilterChange}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            onEntriesPerPageChange={handleEntriesPerPageChange}
            onExportClick={handleExportClick}
          />

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          {error && (
            <div className="text-red-500 text-center py-4 bg-red-100/10 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="bg-blue-900 rounded-2xl shadow-2xl overflow-hidden border border-blue-800">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-800">
                  <TableHeader 
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    onSelectAll={handleSelectAll}
                    allSelected={selectedEntries.size === sortedAndFilteredBuyers.length}
                    hasEntries={sortedAndFilteredBuyers.length > 0}
                  />
                  <tbody className="bg-blue-900 divide-y divide-blue-800">
                    {sortedAndFilteredBuyers
                      .slice(0, parseInt(entriesPerPage))
                      .map((buyer) => (
                        <TableRow 
                          key={buyer._id}
                          buyer={buyer}
                          isSelected={selectedEntries.has(buyer._id)}
                          onRowClick={handleRowClick}
                          onSelectEntry={handleSelectEntry}
                        />
                    ))}
                    {sortedAndFilteredBuyers.length === 0 && (
                      <tr>
                        <td 
                          colSpan={7} 
                          className="px-6 py-8 text-center text-gray-400 bg-blue-900"
                        >
                          No matching records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedBuyer && (
            <DetailModal 
              buyer={selectedBuyer}
              onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SalesTable;