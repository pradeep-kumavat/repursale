"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { SortConfig, Buyer } from "../types";

interface TableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: keyof Buyer | 'totalAmount') => void;
  onSelectAll: () => void;
  allSelected: boolean;
  hasEntries: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortConfig,
  onSort,
  onSelectAll,
  allSelected,
  hasEntries
}) => {
  const SortIcon = ({ column }: { column: string }) => {
    if (!sortConfig || sortConfig.key !== column) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="inline-block ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="inline-block ml-1 h-4 w-4" />
    );
  };

  return (
    <thead className="bg-blue-800 text-white">
      <tr>
        <th className="px-6 py-4 text-sm font-semibold tracking-wider">
          <input
            type="checkbox"
            checked={allSelected && hasEntries}
            onChange={onSelectAll}
            disabled={!hasEntries}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </th>
        <th 
          onClick={() => onSort('buyerName')}
          className="px-6 py-4 text-sm font-semibold tracking-wider cursor-pointer group hover:bg-blue-700 transition-colors duration-150"
        >
          Buyer <SortIcon column="buyerName" />
        </th>
        <th 
          onClick={() => onSort('buyerGST')}
          className="px-6 py-4 text-sm font-semibold tracking-wider cursor-pointer group hover:bg-blue-700 transition-colors duration-150"
        >
          GST <SortIcon column="buyerGST" />
        </th>
        <th 
          onClick={() => onSort('placeOfSupply')}
          className="px-6 py-4 text-sm font-semibold tracking-wider cursor-pointer group hover:bg-blue-700 transition-colors duration-150"
        >
          Place <SortIcon column="placeOfSupply" />
        </th>
        <th 
          onClick={() => onSort('invoiceNo')}
          className="px-6 py-4 text-sm font-semibold tracking-wider cursor-pointer group hover:bg-blue-700 transition-colors duration-150"
        >
          Invoice <SortIcon column="invoiceNo" />
        </th>
        <th 
          onClick={() => onSort('invoiceDate')}
          className="px-6 py-4 text-sm font-semibold tracking-wider cursor-pointer group hover:bg-blue-700 transition-colors duration-150"
        >
          Date <SortIcon column="invoiceDate" />
        </th>
        <th 
          onClick={() => onSort('totalAmount')}
          className="px-6 py-4 text-sm font-semibold tracking-wider text-right cursor-pointer group hover:bg-blue-700 transition-colors duration-150"
        >
          Amount <SortIcon column="totalAmount" />
        </th>
        <th className="px-6 py-4 text-sm font-semibold tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader; 