import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CheckoutModal from './CheckoutModal';
import type { CartItem } from '../types/catalog';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-kyron-primary text-white p-2 rounded-lg hover:bg-kyron-primary/90 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.totalItems}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {cart.items.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-100">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.brand.imageUrl}
                        alt={item.brand.brandName}
                        className="w-12 h-12 object-contain bg-gray-50 rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                            <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                              <rect width="48" height="48" fill="#f3f4f6"/>
                              <text x="24" y="28" font-family="Arial" font-size="8" text-anchor="middle" fill="#6b7280">
                                ${item.brand.brandName.slice(0, 10)}
                              </text>
                            </svg>
                          `)}`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.brand.brandName}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {item.catalogItem.rewardName}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-kyron-primary">
                            {getCurrencySymbol(item.catalogItem.currencyCode)}{item.amount}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-600 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {item.recipient && (
                          <p className="text-xs text-gray-500 mt-1">
                            For: {item.recipient.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">
                    Total ({cart.totalItems} items)
                  </span>
                  <span className="text-lg font-semibold text-kyron-primary">
                    ${cart.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-kyron-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-kyron-primary/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
};

export default Cart;
