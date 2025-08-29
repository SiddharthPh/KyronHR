export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  dateOfBirth?: string; // ISO date string
}

export interface GiftPurpose {
  type: 'birthday' | 'incentive';
  label: string;
  requiresDate: boolean;
  allowsMultipleRecipients: boolean;
}

export const GIFT_PURPOSES: GiftPurpose[] = [
  {
    type: 'birthday',
    label: 'Send gift cards on employee DOB',
    requiresDate: false,
    allowsMultipleRecipients: true
  },
  {
    type: 'incentive',
    label: 'Q2 Incentives',
    requiresDate: true,
    allowsMultipleRecipients: true
  }
];

// Mock employee data - in a real app this would come from an API
export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@kyronhr.com', department: 'Engineering', dateOfBirth: '1990-03-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@kyronhr.com', department: 'Marketing', dateOfBirth: '1988-07-22' },
  { id: '3', name: 'Mike Chen', email: 'mike.chen@kyronhr.com', department: 'Sales', dateOfBirth: '1992-11-08' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@kyronhr.com', department: 'HR', dateOfBirth: '1985-05-12' },
  { id: '5', name: 'David Wilson', email: 'david.wilson@kyronhr.com', department: 'Finance', dateOfBirth: '1991-09-30' },
  { id: '6', name: 'Lisa Brown', email: 'lisa.brown@kyronhr.com', department: 'Engineering', dateOfBirth: '1989-12-03' },
  { id: '7', name: 'Tom Anderson', email: 'tom.anderson@kyronhr.com', department: 'Operations', dateOfBirth: '1987-04-18' },
  { id: '8', name: 'Anna Rodriguez', email: 'anna.rodriguez@kyronhr.com', department: 'Design', dateOfBirth: '1993-01-27' }
];
