import { 
  UsersIcon, 
  UserPlusIcon, 
  CalendarIcon, 
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { mockEmployees, mockLeaveRequests, mockOnboardingProcesses } from '../data/mockData';

const stats = [
  {
    name: 'Total Employees',
    value: mockEmployees.length,
    icon: UsersIcon,
    color: 'bg-kyron-primary',
    textColor: 'text-kyron-primary',
  },
  {
    name: 'Pending Leave Requests',
    value: mockLeaveRequests.filter(req => req.status === 'pending').length,
    icon: CalendarIcon,
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
  },
  {
    name: 'Active Onboarding',
    value: mockOnboardingProcesses.filter(proc => proc.status === 'in-progress').length,
    icon: UserPlusIcon,
    color: 'bg-green-500',
    textColor: 'text-green-600',
  },
  {
    name: 'Overdue Tasks',
    value: 3,
    icon: ExclamationTriangleIcon,
    color: 'bg-red-500',
    textColor: 'text-red-600',
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'leave_request',
    message: 'John Doe requested vacation leave (Mar 15-22)',
    time: '2 hours ago',
    icon: CalendarIcon,
  },
  {
    id: 2,
    type: 'onboarding',
    message: 'Alex Rodriguez completed IT setup task',
    time: '4 hours ago',
    icon: UserPlusIcon,
  },
  {
    id: 3,
    type: 'goal',
    message: 'Jane Smith updated progress on Q2 Product Features',
    time: '6 hours ago',
    icon: ChartBarIcon,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your organization.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-kyron-primary hover:text-blue-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <activity.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UserPlusIcon className="w-6 h-6 text-kyron-primary mb-2" />
              <p className="font-medium text-gray-900">Add Employee</p>
              <p className="text-sm text-gray-500">Onboard new team member</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CalendarIcon className="w-6 h-6 text-kyron-primary mb-2" />
              <p className="font-medium text-gray-900">Review Requests</p>
              <p className="text-sm text-gray-500">Approve time-off requests</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChartBarIcon className="w-6 h-6 text-kyron-primary mb-2" />
              <p className="font-medium text-gray-900">Set Goals</p>
              <p className="text-sm text-gray-500">Create performance goals</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UsersIcon className="w-6 h-6 text-kyron-primary mb-2" />
              <p className="font-medium text-gray-900">View Directory</p>
              <p className="text-sm text-gray-500">Browse all employees</p>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Q1 Performance Reviews</p>
                <p className="text-sm text-gray-600">Due in 3 days</p>
              </div>
            </div>
            <button className="btn-outline text-xs py-1 px-3">Review</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Alex Rodriguez Onboarding</p>
                <p className="text-sm text-gray-600">Overdue by 1 day</p>
              </div>
            </div>
            <button className="btn-primary text-xs py-1 px-3">Complete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
