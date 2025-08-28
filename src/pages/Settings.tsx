import { CogIcon, BellIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your HR portal configuration and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="card">
          <div className="flex items-center mb-4">
            <CogIcon className="w-6 h-6 text-kyron-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Company Name</label>
              <input type="text" className="form-input" defaultValue="Kyron HR" />
            </div>
            
            <div>
              <label className="form-label">Time Zone</label>
              <select className="form-input">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Default Currency</label>
              <select className="form-input">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="maintenance" className="mr-3" defaultChecked />
              <label htmlFor="maintenance" className="text-sm text-gray-700">
                Enable maintenance mode
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center mb-4">
            <BellIcon className="w-6 h-6 text-kyron-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email alerts for important events</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Leave Request Alerts</p>
                <p className="text-sm text-gray-500">Get notified of new leave requests</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Onboarding Reminders</p>
                <p className="text-sm text-gray-500">Reminders for pending onboarding tasks</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Performance Review Alerts</p>
                <p className="text-sm text-gray-500">Notifications for review deadlines</p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-kyron-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Session Timeout (minutes)</label>
              <input type="number" className="form-input" defaultValue="60" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="btn-primary">Enable</button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Password Policy</p>
                <p className="text-sm text-gray-500">Enforce strong password requirements</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            
            <div>
              <button className="btn-outline w-full">Change Password</button>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="card">
          <div className="flex items-center mb-4">
            <UserGroupIcon className="w-6 h-6 text-kyron-primary mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Default User Role</label>
              <select className="form-input">
                <option>Employee</option>
                <option>Manager</option>
                <option>HR Admin</option>
                <option>Super Admin</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-approve Leave Requests</p>
                <p className="text-sm text-gray-500">Automatically approve certain leave types</p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Employee Self-Service</p>
                <p className="text-sm text-gray-500">Allow employees to update their info</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            
            <div>
              <button className="btn-outline w-full">Manage User Roles</button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-outline">Reset to Defaults</button>
        <button className="btn-outline">Export Settings</button>
      </div>

      {/* System Information */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Version</p>
            <p className="font-medium">v2.1.0</p>
          </div>
          <div>
            <p className="text-gray-600">Last Updated</p>
            <p className="font-medium">March 15, 2024</p>
          </div>
          <div>
            <p className="text-gray-600">Database</p>
            <p className="font-medium">Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
