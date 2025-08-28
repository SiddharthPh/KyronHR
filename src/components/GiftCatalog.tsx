import React, { useState, useMemo } from 'react';
import { Search, Filter, Gift } from 'lucide-react';
import type { Brand, Catalog } from '../types/catalog';
import catalogData from '../../catalog.json';
import BirthdayGiftModal from './BirthdayGiftModal';

const GiftCard: React.FC<{ brand: Brand; onSendGift: (brand: Brand) => void }> = ({ brand, onSendGift }) => {
  const item = brand.items[0]; // Using first item for display
  const currencySymbol = item.currencyCode === 'USD' ? '$' : item.currencyCode === 'EUR' ? '€' : '£';
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="aspect-w-16 aspect-h-9 bg-gray-50 p-6 flex items-center justify-center">
        <img
          src={brand.imageUrl}
          alt={brand.brandName}
          className="max-h-20 max-w-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
              <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="40" fill="#f3f4f6"/>
                <text x="40" y="25" font-family="Arial" font-size="12" text-anchor="middle" fill="#6b7280">
                  ${brand.brandName}
                </text>
              </svg>
            `)}`;
          }}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{brand.brandName}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{brand.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-gray-500">Value Range:</span>
            <div className="font-medium text-kyron-primary">
              {currencySymbol}{item.minValue} - {currencySymbol}{item.maxValue}
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-kyron-primary/10 text-kyron-primary">
            {brand.category}
          </span>
        </div>
        
        <button
          onClick={() => onSendGift(brand)}
          className="w-full bg-kyron-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-kyron-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4" />
          Send as Birthday Gift
        </button>
      </div>
    </div>
  );
};

const GiftCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const catalog = catalogData as Catalog;

  const filteredBrands = useMemo(() => {
    return catalog.brands.filter(brand => {
      const matchesSearch = brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, catalog.brands]);

  const handleSendGift = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="Kyron HR" className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gift Card Rewards</h1>
              <p className="text-gray-600">Send thoughtful birthday gifts to your team members</p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rewards by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
              />
            </div>
            
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {catalog.categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-600">
          Showing {filteredBrands.length} of {catalog.totalBrands} rewards
          {selectedCategory && ` in "${selectedCategory}"`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Gift Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredBrands.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map(brand => (
              <GiftCard
                key={brand.brandKey}
                brand={brand}
                onSendGift={handleSendGift}
              />
            ))}
          </div>
        )}
      </div>

      {/* Birthday Gift Modal */}
      {isModalOpen && selectedBrand && (
        <BirthdayGiftModal
          brand={selectedBrand}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GiftCatalog;
