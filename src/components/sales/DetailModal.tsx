"use client";

import React from "react";
import { X } from "lucide-react";
import { Buyer } from "../types";

interface DetailModalProps {
  buyer: Buyer;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ buyer, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-blue-900 text-white w-full max-w-4xl mx-4 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto border border-blue-800">
        <div className="sticky top-0 bg-blue-800 p-6 rounded-t-2xl flex justify-between items-center border-b border-blue-700">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-150"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-3">Buyer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Name:</span>
                  <span className="text-gray-100">{buyer.buyerName}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Mobile:</span>
                  <span className="text-gray-100">{buyer.mobileNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">GST Number:</span>
                  <span className="text-gray-100">{buyer.buyerGST}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">State:</span>
                  <span className="text-gray-100">{buyer.state}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">District:</span>
                  <span className="text-gray-100">{buyer.district}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Place of Supply:</span>
                  <span className="text-gray-100">{buyer.placeOfSupply}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-3">Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Invoice Number:</span>
                  <span className="text-gray-100">{buyer.invoiceNo}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Invoice Date:</span>
                  <span className="text-gray-100">{new Date(buyer.invoiceDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Transport:</span>
                  <span className="text-gray-100">{buyer.transport}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Type:</span>
                  <span className="text-gray-100">{buyer.type}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-3">Products</h3>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-blue-800">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left">Product</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left">HSN</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right">Quantity</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right">Rate</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900 divide-y divide-blue-800">
                  {buyer.products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{product.hsn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-right">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-right">₹{Number(product.rate).toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-right">₹{Number(product.amount).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-3">Tax and Total</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">Taxable Value:</span>
                  <span className="text-gray-100">₹{Number(buyer.value.taxableValue).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">CGST Rate:</span>
                  <span className="text-gray-100">{buyer.value.cgst}%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">CGST Amount:</span>
                  <span className="text-gray-100">₹{Number(buyer.value.cgstValue).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">SGST Rate:</span>
                  <span className="text-gray-100">{buyer.value.sgst}%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200">SGST Amount:</span>
                  <span className="text-gray-100">₹{Number(buyer.value.sgstValue).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-blue-200 text-lg">Total Amount:</span>
                  <span className="text-white font-bold text-lg">₹{Number(buyer.value.totalAmount).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal; 