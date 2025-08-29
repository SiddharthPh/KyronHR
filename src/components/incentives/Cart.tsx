import { useState } from 'react';
import { TrashIcon, PencilIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { mockEmployees } from '../../data/mockData';
import type { CartItem } from '../../types';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, updates: Partial<CartItem>) => void;
}

export default function Cart({ items, onRemoveItem, onUpdateItem }: CartProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const totalValue = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active');

  const handleCheckout = () => {
    // In a real app, this would integrate with Tango MCP API
    alert(`Checkout initiated for ${items.length} items totaling $${totalValue}`);
  };

  const updateRecipient = (index: number, employeeId: string) => {
    const employee = activeEmployees.find(emp => emp.id === employeeId);
    onUpdateItem(index, {
      recipient: employee ? {
        employeeId: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      } : undefined
    });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No items in cart</h3>
        <p className="mt-1 text-sm text-gray-500">
          Browse the gift catalog to add items to your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              {/* Item Info */}
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.brand.brandLogoUrl ? (
                    <img
                      src={item.brand.brandLogoUrl}
                      alt={`${item.brand.brandName} logo`}
                      className="max-h-12 max-w-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`font-bold text-sm text-gray-600 ${item.brand.brandLogoUrl ? 'hidden' : ''}`}>
                    {item.brand.brandName}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.brand.brandName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.item.rewardName}</p>
                  
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-kyron-light text-kyron-primary px-2 py-1 rounded">
                      ${item.amount} × {item.quantity}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                      {item.purpose.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Recipient */}
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <UserGroupIcon className="w-3 h-3 inline mr-1" />
                      Recipient
                    </label>
                    {editingIndex === index ? (
                      <select
                        value={item.recipient?.employeeId || ''}
                        onChange={(e) => updateRecipient(index, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        className="block w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
                        autoFocus
                      >
                        <option value="">Select employee</option>
                        {activeEmployees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.fullName} - {employee.jobTitle}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div
                        onClick={() => setEditingIndex(index)}
                        className="cursor-pointer text-sm text-gray-900 hover:text-kyron-primary flex items-center"
                      >
                        {item.recipient ? (
                          <span>{item.recipient.firstName} {item.recipient.lastName}</span>
                        ) : (
                          <span className="text-gray-500 italic">Click to select recipient</span>
                        )}
                        <PencilIcon className="w-3 h-3 ml-1 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  {item.message && (
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-700">Message:</span>
                      <p className="text-sm text-gray-600 italic">"{item.message}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Item Actions & Total */}
              <div className="flex flex-col items-end space-y-2">
                <div className="text-lg font-semibold text-kyron-primary">
                  ${item.amount * item.quantity}
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => onUpdateItem(index, { quantity: Math.max(1, item.quantity - 1) })}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateItem(index, { quantity: item.quantity + 1 })}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Remove item"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Cart Summary</span>
            <span className="text-sm text-gray-600">{items.length} items</span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalValue}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Processing fee:</span>
              <span>$0</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-kyron-primary">${totalValue}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-kyron-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-kyron-primary/90 transition-colors"
          >
            Proceed to Checkout
          </button>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Gift cards will be delivered via email to recipients
          </p>
        </div>
      </div>
    </div>
  );
}
