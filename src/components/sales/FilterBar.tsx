"use client";

import React from "react";
import { Download, Search, Calendar, List } from "lucide-react";

interface FilterBarProps {
  filter: string;
  selectedMonth: string;
  selectedYear: string;
  entriesPerPage: string;
  selectedEntriesCount: number;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onEntriesPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onExportClick: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  selectedMonth,
  selectedYear,
  entriesPerPage,
  selectedEntriesCount,
  onFilterChange,
  onMonthChange,
  onYearChange,
  onEntriesPerPageChange,
  onExportClick,
}) => {
  // Generate array of years from 2020 to current year
  const years = Array.from(
    { length: new Date().getFullYear() - 2020 + 1 },
    (_, i) => (2020 + i).toString()
  ).reverse();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={filter}
          onChange={onFilterChange}
          placeholder="Search by name, GST, place, or invoice"
          className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900/50 placeholder-gray-400 transition-all duration-300 pl-10"
        />
      </div>

      <div className="md:w-25 relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <select
          value={selectedYear}
          onChange={onYearChange}
          className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900/50 transition-all duration-300 pl-10"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="md:w-30">
        <select
          value={selectedMonth}
          onChange={onMonthChange}
          className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900/50 transition-all duration-300"
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      
      <div className="md:w-35 relative">
        <List className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <select
          value={entriesPerPage}
          onChange={onEntriesPerPageChange}
          className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900/50 transition-all duration-300 pl-10"
        >
          <option value="10">10 entries</option>
          <option value="25">25 entries</option>
          <option value="50">50 entries</option>
          <option value="100">100 entries</option>
        </select>
      </div>

      <button
        onClick={onExportClick}
        className="md:w-48 p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        disabled={selectedEntriesCount === 0}
      >
        <Download size={20} />
        Export Selected ({selectedEntriesCount})
      </button>
    </div>
  );
};

export default FilterBar; 