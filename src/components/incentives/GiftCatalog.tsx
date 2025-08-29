import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import GiftCard from './GiftCard';
import type { GiftCatalog, GiftCardBrand, CartItem } from '../../types';

interface GiftCatalogProps {
  onAddToCart: (item: CartItem) => void;
}

export default function GiftCatalog({ onAddToCart }: GiftCatalogProps) {
  const [catalog, setCatalog] = useState<GiftCatalog | null>(null);
  const [filteredBrands, setFilteredBrands] = useState<GiftCardBrand[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Load catalog data
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch('/catalog.json');
        const data: GiftCatalog = await response.json();
        setCatalog(data);
        setFilteredBrands(data.brands);
      } catch (error) {
        console.error('Failed to load catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCatalog();
  }, []);

  // Filter brands based on search and category
  useEffect(() => {
    if (!catalog) return;

    let filtered = catalog.brands;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(brand =>
        brand.items.some(item => item.category === selectedCategory)
      );
    }

    setFilteredBrands(filtered);
  }, [catalog, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = catalog?.brands
    .flatMap(brand => brand.items.map(item => item.category))
    .filter((category, index, self) => self.indexOf(category) === index)
    .sort() || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kyron-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search gift cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredBrands.length} of {catalog?.brands.length || 0} gift cards
      </div>

      {/* Gift Cards Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <GiftCard
              key={brand.brandKey}
              brand={brand}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No gift cards found</div>
          <div className="text-gray-400 text-sm mt-2">
            Try adjusting your search or filter criteria
          </div>
        </div>
      )}
    </div>
  );
}
