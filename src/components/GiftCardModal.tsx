import { useState } from 'react';
import { X, ShoppingCart, Globe, DollarSign, Info } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import type { Brand, CatalogItem } from '../types/catalog';

interface GiftCardModalProps {
  brand: Brand;
  onClose: () => void;
}

const GiftCardModal = ({ brand, onClose }: GiftCardModalProps) => {
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<CatalogItem>(brand.items[0]);
  const [amount, setAmount] = useState<number>(selectedItem.minValue);
  const [recipient, setRecipient] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'MYR': return 'RM';
      case 'AUD': return 'A$';
      case 'MXN': return 'MX$';
      case 'PLN': return 'zł';
      default: return currencyCode;
    }
  };

  const handleItemChange = (item: CatalogItem) => {
    setSelectedItem(item);
    setAmount(item.minValue);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    const recipientData = recipient.name.trim() || recipient.email.trim() 
      ? { name: recipient.name.trim(), email: recipient.email.trim() }
      : undefined;

    addToCart(brand, selectedItem, amount, recipientData, message.trim() || undefined);
    
    setTimeout(() => {
      setIsAddingToCart(false);
      onClose();
    }, 500);
  };

  const isFormValid = amount >= selectedItem.minValue && amount <= selectedItem.maxValue;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Gift Card Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-4 max-h-96 overflow-y-auto">
            {/* Brand Info */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={brand.imageUrl}
                  alt={brand.brandName}
                  className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                      <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect width="80" height="80" fill="#f3f4f6"/>
                        <text x="40" y="45" font-family="Arial" font-size="12" text-anchor="middle" fill="#6b7280">
                          ${brand.brandName.replace(/[<>&'"]/g, '').slice(0, 8)}
                        </text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{brand.brandName}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-kyron-primary/10 text-kyron-primary">
                    {brand.category}
                  </span>
                  <span className="capitalize">{brand.rewardType}</span>
                </div>
                <p className="text-gray-600 text-sm">{brand.description}</p>
              </div>
            </div>

            {/* Item Selection */}
            {brand.items.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Variant
                </label>
                <div className="space-y-2">
                  {brand.items.map((item) => (
                    <div
                      key={item.utid}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedItem.utid === item.utid
                          ? 'border-kyron-primary bg-kyron-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleItemChange(item)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{item.rewardName}</div>
                          <div className="text-sm text-gray-500 flex items-center space-x-4">
                            <span className="flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {item.currencyCode}
                            </span>
                            <span className="flex items-center">
                              <Globe className="w-3 h-3 mr-1" />
                              {item.countries?.slice(0, 2).join(', ')}
                              {item.countries && item.countries.length > 2 && ` +${item.countries.length - 2}`}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-kyron-primary">
                            {getCurrencySymbol(item.currencyCode)}{item.minValue} - {getCurrencySymbol(item.currencyCode)}{item.maxValue}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gift Amount ({getCurrencySymbol(selectedItem.currencyCode)})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {getCurrencySymbol(selectedItem.currencyCode)}
                </span>
                <input
                  type="number"
                  min={selectedItem.minValue}
                  max={selectedItem.maxValue}
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || selectedItem.minValue)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
                />
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Info className="w-3 h-3 mr-1" />
                Min: {getCurrencySymbol(selectedItem.currencyCode)}{selectedItem.minValue}, 
                Max: {getCurrencySymbol(selectedItem.currencyCode)}{selectedItem.maxValue}
              </div>
            </div>

            {/* Recipient Info (Optional) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Recipient name"
                  value={recipient.name}
                  onChange={(e) => setRecipient(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Recipient email"
                  value={recipient.email}
                  onChange={(e) => setRecipient(prev => ({ ...prev, email: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Message (Optional) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                placeholder="Add a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Globe className="w-4 h-4 mr-1 text-gray-400" />
                  Available in: {selectedItem.countries?.slice(0, 3).join(', ')}
                  {selectedItem.countries && selectedItem.countries.length > 3 && ` +${selectedItem.countries.length - 3} more`}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!isFormValid || isAddingToCart}
                className="px-4 py-2 bg-kyron-primary text-white rounded-lg hover:bg-kyron-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardModal;
