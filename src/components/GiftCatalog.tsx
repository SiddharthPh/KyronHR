import React, { useState, useMemo } from 'react';
import { Search, Filter, Gift, Globe, DollarSign } from 'lucide-react';
import type { Brand, Catalog } from '../types/catalog';
import catalogData from '../../catalog.json';
import GiftCardModal from './GiftCardModal';
import Cart from './Cart';
import { CartProvider } from '../contexts/CartContext';

const GiftCard: React.FC<{ brand: Brand; onViewDetails: (brand: Brand) => void }> = ({ brand, onViewDetails }) => {
  const item = brand.items?.[0]; // Using first item for display
  
  // Don't render if no valid item data
  if (!item) {
    return null;
  }
  
  const currencySymbol = item.currencyCode === 'USD' ? '$' : item.currencyCode === 'EUR' ? '€' : '£';
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
      <div className="bg-gray-50 p-4 flex items-center justify-center h-20 flex-shrink-0">
        <img
          src={brand.imageUrl}
          alt={brand.brandName}
          className="max-h-16 max-w-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
              <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="40" fill="#f3f4f6"/>
                <text x="40" y="25" font-family="Arial" font-size="12" text-anchor="middle" fill="#6b7280">
                  ${brand.brandName.replace(/[<>&'"]/g, '')}
                </text>
              </svg>
            `)}`;
          }}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-3 flex-grow">
          {/* Row 1: Brand Name */}
          <div className="border-b border-gray-100 pb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Brand Name</div>
            <div className="text-lg font-semibold text-gray-900 truncate">{brand.brandName}</div>
          </div>
          
          {/* Row 2: Brand Description */}
          <div className="border-b border-gray-100 pb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</div>
            <div className="text-sm text-gray-600 line-clamp-2 leading-relaxed h-10 overflow-hidden">
              {brand.description || 'No description available'}
            </div>
          </div>
          
          {/* Row 3: Value Range */}
          <div className="border-b border-gray-100 pb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Value Range</div>
            <div className="text-lg font-bold text-kyron-primary">
              {currencySymbol}{item.minValue} - {currencySymbol}{item.maxValue}
            </div>
          </div>
          
          {/* Row 4: Category */}
          <div className="border-b border-gray-100 pb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</div>
            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-kyron-primary/10 text-kyron-primary">
              {brand.category}
            </div>
          </div>
          
          {/* Row 5: Currency and Country */}
          <div className="pb-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Currency & Country</div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-700">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">{item.currencyCode}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <Globe className="w-4 h-4" />
                <span className="font-medium truncate">
                  {item.countries?.slice(0, 2).join(', ')}{item.countries && item.countries.length > 2 ? ` +${item.countries.length - 2}` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(brand)}
          className="w-full bg-kyron-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-kyron-primary/90 transition-colors duration-200 flex items-center justify-center gap-2 mt-4 flex-shrink-0"
        >
          <Gift className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

const GiftCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const catalog = catalogData as Catalog;

  // Extract unique countries and currencies from catalog
  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    catalog.brands.forEach(brand => {
      brand.items?.forEach(item => {
        item.countries?.forEach(country => countries.add(country));
      });
    });
    return Array.from(countries).sort();
  }, [catalog.brands]);

  const availableCurrencies = useMemo(() => {
    const currencies = new Set<string>();
    catalog.brands.forEach(brand => {
      brand.items?.forEach(item => {
        if (item.currencyCode) {
          currencies.add(item.currencyCode);
        }
      });
    });
    return Array.from(currencies).sort();
  }, [catalog.brands]);

  const filteredBrands = useMemo(() => {
    return catalog.brands.filter(brand => {
      const matchesSearch = brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || brand.category === selectedCategory;
      
      // Check if brand has items that match the selected country
      const matchesCountry = selectedCountry === '' || 
        brand.items?.some(item => item.countries?.includes(selectedCountry));
      
      // Check if brand has items that match the selected currency
      const matchesCurrency = selectedCurrency === '' || 
        brand.items?.some(item => item.currencyCode === selectedCurrency);
      
      return matchesSearch && matchesCategory && matchesCountry && matchesCurrency;
    });
  }, [searchTerm, selectedCategory, selectedCountry, selectedCurrency, catalog.brands]);

  const handleViewDetails = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <CartProvider>
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
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rewards by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
              />
            </div>
            
            {/* Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div className="relative">
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

              {/* Country Filter */}
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Countries</option>
                  {availableCountries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Currency Filter */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Currencies</option>
                  {availableCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              {/* Cart and Clear Filters */}
              <div className="flex items-center gap-2">
                <Cart />
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedCountry('');
                    setSelectedCurrency('');
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Showing {filteredBrands.length} of {catalog.totalBrands} rewards
            {selectedCategory && ` in "${selectedCategory}"`}
            {selectedCountry && ` for "${selectedCountry}"`}
            {selectedCurrency && ` in "${selectedCurrency}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          
          {/* Active Filters Tags */}
          {(selectedCategory || selectedCountry || selectedCurrency || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {selectedCategory && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCountry && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Country: {selectedCountry}
                  <button
                    onClick={() => setSelectedCountry('')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCurrency && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Currency: {selectedCurrency}
                  <button
                    onClick={() => setSelectedCurrency('')}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
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
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Birthday Gift Modal */}
      {isModalOpen && selectedBrand && (
        <GiftCardModal
          brand={selectedBrand}
          onClose={handleCloseModal}
        />
      )}
    </div>
    </CartProvider>
  );
};

export default GiftCatalog;
