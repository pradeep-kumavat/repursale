"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
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
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/invoices/${buyer._id}/pdf`);
      
      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${buyer.invoiceNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          title="Download Invoice"
        >
          <Download size={16} />
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </td>
    </tr>
  );
};

export default TableRow; 