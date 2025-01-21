"use client";
import { useState } from "react";

const FullScreenForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
  <h1 className="text-3xl font-bold mb-5 w-full p-4">Sales Invoice</h1>
  <div className="w-full max-w-6xl space-y-6 px-6">
    {/* Buyer Details */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Buyer Details</h2>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Buyer Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter buyer name"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter mobile number"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Place of Supply
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter place of supply"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Buyer GST
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter buyer GST"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter state"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            District
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter district"
          />
        </div>
      </div>
    </div>

    {/* Invoice Details */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Invoice No.
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter invoice number"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Invoice Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Transport
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter transport details"
          />
        </div>
      </div>
    </div>

    {/* Product Details */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Product Details</h2>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Description
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter product description"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            HSN Code
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter HSN code"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter quantity"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rate
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter rate"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CGST
          </label>
          <input
            type="number"
            step="1.0"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter CGST"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            SGST
          </label>
          <input
            type="number"
            step="1.0"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter SGST"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Round Off
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter round off amount"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Total Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter total amount"
          />
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 py-2 px-4 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none font-semibold"
    >
      Submit Invoice
    </button>
  </div>
</div>
  );
};

export default FullScreenForm;
