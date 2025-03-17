import React from 'react';
import FormInput from './FormInput';

export interface InvoiceData {
  invoiceNo: string;
  invoiceDate: string;
  transport: string;
}

interface InvoiceDetailsSectionProps {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: string) => void;
}

const InvoiceDetailsSection: React.FC<InvoiceDetailsSectionProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
      
      <div className="flex flex-wrap gap-6">
        <FormInput
          label="Invoice No."
          type="text"
          placeholder="Enter invoice number"
          value={data.invoiceNo}
          onChange={(value) => onChange('invoiceNo', value)}
          className="flex-1"
          required
        />
        
        <FormInput
          label="Invoice Date"
          type="date"
          value={data.invoiceDate}
          onChange={(value) => onChange('invoiceDate', value)}
          className="flex-1"
          required
        />
        
        <FormInput
          label="Transport"
          type="text"
          placeholder="Enter transport details"
          value={data.transport}
          onChange={(value) => onChange('transport', value)}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default InvoiceDetailsSection; 