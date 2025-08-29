import { useState } from 'react';
import { 
  ChartBarIcon, 
  PlusIcon, 
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { mockGoals, mockEmployees } from '../data/mockData';
import type { Goal } from '../types';

export default function PerformanceGoals() {
  const [goals] = useState<Goal[]>(mockGoals);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const filteredGoals = selectedEmployee 
    ? goals.filter(goal => goal.employeeId === selectedEmployee)
    : goals;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'not-started': return <XMarkIcon className="w-5 h-5 text-gray-400" />;
      default: return <ClockIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee ? employee.fullName : 'Unknown Employee';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance & Goals</h1>
          <p className="text-gray-600">Track and manage employee performance goals</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Goal
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="form-input"
          >
            <option value="">All Employees</option>
            {mockEmployees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.fullName}</option>
            ))}
          </select>
          
          <select className="form-input">
            <option value="">All Statuses</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <select className="form-input">
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <div key={goal.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                {getStatusIcon(goal.status)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                  <p className="text-sm text-gray-500">
                    Assigned to: {getEmployeeName(goal.employeeId)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`status-badge ${getPriorityColor(goal.priority)}`}>
                  {goal.priority.toUpperCase()}
                </span>
                <span className={`status-badge ${getStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-kyron-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Dates */}
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>Created: {new Date(goal.createdDate).toLocaleDateString()}</span>
              <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="w-4 h-4 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                ))}
              </div>
              <div className="space-x-2">
                <button className="btn-outline text-xs py-1 px-3">
                  Add Note
                </button>
                <button className="btn-primary text-xs py-1 px-3">
                  Update Progress
                </button>
                {goal.status === 'completed' && (
                  <button className="btn-secondary text-xs py-1 px-3 flex items-center space-x-1">
                    <GiftIcon className="w-3 h-3" />
                    <span>Send Recognition</span>
                  </button>
                )}
              </div>
            </div>

            {/* Review Notes */}
            {goal.reviewNotes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{goal.reviewNotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <ChartBarIcon className="w-8 h-8 text-kyron-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-kyron-primary">{goals.length}</p>
          <p className="text-sm text-gray-600">Total Goals</p>
        </div>
        <div className="card text-center">
          <CheckCircleIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-500">
            {goals.filter(g => g.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="card text-center">
          <ClockIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-500">
            {goals.filter(g => g.status === 'in-progress').length}
          </p>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="card text-center">
          <StarIconSolid className="w-8 h-8 text-kyron-secondary mx-auto mb-2" />
          <p className="text-2xl font-bold text-kyron-secondary">
            {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
          </p>
          <p className="text-sm text-gray-600">Average Progress</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <PlusIcon className="w-6 h-6 text-kyron-primary mb-2" />
            <p className="font-medium text-gray-900">Set Team Goals</p>
            <p className="text-sm text-gray-500">Create goals for entire team</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="w-6 h-6 text-kyron-primary mb-2" />
            <p className="font-medium text-gray-900">Performance Review</p>
            <p className="text-sm text-gray-500">Schedule performance reviews</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <StarIcon className="w-6 h-6 text-kyron-primary mb-2" />
            <p className="font-medium text-gray-900">Goal Templates</p>
            <p className="text-sm text-gray-500">Use predefined goal templates</p>
          </button>
        </div>
      </div>
    </div>
  );
}
