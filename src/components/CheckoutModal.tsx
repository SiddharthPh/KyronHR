import { useState } from 'react';
import { X, CreditCard, Calendar, Users, User, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import type { Employee, GiftPurpose } from '../types/employee';
import { GIFT_PURPOSES, MOCK_EMPLOYEES } from '../types/employee';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal = ({ onClose }: CheckoutModalProps) => {
  const { cart, clearCart } = useCart();
  const [selectedPurpose, setSelectedPurpose] = useState<GiftPurpose>(GIFT_PURPOSES[0]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderCost, setCompletedOrderCost] = useState(0);

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

  const handlePurposeChange = (purpose: GiftPurpose) => {
    setSelectedPurpose(purpose);
    setSelectedEmployees([]);
    setScheduledDate('');
  };

  const handleEmployeeToggle = (employee: Employee) => {
    if (selectedPurpose.allowsMultipleRecipients) {
      setSelectedEmployees(prev => 
        prev.find(emp => emp.id === employee.id)
          ? prev.filter(emp => emp.id !== employee.id)
          : [...prev, employee]
      );
    } else {
      setSelectedEmployees([employee]);
    }
  };

  const handleSelectAllEmployees = () => {
    if (selectedPurpose.allowsMultipleRecipients) {
      if (selectedEmployees.length === MOCK_EMPLOYEES.length) {
        setSelectedEmployees([]);
      } else {
        setSelectedEmployees([...MOCK_EMPLOYEES]);
      }
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    
    // Calculate total cost for all cart items distributed to all selected employees
    const totalCartValue = cart.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
    const totalOrderCost = totalCartValue * selectedEmployees.length;
    
    const orderData = {
      cartItems: cart.items,
      purpose: selectedPurpose,
      recipients: selectedEmployees,
      scheduledDate: scheduledDate || null,
      totalCartValue,
      totalOrderCost,
      orderDate: new Date().toISOString()
    };
    
    console.log('Completing order with:', orderData);
    
    // Store the order cost before clearing the cart
    setCompletedOrderCost(totalOrderCost);
    
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  const isFormValid = selectedEmployees.length > 0 &&
                     (!selectedPurpose.requiresDate || scheduledDate);

  const totalCartValue = cart.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
  const totalOrderCost = totalCartValue * selectedEmployees.length;

  if (orderComplete) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
            <div className="bg-white px-6 py-6 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Complete!</h3>
              <p className="text-gray-600 mb-4">
                {selectedPurpose.type === 'birthday' 
                  ? `Birthday gifts have been scheduled for ${selectedEmployees.length} employee(s) and will be sent automatically on their respective birthdays.`
                  : `Gift cards have been scheduled for ${selectedEmployees.length} recipient(s).`
                }
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Total Budget: {getCurrencySymbol('USD')}{completedOrderCost.toFixed(2)}
              </p>
              <button
                onClick={onClose}
                className="w-full bg-kyron-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-kyron-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Checkout - Complete Your Order</h3>
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
            {/* Cart Summary */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Cart Summary</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                {cart.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.brand.imageUrl}
                        alt={item.brand.brandName}
                        className="w-8 h-8 object-contain bg-white rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                              <rect width="32" height="32" fill="#f3f4f6"/>
                              <text x="16" y="20" font-family="Arial" font-size="8" text-anchor="middle" fill="#6b7280">
                                ${item.brand.brandName.replace(/[<>&'"]/g, '').slice(0, 4)}
                              </text>
                            </svg>
                          `)}`;
                        }}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{item.brand.brandName}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-kyron-primary">
                        {getCurrencySymbol(item.catalogItem.currencyCode)}{(item.amount * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-300">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Cart Total:</span>
                    <span className="text-kyron-primary">{getCurrencySymbol('USD')}{totalCartValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Users className="inline w-4 h-4 mr-1" />
                Purpose
              </label>
              <div className="space-y-2">
                {GIFT_PURPOSES.map((purpose) => (
                  <div
                    key={purpose.type}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedPurpose.type === purpose.type
                        ? 'border-kyron-primary bg-kyron-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePurposeChange(purpose)}
                  >
                    <div className="font-medium text-gray-900">{purpose.label}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {purpose.type === 'birthday' 
                        ? 'Automatically sends gifts on each employee\'s date of birth • Multiple recipients' 
                        : purpose.requiresDate ? 'Requires date selection' : 'No date required'} 
                      {purpose.type !== 'birthday' && (purpose.allowsMultipleRecipients ? ' • Multiple recipients allowed' : ' • Single recipient only')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employee Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  <User className="inline w-4 h-4 mr-1" />
                  Select Recipients
                  {selectedPurpose.type === 'birthday' && (
                    <span className="text-xs text-gray-500 block mt-1">Gifts will be sent automatically on each employee's birthday</span>
                  )}
                </label>
                {selectedPurpose.allowsMultipleRecipients && (
                  <button
                    onClick={handleSelectAllEmployees}
                    className="text-sm text-kyron-primary hover:text-kyron-primary/80 font-medium"
                  >
                    {selectedEmployees.length === MOCK_EMPLOYEES.length ? 'Deselect All' : 'Select All Employees'}
                  </button>
                )}
              </div>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                {MOCK_EMPLOYEES.map((employee) => {
                  const isSelected = selectedEmployees.find(emp => emp.id === employee.id);
                  const dobFormatted = employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
                  
                  return (
                    <div
                      key={employee.id}
                      className={`p-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSelected ? 'bg-kyron-primary/5' : ''
                      }`}
                      onClick={() => handleEmployeeToggle(employee)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">
                            {employee.department} • {employee.email}
                            {selectedPurpose.type === 'birthday' && dobFormatted && (
                              <span className="ml-2 text-kyron-primary font-medium">🎂 {dobFormatted}</span>
                            )}
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'bg-kyron-primary border-kyron-primary' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date Selection (for Q2 Incentives) */}
            {selectedPurpose.requiresDate && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col space-y-3">
            {selectedEmployees.length > 0 && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">
                  {selectedPurpose.type === 'birthday' 
                    ? `Birthday gifts for ${selectedEmployees.length} employee(s) • Sent automatically on their DOBs`
                    : `Cart Total × ${selectedEmployees.length} recipient(s)`
                  }
                </div>
                <div className="text-lg font-semibold text-kyron-primary">
                  {selectedPurpose.type === 'birthday' 
                    ? `Total Budget: ${getCurrencySymbol('USD')}${totalOrderCost.toFixed(2)} (distributed across birthdays)`
                    : `Final Total: ${getCurrencySymbol('USD')}${totalOrderCost.toFixed(2)}`
                  }
                </div>
              </div>
            )}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteOrder}
                disabled={!isFormValid || isProcessing}
                className="flex-1 px-4 py-2 bg-kyron-primary text-white rounded-lg hover:bg-kyron-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{selectedPurpose.type === 'birthday' ? 'Schedule Birthday Gifts' : 'Complete Order'}</span>
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

export default CheckoutModal;
