import { useState } from 'react';
import { 
  UserPlusIcon, 
  UserMinusIcon, 
  CheckCircleIcon,
  ClockIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import { mockOnboardingProcesses, mockOffboardingProcesses } from '../data/mockData';
import type { OnboardingProcess, OffboardingProcess } from '../types';

export default function BoardingManagement() {
  const [activeTab, setActiveTab] = useState<'onboarding' | 'offboarding'>('onboarding');
  const [onboardingProcesses] = useState<OnboardingProcess[]>(mockOnboardingProcesses);
  const [offboardingProcesses] = useState<OffboardingProcess[]>(mockOffboardingProcesses);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskStatusIcon = (completed: boolean) => {
    return completed ? (
      <CheckCircleIcon className="w-5 h-5 text-green-500" />
    ) : (
      <ClockIcon className="w-5 h-5 text-gray-400" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding & Offboarding</h1>
          <p className="text-gray-600">Manage employee transitions and track progress</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <PlusIcon className="w-5 h-5 mr-2" />
          {activeTab === 'onboarding' ? 'New Onboarding' : 'New Offboarding'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('onboarding')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'onboarding'
                ? 'border-kyron-primary text-kyron-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <UserPlusIcon className="w-5 h-5 inline mr-2" />
            Onboarding
          </button>
          <button
            onClick={() => setActiveTab('offboarding')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'offboarding'
                ? 'border-kyron-primary text-kyron-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <UserMinusIcon className="w-5 h-5 inline mr-2" />
            Offboarding
          </button>
        </nav>
      </div>

      {/* Onboarding Content */}
      {activeTab === 'onboarding' && (
        <div className="space-y-6">
          {onboardingProcesses.map((process) => (
            <div key={process.id} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{process.employeeName}</h3>
                  <p className="text-sm text-gray-600">
                    Start Date: {new Date(process.startDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span className={`status-badge ${getStatusColor(process.status)}`}>
                      {process.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-kyron-primary">{process.progress}%</p>
                  </div>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-kyron-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${process.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Checklist Tasks</h4>
                {process.tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getTaskStatusIcon(task.completed)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>Assigned to: {task.assignedTo}</span>
                        {task.dueDate && (
                          <span className="ml-4">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    {!task.completed && (
                      <button className="btn-primary text-xs py-1 px-3">
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Offboarding Content */}
      {activeTab === 'offboarding' && (
        <div className="space-y-6">
          {offboardingProcesses.map((process) => (
            <div key={process.id} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{process.employeeName}</h3>
                  <p className="text-sm text-gray-600">
                    Last Working Day: {new Date(process.lastWorkingDay).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span className={`status-badge ${getStatusColor(process.status)}`}>
                      {process.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-red-600">{process.progress}%</p>
                  </div>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${process.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Offboarding Checklist</h4>
                {process.tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getTaskStatusIcon(task.completed)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>Assigned to: {task.assignedTo}</span>
                        {task.dueDate && (
                          <span className="ml-4">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    {!task.completed && (
                      <button className="btn-primary text-xs py-1 px-3">
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <UserPlusIcon className="w-8 h-8 text-kyron-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-kyron-primary">
            {onboardingProcesses.filter(p => p.status === 'in-progress').length}
          </p>
          <p className="text-sm text-gray-600">Active Onboarding</p>
        </div>
        <div className="card text-center">
          <UserMinusIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-500">
            {offboardingProcesses.filter(p => p.status === 'in-progress').length}
          </p>
          <p className="text-sm text-gray-600">Active Offboarding</p>
        </div>
        <div className="card text-center">
          <CheckCircleIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-500">
            {[...onboardingProcesses, ...offboardingProcesses].filter(p => p.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">Completed This Month</p>
        </div>
      </div>
    </div>
  );
}
