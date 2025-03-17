import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

export interface BuyerData {
  buyerName: string;
  mobileNumber: string;
  placeOfSupply: string;
  buyerGST: string;
  state: string;
  district: string;
}

interface BuyerDetailsSectionProps {
  data: BuyerData;
  onChange: (field: keyof BuyerData, value: string) => void;
}

const BuyerDetailsSection: React.FC<BuyerDetailsSectionProps> = ({
  data,
  onChange,
}) => {
  // List of Indian states
  const stateOptions = [
    { value: '', label: 'Select a state' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Buyer Details</h2>
      
      <div className="flex flex-wrap gap-6">
        <FormInput
          label="Buyer Name"
          type="text"
          placeholder="Enter buyer name"
          value={data.buyerName}
          onChange={(value) => onChange('buyerName', value)}
          className="flex-[2]"
          required
        />
        
        <FormInput
          label="Mobile Number"
          type="number"
          placeholder="Enter mobile number"
          value={data.mobileNumber}
          onChange={(value) => onChange('mobileNumber', value)}
          className="flex-1"
        />
      </div>
      
      <div className="flex flex-wrap gap-6">
        <FormInput
          label="Place of Supply"
          type="text"
          placeholder="Enter place of supply"
          value={data.placeOfSupply}
          onChange={(value) => onChange('placeOfSupply', value)}
          className="flex-[1.5]"
        />
        
        <FormInput
          label="Buyer GST"
          type="text"
          placeholder="Enter buyer GST"
          value={data.buyerGST}
          onChange={(value) => onChange('buyerGST', value)}
          className="flex-[1.5]"
        />
      </div>
      
      <div className="flex flex-wrap gap-6">
        <FormSelect
          label="State"
          value={data.state}
          onChange={(value) => onChange('state', value)}
          options={stateOptions}
          className="w-1/4"
        />
        
        <FormInput
          label="District"
          type="text"
          placeholder="Enter district"
          value={data.district}
          onChange={(value) => onChange('district', value)}
          className="w-1/4"
        />
      </div>
    </div>
  );
};

export default BuyerDetailsSection; 