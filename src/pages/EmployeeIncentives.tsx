import React, { useState } from 'react';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  GiftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TrophyIcon,
  SparklesIcon,
  HeartIcon,
  LightBulbIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { mockIncentives, mockGiftCards, mockEmployees } from '../data/mockData';

const incentiveTypes = [
  { id: 'spot_bonus', label: 'Spot Bonus', icon: TrophyIcon, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'achievement', label: 'Achievement', icon: StarIcon, color: 'bg-purple-100 text-purple-800' },
  { id: 'exceptional_performance', label: 'Exceptional Performance', icon: SparklesIcon, color: 'bg-blue-100 text-blue-800' },
  { id: 'team_player', label: 'Team Player', icon: UsersIcon, color: 'bg-green-100 text-green-800' },
  { id: 'innovation', label: 'Innovation', icon: LightBulbIcon, color: 'bg-orange-100 text-orange-800' },
  { id: 'customer_service', label: 'Customer Service', icon: HeartIcon, color: 'bg-pink-100 text-pink-800' },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  sent: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: ClockIcon,
  approved: CheckCircleIcon,
  sent: CheckCircleIcon,
  delivered: CheckCircleIcon,
  failed: XCircleIcon,
};

export default function EmployeeIncentives() {
  const [activeTab, setActiveTab] = useState('manage');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredIncentives = mockIncentives.filter(incentive => {
    const matchesSearch = 
      incentive.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incentive.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || incentive.status === filterStatus;
    const matchesType = filterType === 'all' || incentive.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalSent: mockIncentives.length,
    totalAmount: mockIncentives.reduce((sum, inc) => sum + inc.amount, 0),
    pendingApproval: mockIncentives.filter(inc => inc.status === 'pending').length,
    thisMonth: mockIncentives.filter(inc => 
      new Date(inc.createdDate).getMonth() === new Date().getMonth()
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-kyron-dark">Employee Incentives</h1>
          <p className="text-kyron-muted">Recognize and reward exceptional performance</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Recognition</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-kyron-primary/10 rounded-lg">
              <GiftIcon className="w-6 h-6 text-kyron-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-kyron-muted">Total Sent</p>
              <p className="text-2xl font-bold text-kyron-dark">{stats.totalSent}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-kyron-muted">Total Value</p>
              <p className="text-2xl font-bold text-kyron-dark">${stats.totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-kyron-muted">Pending</p>
              <p className="text-2xl font-bold text-kyron-dark">{stats.pendingApproval}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <SparklesIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-kyron-muted">This Month</p>
              <p className="text-2xl font-bold text-kyron-dark">{stats.thisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manage'
                ? 'border-kyron-primary text-kyron-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Recognition
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'catalog'
                ? 'border-kyron-primary text-kyron-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gift Catalog
          </button>
        </nav>
      </div>

      {activeTab === 'manage' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by employee name or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Types</option>
              {incentiveTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Incentives List */}
          <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type & Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gift Card
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIncentives.map((incentive) => {
                    const incentiveType = incentiveTypes.find(t => t.id === incentive.type);
                    const StatusIcon = statusIcons[incentive.status];
                    
                    return (
                      <tr key={incentive.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {incentive.recipientName}
                            </div>
                            <div className="text-sm text-gray-500">
                              by {incentive.managerName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {incentiveType && (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${incentiveType.color}`}>
                                  <incentiveType.icon className="w-3 h-3 mr-1" />
                                  {incentiveType.label}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-900 max-w-md">
                              {incentive.reason}
                            </div>
                            {incentive.message && (
                              <div className="text-xs text-gray-500 italic max-w-md">
                                "{incentive.message}"
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{incentive.giftCardBrand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${incentive.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[incentive.status]}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {incentive.status.charAt(0).toUpperCase() + incentive.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(incentive.createdDate).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-kyron-dark mb-2">Available Gift Cards</h2>
            <p className="text-kyron-muted">Choose from our curated selection of digital gift cards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGiftCards.map((card) => (
              <div key={card.utid} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <img
                    src={card.imageUrl}
                    alt={card.brandName}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-kyron-dark">{card.brandName}</h3>
                    <p className="text-sm text-kyron-muted mt-1">{card.description}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-kyron-primary">
                        ${card.minValue} - ${card.maxValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Recognition Modal */}
      {showCreateModal && (
        <CreateRecognitionModal
          onClose={() => setShowCreateModal(false)}
          giftCards={mockGiftCards}
          employees={mockEmployees}
        />
      )}
    </div>
  );
}

// Create Recognition Modal Component
function CreateRecognitionModal({ onClose, giftCards, employees }: {
  onClose: () => void;
  giftCards: any[];
  employees: any[];
}) {
  const [formData, setFormData] = useState({
    recipientId: '',
    type: 'spot_bonus',
    amount: 50,
    giftCardUtid: giftCards[0]?.utid || '',
    reason: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedEmployee = employees.find(emp => emp.id === formData.recipientId);
    if (!selectedEmployee) return;

    try {
      // In a real implementation, this would call the tangoService
      console.log('Creating recognition order:', {
        recipient: selectedEmployee,
        ...formData
      });

      // Simulate API call
      const orderData = {
        customer_identifier: 'kyron-hr-customer',
        account_identifier: 'kyron-hr-main-account',
        order_info: {
          utid: formData.giftCardUtid,
          amount: formData.amount,
          recipient: {
            email: selectedEmployee.email,
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
          },
          sendEmail: true,
          externalRefID: `kyron-${Date.now()}`,
          message: formData.message || `Recognition: ${formData.reason}`,
          senderFirstName: 'Manager',
          senderLastName: 'Admin',
          senderEmail: 'admin@kyronhr.com',
          emailSubject: '🎉 You\'ve received recognition from your manager!',
        }
      };

      // Call backend API (when available)
      // const response = await fetch('http://localhost:3001/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData),
      // });
      // const result = await response.json();

      console.log('Order would be placed:', orderData);
      alert(`Recognition sent successfully! ${selectedEmployee.firstName} will receive a $${formData.amount} ${giftCards.find(gc => gc.utid === formData.giftCardUtid)?.brandName} gift card.`);
      
      onClose();
    } catch (error) {
      console.error('Failed to create recognition:', error);
      alert('Failed to send recognition. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-kyron-dark">Create Recognition</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Selection */}
            <div>
              <label className="form-label">Select Employee</label>
              <select
                value={formData.recipientId}
                onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Choose an employee...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.fullName} - {emp.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Recognition Type */}
            <div>
              <label className="form-label">Recognition Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="form-input"
                required
              >
                {incentiveTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Gift Card Selection */}
            <div>
              <label className="form-label">Gift Card</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {giftCards.map((card) => (
                  <div
                    key={card.utid}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      formData.giftCardUtid === card.utid
                        ? 'border-kyron-primary bg-kyron-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, giftCardUtid: card.utid })}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={card.imageUrl}
                        alt={card.brandName}
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <div className="font-medium text-sm">{card.brandName}</div>
                        <div className="text-xs text-gray-500">
                          ${card.minValue} - ${card.maxValue}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="form-label">Amount ($)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                className="form-input"
                min="1"
                max="1000"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="form-label">Reason for Recognition</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="form-input"
                placeholder="e.g., Excellent work on Q1 project delivery"
                required
              />
            </div>

            {/* Personal Message */}
            <div>
              <label className="form-label">Personal Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-input"
                rows={3}
                placeholder="Add a personal note to make this recognition more meaningful..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Send Recognition
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
