"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

interface Product {
  description: string;
  hsnCode: string;
  quantity: string;
  rate: string;
  taxableAmount: string;
  _id: string;
}

interface Buyer {
  _id: string;
  buyerName: string;
  mobileNumber: string;
  placeOfSupply: string;
  buyerGST: string;
  state: string;
  district: string;
  invoiceNo: string;
  invoiceDate: string;
  transport: string;
  type: string;
  value: {
    cgst: string;
    sgst: string;
    totalAmount: string;
  };
  products: Product[];
}

const BuyerTable: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/addEntry");
        setBuyers(response.data);
      } catch (err: unknown) {
        setError((err as Error).message || "Failed to fetch buyers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleRowClick = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleCloseModal = () => {
    setSelectedBuyer(null);
  };

  const filteredBuyers = buyers.filter((buyer) => {
    return (
      buyer.buyerName.toLowerCase().includes(filter.toLowerCase()) ||
      buyer.buyerGST.toLowerCase().includes(filter.toLowerCase()) ||
      buyer.placeOfSupply.toLowerCase().includes(filter.toLowerCase()) ||
      buyer.invoiceNo.toLowerCase().includes(filter.toLowerCase()) ||
      buyer.value.totalAmount.includes(filter)
    );
  });

  return (
    <div className="container mx-auto p-4">
      {/* Search Field */}
      <div className="mb-4">
        <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by name, GST, place, or invoice"
            className="w-full p-3 border border-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 text-white bg-blue-900 placeholder-gray-400 transition-all ease-in-out duration-300 "
        />
        </div>



      {loading && <p className="text-blue-900 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}


      {!loading && !error && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-900 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Buyer Name</th>
                <th className="py-3 px-6 text-left">GST Number</th>
                <th className="py-3 px-6 text-left">Place of Supply</th>
                <th className="py-3 px-6 text-left">Invoice Number</th>
                <th className="py-3 px-6 text-left">Invoice Date</th>
                <th className="py-3 px-6 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {filteredBuyers.map((buyer) => (
                <tr
                  key={buyer._id}
                  onClick={() => handleRowClick(buyer)}
                  className="border-b border-blue-800 hover:bg-blue-800 bg-blue-900 cursor-pointer"
                >
                  <td className="py-3 px-6 text-left">{buyer.buyerName}</td>
                  <td className="py-3 px-6 text-left">{buyer.buyerGST}</td>
                  <td className="py-3 px-6 text-left">{buyer.placeOfSupply}</td>
                  <td className="py-3 px-6 text-left">{buyer.invoiceNo}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(buyer.invoiceDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-right">
                    ₹{Number(buyer.value.totalAmount).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
              {filteredBuyers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-3 px-6 text-center">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

{selectedBuyer && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-blue-900 text-white w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900">
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-3 right-3 bg-blue-800 text-white p-2 rounded-full hover:bg-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
      >
        <X size={18} />
      </button>

      {/* Modal Header */}
      <h2 className="text-2xl font-bold mb-4 border-b border-blue-700 pb-2">
        {selectedBuyer.buyerName}
      </h2>

      {/* Buyer Details */}
      <div className="mb-4">
        <p>
          <strong>GST Number:</strong> {selectedBuyer.buyerGST}
        </p>
        <p>
          <strong>Mobile Number:</strong> {selectedBuyer.mobileNumber}
        </p>
        <p>
          <strong>Place of Supply:</strong> {selectedBuyer.placeOfSupply}
        </p>
        <p>
          <strong>State:</strong> {selectedBuyer.state}
        </p>
        <p>
          <strong>District:</strong> {selectedBuyer.district}
        </p>
        <p>
          <strong>Invoice Number:</strong> {selectedBuyer.invoiceNo}
        </p>
        <p>
          <strong>Invoice Date:</strong>{" "}
          {new Date(selectedBuyer.invoiceDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Transport:</strong> {selectedBuyer.transport}
        </p>
        <p>
          <strong>Type:</strong> {selectedBuyer.type}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹
          {Number(selectedBuyer.value.totalAmount).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Products Section */}
      <h3 className="text-xl font-bold mt-4 mb-2">Products</h3>
      <ul className="list-disc pl-6">
        {selectedBuyer.products.map((product) => (
          <li key={product._id} className="mb-2">
            <div className="flex justify-between">
              <strong>{product.description}</strong>
              <span>₹{product.taxableAmount}</span>
            </div>
            <div className="text-sm text-gray-300">
              <p>Quantity: {product.quantity}</p>
              <p>Rate: ₹{product.rate}</p>
              <p>Taxable Amount: ₹{product.taxableAmount}</p>
              <p>HSN Code: {product.hsnCode}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


    </div>
  );
};

export default BuyerTable;
