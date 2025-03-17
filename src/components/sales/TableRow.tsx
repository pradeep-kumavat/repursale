"use client";

import React from "react";
import { Buyer } from "../types";

interface TableRowProps {
  buyer: Buyer;
  isSelected: boolean;
  onRowClick: (buyer: Buyer) => void;
  onSelectEntry: (buyerId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  buyer,
  isSelected,
  onRowClick,
  onSelectEntry
}) => {
  return (
    <tr
      onClick={() => onRowClick(buyer)}
      className={`hover:bg-blue-800/50 transition-colors duration-150 cursor-pointer ${isSelected ? 'bg-blue-800/70' : ''}`}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectEntry(buyer._id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <div className="font-medium">{buyer.buyerName}</div>
        <div className="text-xs text-gray-400">{buyer.mobileNumber}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <div className="font-medium">{buyer.buyerGST}</div>
        <div className="text-xs text-gray-400">{buyer.state}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <div className="font-medium">{buyer.placeOfSupply}</div>
        <div className="text-xs text-gray-400">{buyer.district}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <div className="font-medium">{buyer.invoiceNo}</div>
        <div className="text-xs text-gray-400">{buyer.transport}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <div className="font-medium">{new Date(buyer.invoiceDate).toLocaleDateString()}</div>
        <div className="text-xs text-gray-400">{buyer.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-right">
        <div className="font-medium">₹{Number(buyer.value.totalAmount).toLocaleString("en-IN")}</div>
        <div className="text-xs text-gray-400">
          CGST: {buyer.value.cgst}% | SGST: {buyer.value.sgst}%
        </div>
      </td>
    </tr>
  );
};

export default TableRow; 