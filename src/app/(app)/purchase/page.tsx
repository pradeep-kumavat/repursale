"use client";
import { useState } from "react";
import { Trash2, PlusCircle } from 'lucide-react';

const purchaseForm: React.FC = () => {
  const [products, setProducts] = useState([
    {
      description: "",
      hsnCode: "",
      quantity: "",
      rate: "",
      amount: "",
      cgst: "",
      sgst: "",
      roundOff: "",
      totalAmount: "",
    },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        description: "",
        hsnCode: "",
        quantity: "",
        rate: "",
        amount: "",
        cgst: "",
        sgst: "",
        roundOff: "",
        totalAmount: "",
      },
    ]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  interface Product {
    description: string;
    hsnCode: string;
    quantity: string;
    rate: string;
    amount: string;
    cgst: string;
    sgst: string;
    roundOff: string;
    totalAmount: string;
  }

  const handleInputChange = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", products);
    alert("Form submitted successfully!");
  };

  return (
  <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 overflow-y-auto">
  <h1 className="text-3xl font-bold mb-5 w-full p-4">Purchase Invoice</h1>
  <div className="w-full max-w-6xl space-y-6 px-6">
    {/* Buyer Details */}
<div className="space-y-4">
  <h2 className="text-xl font-semibold mb-2">Buyer Details</h2>
  <div className="flex flex-wrap gap-6">
    <div className="flex-[2]">
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
  </div>
  <div className="flex flex-wrap gap-6">
    <div className="flex-[1.5]">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Place of Supply
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter place of supply"
      />
    </div>
    <div className="flex-[1.5]">
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
    <div className="w-1/4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        State
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter state"
      />
    </div>
    <div className="w-1/4">
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
<div className="space-y-8">
  <h2 className="text-xl font-semibold mb-4">Product Details</h2>
  {products.map((product, index) => (
    <div key={index} className="space-y-4 border-b border-gray-600 pb-4">
      <div className="flex flex-wrap gap-6">
        {/* Product Description */}
        <div className="flex-1 min-w-[350px] h-[150px] mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Product Description
        </label>
        <textarea
          className="w-full h-[150px] px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter product description"
          value={product.description}
          onChange={(e) =>
            handleInputChange(index, "description", e.target.value)
          }
        />
      </div>

        {/* HSN Code */}
        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            HSN Code
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter HSN code"
            value={product.hsnCode}
            onChange={(e) =>
              handleInputChange(index, "hsnCode", e.target.value)
            }
          />
        </div>

        {/* Quantity */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter quantity"
            value={product.quantity}
            onChange={(e) =>
              handleInputChange(index, "quantity", e.target.value)
            }
          />
        </div>

        {/* Rate */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rate
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter rate"
            value={product.rate}
            onChange={(e) => handleInputChange(index, "rate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Amount */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter amount"
            value={product.amount}
            onChange={(e) =>
              handleInputChange(index, "amount", e.target.value)
            }
          />
        </div>

        {/* CGST */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CGST
          </label>
          <input
            type="number"
            step="1.0"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter CGST"
            value={product.cgst}
            onChange={(e) => handleInputChange(index, "cgst", e.target.value)}
          />
        </div>

        {/* SGST */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            SGST
          </label>
          <input
            type="number"
            step="1.0"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter SGST"
            value={product.sgst}
            onChange={(e) => handleInputChange(index, "sgst", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Round Off */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Round Off
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter round off amount"
            value={product.roundOff}
            onChange={(e) =>
              handleInputChange(index, "roundOff", e.target.value)
            }
          />
        </div>

        {/* Total Amount */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Total Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter total amount"
            value={product.totalAmount}
            onChange={(e) =>
              handleInputChange(index, "totalAmount", e.target.value)
            }
          />
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeProduct(index)}
        className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 flex items-center space-x-2"
      >
        <Trash2 className="w-5 h-5" />
        <span>Remove</span>
      </button>
    </div>
  ))}

  {/* Add Product Button */}
  <button
    onClick={addProduct}
    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center space-x-2"
  >
    <PlusCircle className="w-5 h-5" />
    <span>Add Product</span>
  </button>
</div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-800 py-2 px-4 text-white rounded-lg hover:bg-blue-850 focus:ring-4 focus:ring-blue-500 focus:outline-none font-semibold"
    >
      Create Invoice
    </button>
  </div>
</div>
  );
};

export default purchaseForm;
