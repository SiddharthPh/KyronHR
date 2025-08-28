# Employee Incentives System - Development Prompt

## 🎯 Project Overview
Build a comprehensive employee incentives and gift card management system integrated with Tango MCP API for digital gift card distribution. This system supports both automated birthday gifts and scheduled incentive campaigns.

## 📋 Pre-Development Checklist

### 1. Repository Setup
```bash
# Check available branches
git branch -a

# Ask user which branch to use as starting point
# Recommended branches:
# - main: Base application
# - tango-mcp: Complete gift card system (recommended)
```

**Question for User:** 
> Which git branch would you like to start from?
> - `main`: Start with base KyronHR portal
> - `tango-mcp`: Start with existing gift card system (recommended)
> - `new-branch`: Create fresh branch from main

### 2. Codebase Analysis
Before starting, examine the current structure:

```bash
# Check current file structure
find src -name "*.tsx" -o -name "*.ts" | head -20

# Look for existing components
ls src/components/

# Check for existing types
ls src/types/

# Verify package.json dependencies
grep -E "(react|typescript|tailwind|lucide)" package.json
```

## 🏗️ System Architecture

### Core Components Required
1. **Gift Catalog System** (`GiftCatalog.tsx`)
2. **Shopping Cart** (`Cart.tsx`) 
3. **Cart Context** (`CartContext.tsx`)
4. **Gift Card Modal** (`GiftCardModal.tsx`)
5. **Checkout Modal** (`CheckoutModal.tsx`)
6. **Employee Management** (`types/employee.ts`)

### Data Integration
- **Tango MCP API**: Live gift card catalog
- **Employee Directory**: Mock or real employee data
- **Purpose Management**: DOB vs Incentive workflows

## 🎨 User Experience Flow

### Flow 1: Browse & Add to Cart
```
Gift Catalog → Filter/Search → View Details → Add to Cart → Cart Management
```

### Flow 2: Checkout Process
```
Cart → Proceed to Checkout → Select Purpose → Choose Recipients → Complete Order
```

## 🔧 Technical Implementation Steps

### Step 1: Environment Setup
```bash
# Ensure development server is running
npm run dev

# Verify Tango MCP integration (if using tango-mcp branch)
# Check for catalog.json with gift card data
```

### Step 2: Purpose Configuration
**Ask User:** What types of incentive purposes do you need?

Default purposes available:
- **Birthday Gifts**: Automatic delivery on employee DOBs (multiple recipients)
- **Q2 Incentives**: Scheduled delivery with date selection (multiple recipients)

**Custom Purpose Questions:**
1. What should the purpose be called? (e.g., "Year-End Bonuses", "Achievement Awards")
2. Should it require a scheduled date? (Yes/No)
3. Should it allow multiple recipients? (Yes/No)
4. Any special validation rules?

```typescript
// Example purpose configuration
export const GIFT_PURPOSES: GiftPurpose[] = [
  {
    type: 'birthday',
    label: 'Send gift cards on employee DOB',
    requiresDate: false,
    allowsMultipleRecipients: true
  },
  {
    type: 'custom-purpose',
    label: 'Your Custom Purpose Name',
    requiresDate: true/false,
    allowsMultipleRecipients: true/false
  }
];
```

### Step 3: Employee Data Setup
**Ask User:** Do you want to use:
1. **Mock Employee Data**: Pre-built employee directory
2. **API Integration**: Connect to existing HR system
3. **Custom Employee List**: Provide your own employee data

```typescript
// Employee interface structure
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  dateOfBirth?: string; // ISO date string
}
```

### Step 4: Gift Card Integration
**Questions for User:**
1. Which gift card categories do you want to focus on?
2. Any specific currency requirements?
3. Any country restrictions?
4. Budget limits per gift card?

### Step 5: UI Customization
**Ask User:**
1. What should the navigation item be called? (Current: "Employee Incentives")
2. Any specific branding colors beyond the Kyron theme?
3. Any additional filters needed in the catalog?

