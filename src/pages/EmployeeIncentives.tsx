import { useState } from 'react';
import { GiftIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import GiftCatalog from '../components/incentives/GiftCatalog';
import Cart from '../components/incentives/Cart';
import BirthdayReminders from '../components/incentives/BirthdayReminders';
import type { CartItem } from '../types';

type TabType = 'catalog' | 'cart' | 'birthdays';

export default function EmployeeIncentives() {
  const [activeTab, setActiveTab] = useState<TabType>('catalog');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        cartItem => cartItem.item.utid === item.item.utid && 
        cartItem.recipient?.employeeId === item.recipient?.employeeId
      );
      
      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartItem = (index: number, updates: Partial<CartItem>) => {
    setCartItems(prev => prev.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ));
  };

  const tabs = [
    { id: 'catalog', name: 'Gift Catalog', icon: GiftIcon, count: null },
    { id: 'cart', name: 'Cart', icon: ShoppingCartIcon, count: cartItems.length },
    { id: 'birthdays', name: 'Birthday Reminders', icon: UserGroupIcon, count: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employee Incentives</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage gift cards, rewards, and birthday celebrations for your team
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
                flex items-center py-2 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-kyron-primary text-kyron-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
              {tab.count !== null && tab.count > 0 && (
                <span className="ml-2 bg-kyron-primary text-white text-xs rounded-full px-2 py-1">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[60vh]">
        {activeTab === 'catalog' && (
          <GiftCatalog onAddToCart={addToCart} />
        )}
        {activeTab === 'cart' && (
          <Cart 
            items={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateItem={updateCartItem}
          />
        )}
        {activeTab === 'birthdays' && (
          <BirthdayReminders onAddToCart={addToCart} />
        )}
      </div>
    </div>
  );
}
