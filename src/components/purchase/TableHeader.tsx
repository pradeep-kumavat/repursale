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
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronUp className="inline-block ml-2 opacity-30 group-hover:opacity-100 transition-opacity" size={14} />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="inline-block ml-2" size={14} />
      : <ChevronDown className="inline-block ml-2" size={14} />;
  };

  const columns = [
    { key: 'buyerName', label: 'Buyer Name' },
    { key: 'buyerGST', label: 'GST Number' },
    { key: 'placeOfSupply', label: 'Place of Supply' },
    { key: 'invoiceNo', label: 'Invoice Number' },
    { key: 'invoiceDate', label: 'Invoice Date' },
    { key: 'totalAmount', label: 'Total Amount' }
  ];

  return (
    <thead>
      <tr className="bg-blue-800 text-white">
        <th className="px-6 py-4 text-sm font-semibold">
          <input
            type="checkbox"
            checked={allSelected && hasEntries}
            onChange={onSelectAll}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </th>
        {columns.map((column) => (
          <th 
            key={column.key}
            onClick={() => onSort(column.key as keyof Buyer | 'totalAmount')}
            className={`
              px-6 py-4 text-sm font-semibold tracking-wider cursor-pointer
              group hover:bg-blue-700 transition-colors duration-150
              ${column.key === 'totalAmount' ? 'text-right' : 'text-left'}
            `}
          >
            <span className="flex items-center justify-start gap-2">
              {column.label}
              <SortIcon columnKey={column.key} />
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader; 