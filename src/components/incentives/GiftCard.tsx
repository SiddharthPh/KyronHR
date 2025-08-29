import { useState } from 'react';
import { PlusIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import GiftCardModal from './GiftCardModal';
import type { GiftCardBrand, CartItem } from '../../types';

interface GiftCardProps {
  brand: GiftCardBrand;
  onAddToCart: (item: CartItem) => void;
}

export default function GiftCard({ brand, onAddToCart }: GiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const primaryItem = brand.items[0]; // Use first item for display
  
  const formatValueRange = () => {
    if (primaryItem.valueType === 'VARIABLE_VALUE') {
      return `$${primaryItem.minValue} - $${primaryItem.maxValue}`;
    }
    return `$${primaryItem.minValue}`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick add with default amount (midpoint of range)
    const defaultAmount = Math.floor((primaryItem.minValue + primaryItem.maxValue) / 2);
    
    const cartItem: CartItem = {
      brand,
      item: primaryItem,
      amount: defaultAmount,
      quantity: 1,
      purpose: 'appreciation'
    };
    
    onAddToCart(cartItem);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Brand Logo */}
        <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl flex items-center justify-center p-6">
          {brand.brandLogoUrl ? (
            <img
              src={brand.brandLogoUrl}
              alt={`${brand.brandName} logo`}
              className="max-h-16 max-w-full object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`font-bold text-lg text-gray-600 ${brand.brandLogoUrl ? 'hidden' : ''}`}>
            {brand.brandName}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-kyron-primary transition-colors">
              {brand.brandName}
            </h3>
            <button
              onClick={handleQuickAdd}
              className="p-1 rounded-full bg-kyron-primary text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-kyron-primary/90"
              title="Quick add to cart"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {brand.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-kyron-primary font-semibold">
              {formatValueRange()}
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <InformationCircleIcon className="w-4 h-4 mr-1" />
              {primaryItem.category}
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Digital Delivery
            </span>
            <span className="text-xs text-gray-500">
              {primaryItem.currencyCode}
            </span>
          </div>
        </div>
      </div>

      {/* Modal for detailed view and customization */}
      <GiftCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={brand}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
