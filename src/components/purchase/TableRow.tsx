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
      className="hover:bg-blue-800 transition-colors duration-150 cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectEntry(buyer._id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        {buyer.buyerName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        {buyer.buyerGST}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        {buyer.placeOfSupply}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        {buyer.invoiceNo}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        {new Date(buyer.invoiceDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-right">
        ₹{Number(buyer.value.totalAmount).toLocaleString("en-IN")}
      </td>
    </tr>
  );
};

export default TableRow; 