## 📁 File Structure Guide

```
src/
├── components/
│   ├── GiftCatalog.tsx           # Main catalog interface
│   ├── GiftCardModal.tsx         # Individual gift details
│   ├── Cart.tsx                  # Shopping cart dropdown
│   ├── CheckoutModal.tsx         # Purpose-driven checkout
│   └── Sidebar.tsx               # Navigation (update menu)
├── contexts/
│   └── CartContext.tsx           # Global cart state
├── types/
│   ├── catalog.ts                # Gift card & cart types
│   └── employee.ts               # Employee & purpose types
└── catalog.json                  # Live gift card data (if using Tango)
```

## 🎯 Implementation Checklist

### Phase 1: Basic Setup
- [ ] Choose and checkout appropriate git branch
- [ ] Verify development environment
- [ ] Install any missing dependencies
- [ ] Configure TypeScript settings

### Phase 2: Gift Card System
- [ ] Set up gift card catalog display
- [ ] Implement filtering (category, country, currency)
- [ ] Create gift card detail modal
- [ ] Add cart functionality with context state management

### Phase 3: Employee & Purpose System
- [ ] Define employee data structure
- [ ] Configure incentive purposes
- [ ] Create employee selection interface
- [ ] Implement purpose-specific validation

### Phase 4: Checkout & Order Processing
- [ ] Build checkout modal with purpose selection
- [ ] Add employee multi-selection with "Select All" option
- [ ] Implement date selection for scheduled purposes
- [ ] Create order completion flow with confirmation

### Phase 5: UI/UX Polish
- [ ] Update navigation branding
- [ ] Ensure responsive design
- [ ] Add loading states and error handling
- [ ] Test complete user workflows

## 🔍 Integration Points

### Existing Codebase Integration
**Check for existing components:**
```bash
# Look for conflicting component names
grep -r "GiftCard\|Cart\|Employee" src/

# Check existing routing
grep -r "Router\|Route" src/

# Verify existing state management
grep -r "Context\|Provider" src/
```

### API Integration Points
- **Tango MCP**: Gift card catalog and ordering
- **Employee API**: HR system integration (optional)
- **Authentication**: User permission system
- **Logging**: Order tracking and analytics

## 📝 Configuration Questions for User

### Business Logic
1. **Budget Controls**: Any spending limits per employee/department?
2. **Approval Workflow**: Does someone need to approve orders?
3. **Notification System**: Who gets notified of orders?
4. **Reporting**: What analytics do you need?

### Technical Preferences
1. **State Management**: Stick with Context API or prefer Redux?
2. **Styling**: Continue with Tailwind CSS?
3. **Testing**: Need unit tests for components?
4. **Error Handling**: How should API errors be displayed?

### Deployment Considerations
1. **Environment Variables**: Any API keys or config needed?
2. **Build Process**: Any special build requirements?
3. **Hosting**: Where will this be deployed?

## 🚀 Getting Started Command

```bash
# 1. Choose your branch
git checkout [selected-branch]

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to localhost:5173

# 5. Begin implementation following the checklist above
```

## 📞 Support & Troubleshooting

### Common Issues
- **TypeScript Errors**: Check interface definitions in types/
- **Import Errors**: Verify file paths and exports
- **API Issues**: Check network requests and API responses
- **Styling Issues**: Ensure Tailwind classes are correct

### Debugging Steps
1. Check browser console for errors
2. Verify component props and state
3. Test API endpoints separately
4. Use React DevTools for component inspection

## 🎉 Success Criteria

Your implementation is complete when:
- [ ] Users can browse and filter gift cards
- [ ] Cart functionality works smoothly
- [ ] Purpose selection drives appropriate workflows
- [ ] Employee selection supports bulk operations
- [ ] Orders complete successfully with proper messaging
- [ ] All user flows are intuitive and responsive

---

**Note**: This prompt assumes familiarity with React, TypeScript, and modern web development practices. Adjust complexity based on developer experience level.
