"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';


type AvailableProduct = {
  description: string;
  availableQuantity: number;
};


const tailwindAnimations = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

const tailwindExtensions = `
.bg-blue-750 {
  background-color: #1a4b8c;
}
`;

const AvailableStockPage = () => {
  const [availableProducts, setAvailableProducts] = useState<AvailableProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<AvailableProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAvailableStock = async () => {
      try {
        const response = await axios.get('/api/getAvailableStock');
        const data = response.data;
        
        if (data.success) {
          setAvailableProducts(data.data);
          setFilteredProducts(data.data);
        } else {
          setError(data.error || 'Failed to fetch available stock');
        }
      } catch (error) {
        console.error('Error fetching available stock:', error);
        setError('Failed to load available stock data');
      } finally {
        setLoading(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
    };

    fetchAvailableStock();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(availableProducts);
    } else {
      const filtered = availableProducts.filter(product => 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, availableProducts]);

  return (
    <>
      <style jsx global>{tailwindAnimations}</style>
      <style jsx global>{tailwindExtensions}</style>
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white tracking-wide border-b-2 border-blue-400 pb-2 inline-block">
            Available Stock
          </h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-100">Loading inventory data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-800 border border-red-600 text-red-100 px-6 py-4 rounded-lg shadow-lg animate-fadeIn">
              <p className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          ) : availableProducts.length === 0 ? (
            <div className="bg-yellow-700 border border-yellow-600 text-yellow-100 px-6 py-4 rounded-lg shadow-lg animate-fadeIn">
              <p className="flex items-center">
                <span className="mr-2">📦</span>
                No available stock found.
              </p>
            </div>
          ) : (
            <div className={`bg-gray-800 border border-gray-700 shadow-xl overflow-hidden rounded-lg ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
              <div className="p-4 bg-gray-800 flex justify-between items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input 
                    type="search" 
                    className="block w-64 p-2 pl-10 text-sm text-gray-200 border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'item' : 'items'} in stock
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Product Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Available Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {filteredProducts.map((product, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} animate-fadeIn`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 font-medium">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          <span className="bg-gray-600 px-3 py-1 rounded-full font-mono">
                            {product.availableQuantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-700 text-gray-300 text-sm italic text-right">
                Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableStockPage;