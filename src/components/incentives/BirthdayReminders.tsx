import { useState, useMemo } from 'react';
import { CakeIcon, GiftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { mockEmployees } from '../../data/mockData';
import type { CartItem, Employee } from '../../types';

interface BirthdayRemindersProps {
  onAddToCart: (item: CartItem) => void;
}

// Mock birthday data - in a real app this would come from employee records
const addMockBirthdays = (employees: Employee[]) => {
  return employees.map(emp => ({
    ...emp,
    birthday: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
  }));
};

export default function BirthdayReminders({ onAddToCart }: BirthdayRemindersProps) {
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('week');
  
  const employeesWithBirthdays = useMemo(() => addMockBirthdays(mockEmployees), []);

  const filteredEmployees = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    return employeesWithBirthdays
      .map(emp => {
        const birthdayThisYear = new Date(`${currentYear}-${emp.birthday.slice(5)}`);
        return { ...emp, birthdayThisYear };
      })
      .filter(emp => {
        switch (filter) {
          case 'today':
            return isToday(emp.birthdayThisYear);
          case 'week':
            return isThisWeek(emp.birthdayThisYear, { weekStartsOn: 1 });
          case 'month':
            return emp.birthdayThisYear.getMonth() === now.getMonth();
          default:
            return true;
        }
      })
      .sort((a, b) => a.birthdayThisYear.getTime() - b.birthdayThisYear.getTime());
  }, [employeesWithBirthdays, filter]);

  const sendBirthdayGift = (employee: Employee & { birthdayThisYear: Date }) => {
    // Quick add a birthday gift - use Amazon as default
    const cartItem: CartItem = {
      brand: {
        brandKey: 'amazon',
        brandName: 'Amazon',
        disclaimer: 'Amazon.com is not a sponsor of this promotion.',
        description: 'Shop millions of products on Amazon',
        brandLogoUrl: 'https://cdn.tangocard.com/logos/amazon-logo.png',
        status: 'active',
        items: [{
          utid: 'U123001',
          rewardName: 'Amazon.com Gift Card',
          currencyCode: 'USD',
          status: 'active',
          valueType: 'VARIABLE_VALUE' as const,
          minValue: 1,
          maxValue: 2000,
          fulfillmentType: 'DIGITAL' as const,
          countries: ['US'],
          category: 'Retail'
        }]
      },
      item: {
        utid: 'U123001',
        rewardName: 'Amazon.com Gift Card',
        currencyCode: 'USD',
        status: 'active',
        valueType: 'VARIABLE_VALUE',
        minValue: 1,
        maxValue: 2000,
        fulfillmentType: 'DIGITAL',
        countries: ['US'],
        category: 'Retail'
      },
      amount: 50, // Default birthday gift amount
      quantity: 1,
      recipient: {
        employeeId: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      },
      message: `Happy Birthday, ${employee.firstName}! 🎉 Hope you have a wonderful day!`,
      purpose: 'birthday'
    };
    
    onAddToCart(cartItem);
  };

  const getBirthdayStatus = (date: Date) => {
    if (isToday(date)) return { text: 'Today!', color: 'bg-red-100 text-red-800' };
    if (isTomorrow(date)) return { text: 'Tomorrow', color: 'bg-orange-100 text-orange-800' };
    if (isThisWeek(date)) return { text: 'This week', color: 'bg-blue-100 text-blue-800' };
    return { text: format(date, 'MMM d'), color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <CakeIcon className="w-5 h-5 mr-2 text-kyron-primary" />
            Birthday Reminders
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Never miss an employee birthday celebration
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-kyron-primary focus:border-kyron-primary"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Upcoming</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <CakeIcon className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-900">Today</p>
              <p className="text-2xl font-bold text-red-600">
                {employeesWithBirthdays.filter(emp => isToday(new Date(`${new Date().getFullYear()}-${emp.birthday.slice(5)}`))).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">This Week</p>
              <p className="text-2xl font-bold text-blue-600">
                {employeesWithBirthdays.filter(emp => isThisWeek(new Date(`${new Date().getFullYear()}-${emp.birthday.slice(5)}`), { weekStartsOn: 1 })).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <GiftIcon className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {employeesWithBirthdays.filter(emp => new Date(`${new Date().getFullYear()}-${emp.birthday.slice(5)}`).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Birthday List */}
      {filteredEmployees.length > 0 ? (
        <div className="space-y-3">
          {filteredEmployees.map((employee) => {
            const status = getBirthdayStatus(employee.birthdayThisYear);
            
            return (
              <div key={employee.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-kyron-primary to-kyron-secondary rounded-full flex items-center justify-center text-white font-semibold">
                      {employee.firstName[0]}{employee.lastName[0]}
                    </div>
                    
                    {/* Employee Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900">{employee.fullName}</h3>
                      <p className="text-sm text-gray-600">{employee.jobTitle} • {employee.department}</p>
                      <div className="flex items-center mt-1">
                        <CakeIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
                          {format(employee.birthdayThisYear, 'MMMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Birthday Status */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.text}
                    </span>
                    
                    {/* Send Gift Button */}
                    <button
                      onClick={() => sendBirthdayGift(employee)}
                      className="flex items-center px-3 py-2 bg-kyron-primary text-white rounded-lg text-sm font-medium hover:bg-kyron-primary/90 transition-colors"
                    >
                      <GiftIcon className="w-4 h-4 mr-1" />
                      Send Gift
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <CakeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No birthdays found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No employee birthdays in the selected time period.
          </p>
        </div>
      )}
    </div>
  );
}
