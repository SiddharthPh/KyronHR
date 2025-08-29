import React, { useState } from 'react';
import { X, Calendar, User, MessageSquare, DollarSign, Send } from 'lucide-react';
import type { Brand, Employee, BirthdayGift } from '../types/catalog';

interface BirthdayGiftModalProps {
  brand: Brand;
  onClose: () => void;
}

// Mock employee data - in a real app this would come from your employee database
const mockEmployees: Employee[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@kyronhr.com', department: 'Engineering', birthday: '1990-03-15' },
  { id: '2', name: 'Mike Chen', email: 'mike.chen@kyronhr.com', department: 'Marketing', birthday: '1988-07-22' },
  { id: '3', name: 'Emily Davis', email: 'emily.davis@kyronhr.com', department: 'Sales', birthday: '1992-11-08' },
  { id: '4', name: 'James Wilson', email: 'james.wilson@kyronhr.com', department: 'HR', birthday: '1985-09-12' },
  { id: '5', name: 'Lisa Garcia', email: 'lisa.garcia@kyronhr.com', department: 'Finance', birthday: '1991-12-03' },
];

const BirthdayGiftModal: React.FC<BirthdayGiftModalProps> = ({ brand, onClose }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const item = brand.items?.[0];
  const currencySymbol = item?.currencyCode === 'USD' ? '$' : item?.currencyCode === 'EUR' ? '€' : '£';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!item) {
      alert('Error: Invalid gift card data');
      return;
    }
    
    if (!selectedEmployee || !amount || !deliveryDate) {
      alert('Please fill in all required fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < item.minValue || numAmount > item.maxValue) {
      alert(`Amount must be between ${currencySymbol}${item.minValue} and ${currencySymbol}${item.maxValue}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create birthday gift object
      const birthdayGift: BirthdayGift = {
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.name,
        employeeEmail: selectedEmployee.email,
        utid: item.utid,
        brandName: brand.brandName,
        amount: numAmount,
        message: message || `Happy Birthday from the Kyron HR team! 🎉`,
        deliveryDate,
        externalRefID: `birthday-${selectedEmployee.id}-${Date.now()}`
      };

      // In a real app, this would call your backend API to place the order
      console.log('Birthday Gift Order:', birthdayGift);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`🎉 Birthday gift sent successfully!\n\n${selectedEmployee.name} will receive a ${currencySymbol}${amount} ${brand.brandName} gift card on ${deliveryDate}.`);
      onClose();
    } catch (error) {
      console.error('Error sending birthday gift:', error);
      alert('Failed to send birthday gift. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date for min date picker value
  const today = new Date().toISOString().split('T')[0];

  // Early return if no valid item data
  if (!item) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">Invalid gift card data. Please try again.</p>
            <button
              onClick={onClose}
              className="bg-kyron-primary text-white px-4 py-2 rounded-lg hover:bg-kyron-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={brand.imageUrl}
              alt={brand.brandName}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" fill="#f3f4f6"/>
                    <text x="20" y="25" font-family="Arial" font-size="10" text-anchor="middle" fill="#6b7280">
                      ${brand.brandName.replace(/[<>&'"]/g, '')}
                    </text>
                  </svg>
                `)}`;
              }}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Send Birthday Gift</h2>
              <p className="text-sm text-gray-600">{brand.brandName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Employee Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Select Employee *
            </label>
            <select
              value={selectedEmployee?.id || ''}
              onChange={(e) => {
                const employee = mockEmployees.find(emp => emp.id === e.target.value);
                setSelectedEmployee(employee || null);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
              required
            >
              <option value="">Choose an employee...</option>
              {mockEmployees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.department}
                </option>
              ))}
            </select>
            {selectedEmployee && (
              <p className="text-xs text-gray-500 mt-1">
                📧 {selectedEmployee.email}
                {selectedEmployee.birthday && (
                  <span className="ml-2">🎂 Birthday: {new Date(selectedEmployee.birthday).toLocaleDateString()}</span>
                )}
              </p>
            )}
          </div>

          {/* Gift Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Gift Amount ({item.currencyCode}) *
            </label>
            <input
              type="number"
              min={item.minValue}
              max={item.maxValue}
              step={item.currencyCode === 'USD' ? '0.01' : '1'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`${currencySymbol}${item.minValue} - ${currencySymbol}${item.maxValue}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum: {currencySymbol}{item.minValue} • Maximum: {currencySymbol}{item.maxValue}
            </p>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Delivery Date *
            </label>
            <input
              type="date"
              min={today}
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent"
              required
            />
          </div>

          {/* Personal Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Personal Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal birthday message..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kyron-primary focus:border-transparent resize-none"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">
              {message.length}/200 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-kyron-primary text-white px-4 py-2 rounded-lg hover:bg-kyron-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Gift
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthdayGiftModal;
