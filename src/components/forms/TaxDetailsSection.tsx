import React from 'react';
import FormInput from './FormInput';

export interface TaxData {
  cgst: string;
  sgst: string;
  totalAmount: string;
}

interface TaxDetailsSectionProps {
  data: TaxData;
  onChange: (field: keyof TaxData, value: string) => void;
}

const TaxDetailsSection: React.FC<TaxDetailsSectionProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Tax and Total</h2>
      
      <div className="flex flex-wrap gap-6">
        <FormInput
          label="CGST"
          type="number"
          placeholder="Enter CGST"
          value={data.cgst}
          onChange={(value) => onChange('cgst', value)}
          className="flex-1 min-w-[160px]"
          step="1.0"
          required
        />
        
        <FormInput
          label="SGST"
          type="number"
          placeholder="Enter SGST"
          value={data.sgst}
          onChange={(value) => onChange('sgst', value)}
          className="flex-1 min-w-[160px]"
          step="1.0"
          required
        />
        
        <FormInput
          label="Total Amount"
          type="number"
          placeholder="Enter total amount"
          value={data.totalAmount}
          onChange={(value) => onChange('totalAmount', value)}
          className="flex-1 min-w-[160px]"
          required
        />
      </div>
    </div>
  );
};

export default TaxDetailsSection; 