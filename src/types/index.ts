export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  startDate: string;
  reportingManager: string;
  status: 'active' | 'inactive' | 'onboarding' | 'offboarding';
  avatar?: string;
  salary?: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Gift Card System Types
export interface GiftCardItem {
  utid: string;
  rewardName: string;
  currencyCode: string;
  status: string;
  valueType: 'VARIABLE_VALUE' | 'FIXED_VALUE';
  minValue: number;
  maxValue: number;
  fulfillmentType: 'DIGITAL' | 'PHYSICAL';
  countries: string[];
  category: string;
}

export interface GiftCardBrand {
  brandKey: string;
  brandName: string;
  disclaimer: string;
  description: string;
  brandLogoUrl: string;
  status: string;
  items: GiftCardItem[];
}

export interface GiftCatalog {
  catalogName: string;
  brands: GiftCardBrand[];
}

export interface CartItem {
  brand: GiftCardBrand;
  item: GiftCardItem;
  amount: number;
  quantity: number;
  recipient?: {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  message?: string;
  purpose: 'birthday' | 'performance' | 'anniversary' | 'appreciation' | 'custom';
}

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdDate: string;
  progress: number; // 0-100
  reviewNotes?: string;
  managerId: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'denied';
  reason: string;
  requestDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignedTo: 'employee' | 'hr' | 'it' | 'manager';
  dueDate?: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface OffboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignedTo: 'employee' | 'hr' | 'it' | 'manager';
  dueDate?: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface OnboardingProcess {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
  tasks: OnboardingTask[];
  progress: number; // 0-100
}

export interface OffboardingProcess {
  id: string;
  employeeId: string;
  employeeName: string;
  lastWorkingDay: string;
  status: 'not-started' | 'in-progress' | 'completed';
  tasks: OffboardingTask[];
  progress: number; // 0-100
}

export interface PTOBalance {
  employeeId: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  accrualRate: number; // days per month
  lastUpdated: string;
}

export interface Department {
  id: string;
  name: string;
  managerId: string;
  employeeCount: number;
}
