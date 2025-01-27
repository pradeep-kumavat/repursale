"use client";
import { useState } from "react";
import { Trash2, PlusCircle } from 'lucide-react';
import axios from "axios";

const salesForm: React.FC = () => {
  const [data, setData] = useState({
    buyerName: "",
    mobileNumber: "",
    placeOfSupply: "",
    buyerGST: "",
    state: "",
    district: "",
    invoiceNo: "",
    invoiceDate: "",
    transport: "",
    type: "",
  });

  const [products, setProducts] = useState([
    {
      description: "",
      hsnCode: "",
      quantity: "",
      rate: "",
      taxableAmount: "",
    },
  ]);
  const [value, setValue] = useState({
      cgst: "",
      sgst: "",
      totalAmount: "",
    }
  );

  const addProduct = () => {
    setProducts([
      ...products,
      {
        description: "",
        hsnCode: "",
        quantity: "",
        rate: "",
        taxableAmount: "",
      },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof typeof products[0],
    value: string
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    if (field === "quantity" || field === "rate") {
      const quantity = parseFloat(updatedProducts[index].quantity || "0");
      const rate = parseFloat(updatedProducts[index].rate || "0");
      updatedProducts[index].taxableAmount = (quantity * rate).toFixed(2);
    }

    setProducts(updatedProducts);
  };

  const handleFormChange: (field: keyof typeof data, value: string) => void = (
    field: keyof typeof data,
    value: string
  ) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...data, products, value };
    console.log("Submitting form:", payload);

    try {
      const response = await axios.post("/api/addEntry", payload);
      if (response.status == 201) {
        alert("Submitted successfully!");
        // Optionally reset the form
        setData({
          buyerName: "",
          mobileNumber: "",
          placeOfSupply: "",
          buyerGST: "",
          state: "",
          district: "",
          invoiceNo: "",
          invoiceDate: "",
          transport: "",
          type: "",
        });
        setProducts([
          {
            description: "",
            hsnCode: "",
            quantity: "",
            rate: "",
            taxableAmount: "",
          },
        ]);
        setValue({
          cgst: "",
          sgst: "",
          totalAmount: "",
        });
      } else {
        alert("Failed to Submit.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
  <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 overflow-y-auto">
  <h1 className="text-3xl font-bold mb-5 w-full p-4">Add Invoice Entry</h1>
  {/* add a select button to type purchase or sale invoide and then show the form accordingly */}
  <div className="flex flex-wrap gap-6 ml-5 mb-5">
    <div className="w-1/4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Type
      </label>
      <select
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={data.type}
        onChange={(e) => handleFormChange("type", e.target.value)}
      >
        <option value="">Select a type</option>
        <option value="purchase">Purchase</option>
        <option value="sale">Sale</option>
      </select>
    </div>
  </div>

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
        value={data.mobileNumber}
        onChange={(e) =>
          handleFormChange("mobileNumber", e.target.value)
        }
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
        value={data.placeOfSupply}
        onChange={(e) =>
          handleFormChange("placeOfSupply", e.target.value)
        }
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
        value={data.buyerGST}
        onChange={(e) =>
          handleFormChange("buyerGST", e.target.value)
        }
      />
    </div>
  </div>
  <div className="flex flex-wrap gap-6">
  <div className="w-1/4">
  <label className="block text-sm font-medium text-gray-300 mb-2">
    State
  </label>
  <select
    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    value={data.state}
    onChange={(e) => handleFormChange("state", e.target.value)}
  >
    <option value="">Select a state</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>

    <div className="w-1/4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        District
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter district"
        value={data.district}
        onChange={(e) =>
          handleFormChange("district", e.target.value)
        }
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
            value={data.invoiceNo}
            onChange={(e) =>
              handleFormChange("invoiceNo", e.target.value)
            }
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Invoice Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.invoiceDate}
            onChange={(e) =>
              handleFormChange("invoiceDate", e.target.value)
            }
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
            value={data.transport}
            onChange={(e) =>
              handleFormChange("transport", e.target.value)
            }
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

      {/* Taxable Amount */}
      <div className="flex flex-1 gap-6">
        <div className="flex-none w-[200px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Taxable Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter taxable amount"
            value={product.taxableAmount}
            onChange={(e) =>
              handleInputChange(index, "taxableAmount", e.target.value)
            }
          />
        </div>
      </div>

      {/* Remove Button */}
      {products.length > 1 && (
      <button
        onClick={() => removeProduct(index)}
        className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 flex items-center space-x-2"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      )}
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

  {/*  CGST, SGST, Total Amount Fields */}
  <div className="flex flex-wrap gap-6 mt-4">
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
        value={value.cgst}
        onChange={(e) => setValue({ ...value, cgst: e.target.value })}
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
        value={value.sgst}
        onChange={(e) => setValue({ ...value, sgst: e.target.value })}
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
        value={value.totalAmount}
        onChange={(e) => setValue({ ...value, totalAmount: e.target.value })}
      />
    </div>
  </div>
</div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-800 py-2 px-4 text-white rounded-lg hover:bg-blue-850 focus:ring-4 focus:ring-blue-500 focus:outline-none font-semibold"
      onClick={handleSubmit}
    >
       Submit
    </button>
  </div>
</div>
  );
};

export default salesForm;
