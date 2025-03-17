import React from 'react';
import { PlusCircle } from 'lucide-react';
import ProductItem, { Product } from './ProductItem';
import FormButton from './FormButton';

interface ProductsSectionProps {
  products: Product[];
  onAddProduct: () => void;
  onRemoveProduct: (index: number) => void;
  onInputChange: (index: number, field: keyof Product, value: string) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onAddProduct,
  onRemoveProduct,
  onInputChange,
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Product Details</h2>
      
      {products.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          index={index}
          onInputChange={onInputChange}
          onRemove={onRemoveProduct}
          canRemove={products.length > 1}
        />
      ))}

      {/* Add Product Button */}
      <div className="flex justify-end mt-4">
        <FormButton
          onClick={onAddProduct}
          variant="secondary"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Product</span>
        </FormButton>
      </div>
    </div>
  );
};

export default ProductsSection; 