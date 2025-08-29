import { useState } from 'react';
import { XMarkIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { mockEmployees } from '../../data/mockData';
import type { GiftCardBrand, CartItem, Employee } from '../../types';

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: GiftCardBrand;
  onAddToCart: (item: CartItem) => void;
}

export default function GiftCardModal({ isOpen, onClose, brand, onAddToCart }: GiftCardModalProps) {
  const [amount, setAmount] = useState(25);
  const [quantity, setQuantity] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [message, setMessage] = useState('');
  const [purpose, setPurpose] = useState<CartItem['purpose']>('appreciation');

  const primaryItem = brand.items[0];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cartItem: CartItem = {
      brand,
      item: primaryItem,
      amount,
      quantity,
      recipient: selectedEmployee ? {
        employeeId: selectedEmployee.id,
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        email: selectedEmployee.email,
      } : undefined,
      message: message.trim() || undefined,
      purpose,
    };
    
    onAddToCart(cartItem);
    onClose();
    
    // Reset form
    setAmount(25);
    setQuantity(1);
    setSelectedEmployee(null);
    setMessage('');
    setPurpose('appreciation');
  };

  const total = amount * quantity;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                {brand.brandLogoUrl ? (
                  <img
                    src={brand.brandLogoUrl}
                    alt={`${brand.brandName} logo`}
                    className="max-h-12 max-w-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`font-bold text-sm text-gray-600 ${brand.brandLogoUrl ? 'hidden' : ''}`}>
                  {brand.brandName}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {brand.brandName}
                </h2>
                <p className="text-gray-600 mt-1">{brand.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gift Card Amount
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[25, 50, 100, 250].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                      amount === value
                        ? 'border-kyron-primary bg-kyron-primary text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Custom:</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(primaryItem.minValue, Math.min(primaryItem.maxValue, parseInt(e.target.value) || 0)))}
                  min={primaryItem.minValue}
                  max={primaryItem.maxValue}
                  className="block w-24 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
                />
                <span className="text-sm text-gray-500">
                  (${primaryItem.minValue} - ${primaryItem.maxValue})
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="10"
                className="block w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
              />
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as CartItem['purpose'])}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
              >
                <option value="appreciation">Employee Appreciation</option>
                <option value="performance">Performance Reward</option>
                <option value="birthday">Birthday Gift</option>
                <option value="anniversary">Work Anniversary</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                Recipient (Optional)
              </label>
              <select
                value={selectedEmployee?.id || ''}
                onChange={(e) => {
                  const emp = activeEmployees.find(emp => emp.id === e.target.value);
                  setSelectedEmployee(emp || null);
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
              >
                <option value="">Select employee (or leave blank for later)</option>
                {activeEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName} - {employee.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Add a personal message for the recipient..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
              />
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-kyron-primary">${total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-kyron-primary text-white rounded-md hover:bg-kyron-primary/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
