import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, ArrowRight } from 'lucide-react';
import FormSelect from './FormSelect';
import BuyerDetailsSection, { BuyerData } from './BuyerDetailsSection';
import InvoiceDetailsSection, { InvoiceData } from './InvoiceDetailsSection';
import ProductsSection from './ProductsSection';
import TaxDetailsSection, { TaxData } from './TaxDetailsSection';
import FormButton from './FormButton';
import { Product } from './ProductItem';

interface InvoiceFormProps {
  // You can add props here if needed
}

const InvoiceForm: React.FC<InvoiceFormProps> = () => {
  // Form state
  const [invoiceType, setInvoiceType] = useState<string>('');
  
  const [buyerData, setBuyerData] = useState<BuyerData>({
    buyerName: '',
    mobileNumber: '',
    placeOfSupply: '',
    buyerGST: '',
    state: '',
    district: '',
  });
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNo: '',
    invoiceDate: '',
    transport: '',
  });
  
  const [products, setProducts] = useState<Product[]>([
    {
      description: '',
      hsnCode: '',
      quantity: '',
      rate: '',
      taxableAmount: '',
    },
  ]);
  
  const [taxData, setTaxData] = useState<TaxData>({
    cgst: '',
    sgst: '',
    totalAmount: '',
  });

  // Event handlers
  const handleBuyerDataChange = (field: keyof BuyerData, value: string) => {
    setBuyerData(prev => ({ ...prev, [field]: value }));
  };

  const handleInvoiceDataChange = (field: keyof InvoiceData, value: string) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const handleTaxDataChange = (field: keyof TaxData, value: string) => {
    setTaxData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductInputChange = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    if (field === 'quantity' || field === 'rate') {
      const quantity = parseFloat(updatedProducts[index].quantity || '0');
      const rate = parseFloat(updatedProducts[index].rate || '0');
      updatedProducts[index].taxableAmount = (quantity * rate).toFixed(2);
    }

    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        description: '',
        hsnCode: '',
        quantity: '',
        rate: '',
        taxableAmount: '',
      },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine all form data
    const formData = {
      ...buyerData,
      ...invoiceData,
      type: invoiceType,
      products,
      value: taxData,
    };
    
    console.log('Submitting form:', formData);

    try {
      const toastId = toast.loading('Submitting Invoice...');
      const response = await axios.post('/api/addEntry', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      toast.dismiss(toastId);
      
      if (response.status === 201) {
        toast.success('Form submitted successfully.');
        
        // Reset form
        setInvoiceType('');
        setBuyerData({
          buyerName: '',
          mobileNumber: '',
          placeOfSupply: '',
          buyerGST: '',
          state: '',
          district: '',
        });
        setInvoiceData({
          invoiceNo: '',
          invoiceDate: '',
          transport: '',
        });
        setProducts([
          {
            description: '',
            hsnCode: '',
            quantity: '',
            rate: '',
            taxableAmount: '',
          },
        ]);
        setTaxData({
          cgst: '',
          sgst: '',
          totalAmount: '',
        });
      } else {
        toast.error('Failed to submit Invoice.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };

  // Invoice type options
  const invoiceTypeOptions = [
    { value: '', label: 'Select a type' },
    { value: 'purchase', label: 'Purchase' },
    { value: 'sale', label: 'Sale' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white p-4 overflow-y-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-5 w-full p-4">Add Invoice Entry</h1>
      
      {/* Invoice Type Selection */}
      <div className="flex flex-wrap gap-6 ml-5 mb-5">
        <FormSelect
          label="Type"
          value={invoiceType}
          onChange={setInvoiceType}
          options={invoiceTypeOptions}
          className="w-1/4"
          required
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-6xl space-y-6 px-6">
        {/* Buyer Details */}
        <BuyerDetailsSection 
          data={buyerData} 
          onChange={handleBuyerDataChange} 
        />

        {/* Invoice Details */}
        <InvoiceDetailsSection 
          data={invoiceData} 
          onChange={handleInvoiceDataChange} 
        />

        {/* Product Details */}
        <ProductsSection 
          products={products}
          onAddProduct={addProduct}
          onRemoveProduct={removeProduct}
          onInputChange={handleProductInputChange}
        />

        {/* Tax Details */}
        <TaxDetailsSection 
          data={taxData} 
          onChange={handleTaxDataChange} 
        />

        {/* Submit Button */}
        <div className="mt-8 mb-4">
          <FormButton
            type="submit"
            variant="success"
            fullWidth
            className="py-3 justify-center shadow-lg hover:shadow-xl text-lg font-medium"
          >
            <Save className="w-5 h-5 mr-2" />
            <span>Submit Invoice</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </FormButton>
          <p className="text-center text-gray-400 text-sm mt-2">
            Click to save this invoice to your records
          </p>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm; 