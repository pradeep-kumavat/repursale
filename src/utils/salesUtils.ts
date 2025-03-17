import { Buyer, SortConfig, TotalsData } from "../components/types";
import * as XLSX from 'xlsx';

export const getSortedBuyers = (buyers: Buyer[], sortConfig: SortConfig): Buyer[] => {
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

export const calculateTotals = (entries: Buyer[]): TotalsData => {
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

export const filterBuyers = (
  buyers: Buyer[], 
  filter: string, 
  selectedMonth: string, 
  selectedYear: string
): Buyer[] => {
  return buyers.filter((buyer) => {
    const invoiceDate = new Date(buyer.invoiceDate);
    const invoiceMonth = invoiceDate.getMonth() + 1;
    const invoiceYear = invoiceDate.getFullYear().toString();
    const selectedMonthNum = selectedMonth ? parseInt(selectedMonth) : null;

    return (
      (buyer.buyerName.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.buyerGST.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.placeOfSupply.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.invoiceNo.toLowerCase().includes(filter.toLowerCase()) ||
        buyer.value.totalAmount.includes(filter)) &&
      (!selectedMonthNum || invoiceMonth === selectedMonthNum) &&
      (!selectedYear || invoiceYear === selectedYear)
    );
  });
};

export const exportToExcel = (
  selectedBuyers: Buyer[],
  selectedMonth: string
): void => {
  if (selectedBuyers.length === 0) {
    alert("Please select entries to export");
    return;
  }

  const wb = XLSX.utils.book_new();
  
  // Create Sales Register worksheet
  const salesWS = XLSX.utils.aoa_to_sheet([
    ['S. no.', 'Receiver Name', 'GSTIN/UIN of Recipient', 'Invoice Number', 'Invoice date', 'Taxable Value', 'Rate', 'CGST', 'SGST', 'Invoice Value'],
  ]);

  // Add sales entries
  const salesData = selectedBuyers.map((buyer, index) => {
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
  const salesTotals = calculateTotals(selectedBuyers);
  const salesWithTotals = [
    ...salesData,
    ['TOTAL', '', '', '', '', 
      salesTotals.totalTaxableValue.toFixed(2), '',
      salesTotals.totalCGST.toFixed(2),
      salesTotals.totalSGST.toFixed(2),
      salesTotals.totalInvoiceValue.toFixed(2)
    ]
  ];

  XLSX.utils.sheet_add_aoa(salesWS, salesWithTotals, { origin: 'A2' });

  // Add summary section
  XLSX.utils.sheet_add_aoa(salesWS, [], { origin: `A${salesWithTotals.length + 3}` });

  // Set column widths
  salesWS['!cols'] = [
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
  const range = XLSX.utils.decode_range(salesWS['!ref'] || 'A1:J1');
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      if (!salesWS[addr]) continue;
      
      salesWS[addr].s = {
        font: { bold: R === 0 || R === salesData.length + 1 },
        alignment: { 
          horizontal: C >= 5 ? 'right' : 'left',
          vertical: 'center'
        },
        numFmt: C >= 5 ? '#,##0.00' : '@'
      };
    }
  }

  XLSX.utils.book_append_sheet(wb, salesWS, "Sales Register");

  // Generate filename
  const month = selectedMonth 
    ? new Date(2024, parseInt(selectedMonth) - 1).toLocaleDateString('en-US', { month: 'long' })
    : 'All_Months';
  const fileName = `Sales_Register_${month}_${new Date().toISOString().split('T')[0]}.xlsx`;

  XLSX.writeFile(wb, fileName);
}; 