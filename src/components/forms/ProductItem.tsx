import React from 'react';
import { Trash2 } from 'lucide-react';
import FormTextarea from './FormTextarea';
import FormInput from './FormInput';
import FormButton from './FormButton';

export interface Product {
  description: string;
  hsnCode: string;
  quantity: string;
  rate: string;
  taxableAmount: string;
}

interface ProductItemProps {
  product: Product;
  index: number;
  onInputChange: (index: number, field: keyof Product, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  index,
  onInputChange,
  onRemove,
  canRemove,
}) => {
  return (
    <div className="space-y-4 border-b border-gray-600 pb-4">
      <div className="flex flex-wrap gap-6">
        {/* Product Description */}
        <FormTextarea
          label="Product Description"
          placeholder="Enter product description"
          value={product.description}
          onChange={(value) => onInputChange(index, "description", value)}
          className="flex-1 min-w-[350px] mb-6"
          height="h-[150px]"
        />

        <div className="flex flex-col gap-4 flex-1 min-w-[220px]">
          {/* HSN Code */}
          <FormInput
            label="HSN Code"
            type="number"
            placeholder="Enter HSN code"
            value={product.hsnCode}
            onChange={(value) => onInputChange(index, "hsnCode", value)}
          />
          
          {/* Taxable Amount */}
          <FormInput
            label="Taxable Amount"
            type="number"
            placeholder="Enter taxable amount"
            value={product.taxableAmount}
            onChange={(value) => onInputChange(index, "taxableAmount", value)}
          />
        </div>

        {/* Quantity */}
        <FormInput
          label="Quantity"
          type="number"
          placeholder="Enter quantity"
          value={product.quantity}
          onChange={(value) => onInputChange(index, "quantity", value)}
          className="flex-1 min-w-[120px]"
        />

        {/* Rate */}
        <FormInput
          label="Rate"
          type="number"
          placeholder="Enter rate"
          value={product.rate}
          onChange={(value) => onInputChange(index, "rate", value)}
          className="flex-1 min-w-[120px]"
        />
      </div>

      {/* Remove Button */}
      <div className="flex justify-end mt-2">
        <FormButton
          onClick={() => onRemove(index)}
          variant="danger"
          disabled={!canRemove}
        >
          <Trash2 className="w-5 h-5" />
          <span>Remove</span>
        </FormButton>
      </div>
    </div>
  );
};

export default ProductItem; 