import { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  UserIcon 
} from '@heroicons/react/24/outline';
import { mockLeaveRequests, mockEmployees, mockPTOBalances } from '../data/mockData';
import type { LeaveRequest } from '../types';

export default function TimeOffManagement() {
  const [leaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredRequests = leaveRequests.filter(request => {
    const matchesStatus = !selectedStatus || request.status === selectedStatus;
    const matchesType = !selectedType || request.type === selectedType;
    return matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'denied': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'text-blue-600 bg-blue-100';
      case 'sick': return 'text-red-600 bg-red-100';
      case 'personal': return 'text-purple-600 bg-purple-100';
      case 'maternity': return 'text-pink-600 bg-pink-100';
      case 'paternity': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time-Off Management</h1>
          <p className="text-gray-600">Manage leave requests and PTO balances</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Leave Request
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <ClockIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-500">
            {leaveRequests.filter(req => req.status === 'pending').length}
          </p>
          <p className="text-sm text-gray-600">Pending Requests</p>
        </div>
        <div className="card text-center">
          <CheckCircleIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-500">
            {leaveRequests.filter(req => req.status === 'approved').length}
          </p>
          <p className="text-sm text-gray-600">Approved This Month</p>
        </div>
        <div className="card text-center">
          <CalendarIcon className="w-8 h-8 text-kyron-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-kyron-primary">
            {leaveRequests.reduce((acc, req) => acc + req.days, 0)}
          </p>
          <p className="text-sm text-gray-600">Total Days Requested</p>
        </div>
        <div className="card text-center">
          <UserIcon className="w-8 h-8 text-kyron-secondary mx-auto mb-2" />
          <p className="text-2xl font-bold text-kyron-secondary">
            {mockPTOBalances.reduce((acc, balance) => acc + balance.remainingDays, 0)}
          </p>
          <p className="text-sm text-gray-600">Total PTO Remaining</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-input"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="form-input"
          >
            <option value="">All Types</option>
            <option value="vacation">Vacation</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal</option>
            <option value="maternity">Maternity</option>
            <option value="paternity">Paternity</option>
          </select>
          
          <input
            type="date"
            className="form-input"
            placeholder="Filter by date"
          />
        </div>
      </div>

      {/* Leave Requests */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-kyron-primary flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {request.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                        <div className="text-sm text-gray-500">
                          Requested: {new Date(request.requestDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${getTypeColor(request.type)}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{new Date(request.startDate).toLocaleDateString()}</div>
                      <div className="text-gray-500">to {new Date(request.endDate).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.days} {request.days === 1 ? 'day' : 'days'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === 'pending' ? (
                      <div className="space-x-2">
                        <button className="btn-secondary text-xs py-1 px-3">
                          <CheckCircleIcon className="w-4 h-4 inline mr-1" />
                          Approve
                        </button>
                        <button className="btn-outline text-xs py-1 px-3 border-red-300 text-red-600 hover:bg-red-50">
                          <XCircleIcon className="w-4 h-4 inline mr-1" />
                          Deny
                        </button>
                      </div>
                    ) : (
                      <button className="text-kyron-primary hover:text-blue-700">
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PTO Balances */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">PTO Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPTOBalances.map((balance) => {
            const employee = mockEmployees.find(emp => emp.id === balance.employeeId);
            const utilizationPercentage = (balance.usedDays / balance.totalDays) * 100;
            
            return (
              <div key={balance.employeeId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{employee?.fullName}</h4>
                  <span className="text-sm text-gray-500">{employee?.department}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Days:</span>
                    <span className="font-medium">{balance.totalDays}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Used:</span>
                    <span className="font-medium text-red-600">{balance.usedDays}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-medium text-green-600">{balance.remainingDays}</span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Utilization</span>
                      <span>{Math.round(utilizationPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          utilizationPercentage > 80 ? 'bg-red-500' : 
                          utilizationPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${utilizationPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Accrual: {balance.accrualRate} days/month
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar View Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Calendar</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Calendar view would be implemented here</p>
          <p className="text-sm text-gray-500 mt-2">
            This would show a visual calendar with all approved leave requests
          </p>
        </div>
      </div>
    </div>
  );
}
