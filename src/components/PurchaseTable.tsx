"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, ChevronUp, ChevronDown, Download } from "lucide-react";
import * as XLSX from 'xlsx';

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

type SortConfig = {
  key: keyof Buyer | 'totalAmount';
  direction: 'asc' | 'desc';
} | null;

const PurchaseTable: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [entriesPerPage, setEntriesPerPage] = useState<string>("10");

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/addEntry");
        
        const saleBuyers = response.data.filter((buyer: Buyer) => buyer.type.toLowerCase() === "purchase");
        setBuyers(saleBuyers);
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

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleRowClick = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleCloseModal = () => {
    setSelectedBuyer(null);
  };

  const handleSort = (key: keyof Buyer | 'totalAmount') => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  const handleSelectEntry = (buyerId: string) => {
    const newSelected = new Set(selectedEntries);
    if (newSelected.has(buyerId)) {
      newSelected.delete(buyerId);
    } else {
      newSelected.add(buyerId);
    }
    setSelectedEntries(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedEntries.size === sortedAndFilteredBuyers.length) {
      setSelectedEntries(new Set());
    } else {
      setSelectedEntries(new Set(sortedAndFilteredBuyers.map(buyer => buyer._id)));
    }
  };

  const getSortedBuyers = (buyers: Buyer[]) => {
    if (!sortConfig) return buyers;

    return [...buyers].sort((a, b) => {
      if (sortConfig.key === 'totalAmount') {
        const aValue = parseFloat(a.value.totalAmount);
        const bValue = parseFloat(b.value.totalAmount);
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }

      if (sortConfig.key === 'invoiceDate') {
        const aDate = new Date(a[sortConfig.key]).getTime();
        const bDate = new Date(b[sortConfig.key]).getTime();
        return sortConfig.direction === 'asc' 
          ? aDate - bDate 
          : bDate - aDate;
      }

      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });
  };

  const calculateTotals = (entries: Buyer[]) => {
    return entries.reduce((acc, entry) => {
      const taxableValue = entry.products.reduce((sum, product) => 
        sum + parseFloat(product.taxableAmount), 0);
      const cgstAmount = (parseFloat(entry.value.cgst) / 100) * taxableValue;
      const sgstAmount = (parseFloat(entry.value.sgst) / 100) * taxableValue;
      
      return {
        totalTaxableValue: acc.totalTaxableValue + taxableValue,
        totalCGST: acc.totalCGST + cgstAmount,
        totalSGST: acc.totalSGST + sgstAmount,
        totalInvoiceValue: acc.totalInvoiceValue + parseFloat(entry.value.totalAmount)
      };
    }, {
      totalTaxableValue: 0,
      totalCGST: 0,
      totalSGST: 0,
      totalInvoiceValue: 0
    });
  };

  const exportToExcel = () => {
    const selectedBuyers = sortedAndFilteredBuyers.filter(buyer => 
      selectedEntries.has(buyer._id)
    );

    if (selectedBuyers.length === 0) {
      alert("Please select entries to export");
      return;
    }

    const wb = XLSX.utils.book_new();
    
    // Create Sales Register worksheet
    const purchaseWS = XLSX.utils.aoa_to_sheet([
      ['S. no.', 'Receiver Name', 'GSTIN/UIN of Recipient', 'Invoice Number', 'Invoice date', 'Taxable Value', 'Rate', 'CGST', 'SGST', 'Invoice Value'],
    ]);

    // Add sales entries
    const purchaseData = selectedBuyers.map((buyer, index) => {
      const taxableValue = buyer.products.reduce((sum, product) => 
        sum + parseFloat(product.taxableAmount), 0);
      const cgstAmount = (parseFloat(buyer.value.cgst) / 100) * taxableValue;
      const sgstAmount = (parseFloat(buyer.value.sgst) / 100) * taxableValue;

      return [
        index + 1,
        buyer.buyerName,
        buyer.buyerGST,
        buyer.invoiceNo,
        new Date(buyer.invoiceDate).toLocaleDateString('en-IN'),
        taxableValue.toFixed(2),
        buyer.value.cgst,
        cgstAmount.toFixed(2),
        sgstAmount.toFixed(2),
        parseFloat(buyer.value.totalAmount).toFixed(2)
      ];
    });

    // Add sales data and totals
    const purchaseTotals = calculateTotals(selectedBuyers);
    const purchaseWithTotals = [
      ...purchaseData,
      ['TOTAL', '', '', '', '', 
        purchaseTotals.totalTaxableValue.toFixed(2), '',
        purchaseTotals.totalCGST.toFixed(2),
        purchaseTotals.totalSGST.toFixed(2),
        purchaseTotals.totalInvoiceValue.toFixed(2)
      ]
    ];

    XLSX.utils.sheet_add_aoa(purchaseWS, purchaseWithTotals, { origin: 'A2' });

    // Add summary section

    XLSX.utils.sheet_add_aoa(purchaseWS, [], { origin: `A${purchaseWithTotals.length + 3}` });

    // Set column widths
    purchaseWS['!cols'] = [
      { wch: 6 },   // S.no.
      { wch: 30 },  // Receiver Name
      { wch: 25 },  // GSTIN/UIN
      { wch: 15 },  // Invoice Number
      { wch: 12 },  // Invoice Date
      { wch: 15 },  // Taxable Value
      { wch: 8 },   // Rate
      { wch: 12 },  // CGST
      { wch: 12 },  // SGST
      { wch: 15 }   // Invoice Value
    ];

    // Apply styles
    const range = XLSX.utils.decode_range(purchaseWS['!ref'] || 'A1:J1');
    for (let R = range.s.r; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        if (!purchaseWS[addr]) continue;
        
        purchaseWS[addr].s = {
          font: { bold: R === 0 || R === purchaseData.length + 1 },
          alignment: { 
            horizontal: C >= 5 ? 'right' : 'left',
            vertical: 'center'
          },
          numFmt: C >= 5 ? '#,##0.00' : '@'
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, purchaseWS, "Purchase Register");

    // Generate filename
    const month = selectedMonth 
      ? new Date(2024, parseInt(selectedMonth) - 1).toLocaleDateString('en-US', { month: 'long' })
      : 'All_Months';
    const fileName = `AC_ZONE_Purchase_Register_${month}_${new Date().toISOString().split('T')[0]}.xlsx`;

    XLSX.writeFile(wb, fileName);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Generate array of years from 2020 to current year
  const years = Array.from(
    { length: new Date().getFullYear() - 2020 + 1 },
    (_, i) => (2020 + i).toString()
  ).reverse();


  const filteredBuyers = buyers.filter((buyer) => {
    const invoiceDate = new Date(buyer.invoiceDate);
    const invoiceMonth = invoiceDate.getMonth() + 1;
    const invoiceYear = invoiceDate.getFullYear().toString();
    const selectedMonthNum = selectedMonth ? parseInt(selectedMonth) : null;

    return (
      buyer.type.toLowerCase() === "purchase" &&
      (buyer.buyerName.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.buyerGST.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.placeOfSupply.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.invoiceNo.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.value.totalAmount.includes(filter)) &&
      (!selectedMonthNum || invoiceMonth === selectedMonthNum) &&
      invoiceYear === selectedYear
    );
  });

  const sortedAndFilteredBuyers = getSortedBuyers(filteredBuyers);

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronUp className="inline-block ml-2 opacity-30 group-hover:opacity-100 transition-opacity" size={14} />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="inline-block ml-2" size={14} />
      : <ChevronDown className="inline-block ml-2" size={14} />;
  };


  return (
    <div className="container mx-auto px-4 py-6">
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by name, GST, place, or invoice"
          className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900 placeholder-gray-400 transition-all duration-300"
        />
      </div>

      {/* Add Year Filter Dropdown */}
      <div className="md:w-25">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900 transition-all duration-300"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="md:w-30">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900 transition-all duration-300"
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
        
        <div className="md:w-35">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
            className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-white bg-blue-900 transition-all duration-300"
          >
            <option value="10">10 entries</option>
            <option value="25">25 entries</option>
            <option value="50">50 entries</option>
            <option value="100">100 entries</option>
          </select>
        </div>

        <button
          onClick={exportToExcel}
          className="md:w-48 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
          disabled={selectedEntries.size === 0}
        >
          <Download size={20} />
          Export Selected ({selectedEntries.size})
        </button>

      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-center py-4 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-blue-900 rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-800">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="px-6 py-4 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={selectedEntries.size === sortedAndFilteredBuyers.length && sortedAndFilteredBuyers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </th>
                  {[
                    { key: 'buyerName', label: 'Buyer Name' },
                    { key: 'buyerGST', label: 'GST Number' },
                    { key: 'placeOfSupply', label: 'Place of Supply' },
                    { key: 'invoiceNo', label: 'Invoice Number' },
                    { key: 'invoiceDate', label: 'Invoice Date' },
                    { key: 'totalAmount', label: 'Total Amount' }
                  ].map((column) => (
                    <th 
                      key={column.key}
                      onClick={() => handleSort(column.key as keyof Buyer | 'totalAmount')}
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
              <tbody className="bg-blue-900 divide-y divide-blue-800">
                {sortedAndFilteredBuyers
                  .slice(0, parseInt(entriesPerPage))
                  .map((buyer) => (
                  <tr
                    key={buyer._id}
                    onClick={() => handleRowClick(buyer)}
                    className="hover:bg-blue-800 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEntries.has(buyer._id)}
                        onChange={() => handleSelectEntry(buyer._id)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </td>
                    {/* The rest of your existing table cell code */}
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
                ))}
                {sortedAndFilteredBuyers.length === 0 && (
                  <tr>
                    <td 
                      colSpan={7} 
                      className="px-6 py-8 text-center text-gray-400 bg-blue-900"
                    >
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

{/* Modal */}
{selectedBuyer && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="bg-blue-900 text-white w-full max-w-4xl mx-4 rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-blue-800 p-4 rounded-t-xl flex justify-between items-center">
        <h2 className="text-2xl font-bold">Details</h2>
        <button
          onClick={handleCloseModal}
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
              <span>{selectedBuyer.buyerName}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">GST Number:</span>
              <span>{selectedBuyer.buyerGST}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Mobile Number:</span>
              <span>{selectedBuyer.mobileNumber}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Place of Supply:</span>
              <span>{selectedBuyer.placeOfSupply}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">State:</span>
              <span>{selectedBuyer.state}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">District:</span>
              <span>{selectedBuyer.district}</span>
            </p>
          </div>
        </div>

        {/* Invoice Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold border-b border-blue-700 pb-2">Invoice Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex justify-between">
              <span className="font-semibold">Invoice Number:</span>
              <span>{selectedBuyer.invoiceNo}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Invoice Date:</span>
              <span>{new Date(selectedBuyer.invoiceDate).toLocaleDateString()}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Transport:</span>
              <span>{selectedBuyer.transport}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Type:</span>
              <span className="capitalize">{selectedBuyer.type}</span>
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
                {selectedBuyer.products.map((product) => (
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
              <span>{Number(selectedBuyer.value.cgst).toLocaleString("en-IN")}%</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">SGST:</span>
              <span>{Number(selectedBuyer.value.sgst).toLocaleString("en-IN")}%</span>
            </p>
            <p className="flex justify-between col-span-2">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-lg font-bold">₹{Number(selectedBuyer.value.totalAmount).toLocaleString("en-IN")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
</div>
);
};

export default PurchaseTable;