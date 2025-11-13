"use client";
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Search, Package, Boxes, Clock } from 'lucide-react';
import { AvailableProduct, ApiResponse } from '@/components/types';

const tailwindAnimations = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

const AvailableStockPage = () => {
  const [availableProducts, setAvailableProducts] = useState<AvailableProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<AvailableProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [footerTimestamp, setFooterTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableStock = async () => {
      try {
        const response = await axios.get<ApiResponse<AvailableProduct[]>>('/api/getAvailableStock');
        const data: ApiResponse<AvailableProduct[]> = response.data;
        
        if (data.success) {
          setAvailableProducts(data.data);
          setFilteredProducts(data.data);
          setLastUpdated(new Date());
        } else {
          setError(data.error || 'Failed to fetch available stock');
        }
      } catch (error: unknown) {
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
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.hsnCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, availableProducts]);

  const totalDistinctProducts = filteredProducts.length;
  const totalQuantity = useMemo(
    () => filteredProducts.reduce((sum, product) => sum + Number(product.availableQuantity || 0), 0),
    [filteredProducts]
  );
  const uniqueHsnCodes = useMemo(
    () => new Set(filteredProducts.map((product) => product.hsnCode)).size,
    [filteredProducts]
  );

  const formattedTimestamp = lastUpdated
    ? new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(lastUpdated)
    : null;

  useEffect(() => {
    if (!lastUpdated) {
      return;
    }
    const formattedFooter = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(lastUpdated);
    setFooterTimestamp(formattedFooter);
  }, [lastUpdated]);

  const renderSkeletonRows = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        <td className="px-6 py-4">
          <div className="h-4 bg-blue-800/30 rounded w-3/4" />
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-blue-800/30 rounded w-24" />
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-blue-800/30 rounded w-16" />
        </td>
      </tr>
    ));

  return (
    <>
      <style jsx global>{tailwindAnimations}</style>
      <div className="min-h-screen bg-gray-950 px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-blue-400">Inventory</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Available Stock
          </h1>
            <p className="text-sm text-blue-200/80 max-w-2xl">
              Track real-time product availability, filter by description or HSN code, and monitor inventory strength across your catalogue.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-blue-800 bg-blue-950/50 p-5 backdrop-blur-sm shadow-[0_20px_45px_-25px_rgba(30,64,175,0.45)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-blue-200/80">Total SKUs</div>
                <div className="rounded-xl bg-blue-800/60 p-2 text-blue-100">
                  <Package size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{availableProducts.length}</p>
              <span className="text-xs text-blue-300/80">Across the full inventory</span>
            </div>

            <div className="rounded-2xl border border-blue-800 bg-blue-950/50 p-5 backdrop-blur-sm shadow-[0_20px_45px_-25px_rgba(30,64,175,0.45)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-blue-200/80">On-hand Quantity</div>
                <div className="rounded-xl bg-blue-800/60 p-2 text-blue-100">
                  <Boxes size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{totalQuantity.toLocaleString('en-IN')}</p>
              <span className="text-xs text-blue-300/80">Sum of current stock units</span>
            </div>

            <div className="rounded-2xl border border-blue-800 bg-blue-950/50 p-5 backdrop-blur-sm shadow-[0_20px_45px_-25px_rgba(30,64,175,0.45)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-blue-200/80">HSN Coverage</div>
                <div className="rounded-xl bg-blue-800/60 p-2 text-blue-100">
                  <Clock size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{uniqueHsnCodes}</p>
              <span className="text-xs text-blue-300/80">Unique HSN codes in view</span>
            </div>
          </div>
          
          {loading ? (
            <div className="rounded-2xl border border-blue-900/80 bg-blue-950/40 shadow-2xl overflow-hidden">
              <div className="border-b border-blue-900/70 bg-blue-950/60 px-6 py-5">
                <div className="flex items-center gap-3 text-blue-200">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-blue-300/70 border-t-transparent" />
                  <div>
                    <p className="text-sm font-medium">Fetching inventory snapshot</p>
                    <p className="text-xs text-blue-300/70">Please hold on while we synchronise your stock data.</p>
                  </div>
                </div>
              </div>
              <table className="min-w-full">
                <tbody className="divide-y divide-blue-900/60 bg-blue-950/30">
                  {renderSkeletonRows()}
                </tbody>
              </table>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-800/70 bg-red-950/40 p-6 text-red-100 shadow-2xl animate-fadeIn">
              <p className="text-sm font-medium">{error}</p>
              <p className="mt-1 text-xs text-red-200/80">
                Please retry in a few moments or contact your administrator if the issue persists.
              </p>
            </div>
          ) : availableProducts.length === 0 ? (
            <div className="rounded-2xl border border-blue-800 bg-blue-950/40 p-6 text-blue-100 shadow-2xl animate-fadeIn">
              <h2 className="text-lg font-semibold text-white">Inventory not configured</h2>
              <p className="mt-2 text-sm text-blue-200/80">
                Add purchase entries to start tracking items in stock. Once entries are recorded, you will see them reflected here instantly.
              </p>
            </div>
          ) : (
            <div className={`bg-blue-900 border border-blue-800 shadow-2xl overflow-hidden rounded-2xl ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
              <div className="p-5 bg-blue-900 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-blue-700/60">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300/80">
                    <Search size={16} />
                  </div>
                  <input 
                    type="search" 
                    className="block w-full md:w-72 p-2.5 pl-10 text-sm text-blue-100 border border-blue-700/70 rounded-xl bg-blue-950/60 placeholder-blue-300/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors" 
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start gap-2 text-sm text-blue-200/90 md:items-end">
                  <div className="rounded-full border border-blue-800 bg-blue-950/60 px-4 py-2 font-medium text-blue-100">
                    {totalDistinctProducts} {totalDistinctProducts === 1 ? 'record' : 'records'} in view
                  </div>
                  {formattedTimestamp && (
                    <span className="flex items-center gap-2 text-xs text-blue-300/70">
                      <Clock size={14} />
                      Last synchronised: {formattedTimestamp}
                    </span>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto bg-blue-950/40">
                <table className="min-w-full divide-y divide-blue-800">
                  <thead className="bg-blue-950/60">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                        Product Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">HSN Code</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
                        Available Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800">
                    {filteredProducts.map((product, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-blue-900/70' : 'bg-blue-950/70'} animate-fadeIn`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100 font-medium">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200 font-mono">{product.hsnCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                          <span className="bg-blue-800/60 px-3 py-1 rounded-full font-mono border border-blue-700">
                            {product.availableQuantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-blue-950/70 text-blue-200 text-sm italic text-right border-t border-blue-800">
                {footerTimestamp ? `Last updated: ${footerTimestamp}` : 'Synchronising inventory timeline...'}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableStockPage;