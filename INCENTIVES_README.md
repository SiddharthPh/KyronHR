# 🏆 Kyron HR - Employee Incentives System

## 🎯 Manager Recognition System

A comprehensive employee incentives and recognition platform integrated with **Tango MCP API** for digital gift card delivery.

## ✨ Features

### 🏅 Manager Recognition Dashboard
- **Spot Bonuses** - Instant recognition for exceptional work
- **Achievement Rewards** - Milestone and goal completion bonuses  
- **Performance Recognition** - Outstanding performance acknowledgments
- **Team Player Awards** - Collaboration and teamwork recognition
- **Innovation Rewards** - Creative and innovative contributions
- **Customer Service** - Exceptional client service recognition

### 🎁 Gift Card Integration
- **Amazon.com** ($0.01 - $2,000) - Most flexible option
- **Starbucks** ($5 - $500) - Daily coffee/treat rewards
- **PayPal** ($1 - $2,000) - Cash equivalent transfers
- **Visa Prepaid** ($5 - $1,000) - Universal shopping cards
- **Tango Choice** ($0.01 - $2,000) - Let recipients choose

### 📊 Tracking & Analytics
- Recognition history and status tracking
- Budget management and spending analytics
- Performance integration (auto-recognize goal completion)
- Department-wise recognition patterns

## 🚀 Quick Start

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend API (Optional)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start backend server
npm start

# Development with auto-reload
npm run dev
```

## 🎮 Usage Guide

### Creating Recognition

1. **Navigate to Employee Incentives** 
   - Click "Employee Incentives" in the sidebar
   - View the recognition dashboard with stats and history

2. **Send New Recognition**
   - Click "New Recognition" button
   - Select employee from dropdown
   - Choose recognition type (spot bonus, achievement, etc.)
   - Pick gift card brand and amount
   - Add reason and personal message
   - Submit to send instantly

3. **Track Recognition**
   - View all sent recognitions in the main table
   - Filter by status, type, or search by employee
   - Monitor delivery status and order references

### From Performance Goals

1. **Goal Completion Recognition**
   - Go to "Performance & Goals" page
   - Find completed goals
   - Click "Send Recognition" button on completed goals
   - Auto-populate with goal achievement context

## 🛠 Technical Integration

### Tango MCP API Integration

The system is designed to integrate with Tango's Model Context Protocol for seamless gift card ordering:

```typescript
// Example order creation
const orderData = {
  customer_identifier: 'kyron-hr-customer',
  account_identifier: 'kyron-hr-main-account',
  order_info: {
    utid: 'U163059', // Amazon gift card
    amount: 100,
    recipient: {
      email: 'employee@company.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    sendEmail: true,
    message: 'Outstanding work on Q1 project!',
    externalRefID: 'kyron-rec-001'
  }
};
```

### Backend Proxy
- Secure API key management
- Order tracking and history
- Error handling and retry logic
- Webhook support for delivery confirmations

### Frontend Features
- Real-time order status updates
- Responsive design for mobile/desktop
- Integration with existing HR modules
- Role-based permissions

## 🔧 Configuration

### Environment Variables
```bash
# Backend (.env)
PORT=3001
MCP_AUTH_TOKEN=your_mcp_token
MCP_CUSTOMER_ID=your_customer_id
MCP_ACCOUNT_ID=your_account_id
```

### Recognition Types
Customize recognition categories in `src/pages/EmployeeIncentives.tsx`:
```typescript
const incentiveTypes = [
  { id: 'spot_bonus', label: 'Spot Bonus', icon: TrophyIcon },
  { id: 'achievement', label: 'Achievement', icon: StarIcon },
  // Add custom types...
];
```

## 🎨 UI Components

### Recognition Cards
- Employee information and manager details
- Recognition type badges with icons
- Gift card brand and amount display
- Status tracking with color-coded indicators
- Personal messages and reasons

### Gift Catalog
- Visual gift card selection
- Price range information
- Brand descriptions and details
- Availability status

### Analytics Dashboard  
- Recognition statistics and trends
- Budget utilization tracking
- Department performance metrics
- Individual recognition history

## 🔗 Integration Points

### With Existing HR Modules
- **Performance Goals** - Auto-recognize goal completions
- **Employee Directory** - Quick employee selection
- **Dashboard** - Recognition metrics and widgets

### With External Systems
- **Tango MCP** - Gift card ordering and delivery
- **Email Systems** - Recognition notifications
- **Accounting** - Budget tracking and reporting

## 📱 Mobile Responsive

The system is fully responsive and works on:
- Desktop computers
- Tablets 
- Mobile phones
- Touch-screen interfaces

## 🎯 Best Practices

### Manager Guidelines
- **Be Specific** - Clearly state what the recognition is for
- **Be Timely** - Send recognition soon after the achievement
- **Be Personal** - Add meaningful messages that resonate
- **Be Fair** - Ensure consistent recognition across team members

### Recognition Amounts
- **Spot Bonus**: $25-50 for quick acknowledgments
- **Achievement**: $50-100 for major accomplishments  
- **Exceptional Performance**: $100-200 for outstanding work
- **Innovation**: $75-150 for creative solutions
- **Team Player**: $25-75 for collaboration efforts

## 🚀 Next Steps

1. **Setup MCP Account** - Get Tango MCP API credentials
2. **Configure Backend** - Add real API integration
3. **Test Orders** - Verify gift card delivery workflow
4. **Train Managers** - Onboard managers on the recognition process
5. **Monitor Usage** - Track adoption and impact metrics

## 💡 Tips

- **Start Small** - Begin with 1-2 gift card options
- **Set Budgets** - Define monthly recognition budgets per manager
- **Track Impact** - Monitor employee satisfaction and retention
- **Iterate** - Gather feedback and improve the process

---

**Built with ❤️ for Kyron HR Team**

*Empowering managers to recognize and reward exceptional performance*
