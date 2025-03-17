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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-blue-900 text-white w-full max-w-4xl mx-4 rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-800 p-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-2xl font-bold">Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-150"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Buyer Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-2">Buyer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="flex justify-between">
                <span className="font-semibold">Buyer Name:</span>
                <span>{buyer.buyerName}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">GST Number:</span>
                <span>{buyer.buyerGST}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Mobile Number:</span>
                <span>{buyer.mobileNumber}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Place of Supply:</span>
                <span>{buyer.placeOfSupply}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">State:</span>
                <span>{buyer.state}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">District:</span>
                <span>{buyer.district}</span>
              </p>
            </div>
          </div>

          {/* Invoice Details Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-2">Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="flex justify-between">
                <span className="font-semibold">Invoice Number:</span>
                <span>{buyer.invoiceNo}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Invoice Date:</span>
                <span>{new Date(buyer.invoiceDate).toLocaleDateString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Transport:</span>
                <span>{buyer.transport}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Type:</span>
                <span className="capitalize">{buyer.type}</span>
              </p>
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-2">Products</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-800">
                <thead>
                  <tr className="bg-blue-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">HSN Code</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Quantity</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Rate</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Taxable Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-800">
                  {buyer.products.map((product) => (
                    <tr key={product._id} className="hover:bg-blue-800">
                      <td className="px-4 py-3 text-sm">{product.description}</td>
                      <td className="px-4 py-3 text-sm">{product.hsnCode}</td>
                      <td className="px-4 py-3 text-sm text-right">{product.quantity}</td>
                      <td className="px-4 py-3 text-sm text-right">₹{Number(product.rate).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-sm text-right">₹{Number(product.taxableAmount).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax and Total Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-blue-700 pb-2">Tax and Total</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="flex justify-between">
                <span className="font-semibold">CGST:</span>
                <span>{Number(buyer.value.cgst).toLocaleString("en-IN")}%</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">SGST:</span>
                <span>{Number(buyer.value.sgst).toLocaleString("en-IN")}%</span>
              </p>
              <p className="flex justify-between col-span-2">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-lg font-bold">₹{Number(buyer.value.totalAmount).toLocaleString("en-IN")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal; 