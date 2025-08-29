# Employee Incentives System - Development Prompt

## 🎯 Project Overview
Build a comprehensive employee incentives and gift card management system integrated with Tango MCP API for digital gift card distribution. This system supports both automated birthday gifts and scheduled incentive campaigns.

## 📋 Pre-Development Analysis & Setup

### 1. Analyze Existing Codebase Stack
**First, examine the current technology stack and adapt accordingly:**

```bash
# Check package.json for existing dependencies
cat package.json | grep -A 20 -B 5 "dependencies"

# Identify styling approach
ls -la | grep -E "(tailwind|styled|css|scss|less)"
find src -name "*.css" -o -name "*.scss" -o -name "*.module.css"

# Check framework and routing
grep -r "Route\|Router\|navigate" src/ | head -5
grep -r "useState\|useEffect" src/ | head -3

# Examine component structure and patterns
ls -la src/
find src -type f -name "*.jsx" -o -name "*.tsx" -o -name "*.js" -o -name "*.ts" | head -10
```

**Technology Stack Detection & Adaptation:**

#### Styling Approaches (Choose based on what's found):
- ✅ **Tailwind CSS** (`tailwind.config.js` exists)
- ✅ **CSS Modules** (`.module.css` files found) 
- ✅ **Styled Components** (`styled-components` in package.json)
- ✅ **SCSS/Sass** (`.scss` files found)
- ✅ **Plain CSS** (`globals.css` or similar found)
- ✅ **CSS-in-JS** (emotion, JSS, etc.)

#### Framework Detection:
- ✅ **React + TypeScript** (`.tsx` files, `@types/react`)
- ✅ **React + JavaScript** (`.jsx` files, no TS config)
- ✅ **Next.js** (`next` in package.json)
- ✅ **Vite + React** (`vite` in package.json)
- ✅ **Create React App** (`react-scripts` in package.json)
- ✅ **Vue.js** (`.vue` files found)
- ✅ **Angular** (`@angular` packages found)

#### State Management Detection:
- ✅ **Redux** (`redux`, `@reduxjs/toolkit` in package.json)
- ✅ **Context API** (`createContext` found in codebase)
- ✅ **Zustand** (`zustand` in package.json)
- ✅ **MobX** (`mobx` in package.json)
- ✅ **No state management** (just local useState)

### 2. Integration Point Discovery
**Ask user to choose integration approach by providing options based on your analysis:**

```bash
# Check for any navigation structure
find src -name "*nav*" -o -name "*sidebar*" -o -name "*menu*" -o -name "*header*" -type f
grep -ri "navigation\|menu\|nav" src/ | head -5

# Look for routing patterns
grep -r "Route\|path\|navigate\|Link" src/ | head -5

# Check component organization
ls -la src/
find src -type d | head -10

# Look for existing layout patterns
find src -name "*layout*" -o -name "*app*" -o -name "*main*" -type f
```

**Present flexible integration options to user:**

#### Option A: Navigation-Based Integration
> **If navigation system exists:**
> - Found navigation in: `[discovered files]`
> - Add new menu item to existing navigation
> - Follow existing link/route pattern

#### Option B: Route-Based Integration  
> **If routing system exists:**
> - Found routing in: `[discovered files]`
> - Add new route to existing router
> - Create standalone page component

#### Option C: Component Integration
> **If no routing found:**
> - Add as new component to existing page
> - Create widget/section within existing layout
> - Replace or extend existing component

#### Option D: Standalone Implementation
> **If minimal structure:**
> - Create complete mini-app within existing structure
> - Self-contained with own routing and state
> - Minimal integration with existing code

**Color Scheme & Design Detection:**
```bash
# For Tailwind projects
cat tailwind.config.js 2>/dev/null | grep -A 10 colors

# For CSS projects  
grep -r "primary\|secondary\|--.*color" src/ | head -5

# For styled-components projects
grep -r "theme\|colors\|palette" src/ | head -5
```

**Present styling options:**
> **Found styling approach:** `[detected approach]`
> **Existing color scheme:** `[discovered colors or "none detected"]`
> **Should we match existing styles?** (Recommended: Yes)

## 🏗️ Implementation Strategy (Adaptive Based on Stack)

### Step 1: Follow Existing Code Patterns
**Analyze and replicate existing patterns based on detected stack:**

```bash
# Study existing component structure (adapt to discovered file types)
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.vue" -o -name "*.js" | head -3 | xargs head -20

# Check existing patterns (language-agnostic)
grep -r "export\|module.exports\|export default" src/ | head -5

# Examine styling patterns (based on detected approach)
find src -name "*.css" -o -name "*.scss" -o -name "*.module.*" | head -3 | xargs head -10
```

### Step 2: Adaptive Styling Implementation

#### For Tailwind CSS Projects:
```css
/* Use discovered color variables */
bg-[detected-primary]        /* Primary actions */
text-[detected-secondary]    /* Secondary text */
border-[detected-accent]     /* Accent borders */
```

#### For CSS Modules Projects:
```css
/* styles.module.css */
.giftCard {
  background: var(--primary-color, #1e40af);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

#### For Styled Components Projects:
```typescript
import styled from 'styled-components';

const GiftCard = styled.div`
  background: ${props => props.theme.colors.primary || '#1e40af'};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
```

#### For Plain CSS Projects:
```css
/* global.css or component.css */
.gift-card {
  background: #1e40af; /* Fallback primary color */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

#### For SCSS Projects:
```scss
// Variables based on existing theme
$primary-color: #1e40af !default;
$secondary-color: #0891b2 !default;

.gift-card {
  background: $primary-color;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Step 3: Framework-Specific Integration

#### React Projects (TypeScript/JavaScript):
```typescript
// Component structure based on detected patterns
import React, { useState } from 'react';
// Import styling based on detected approach
import styles from './GiftCard.module.css'; // CSS Modules
// OR import styled from 'styled-components'; // Styled Components
// OR className="bg-primary text-white" // Tailwind

export const GiftCard: React.FC<GiftCardProps> = ({ brand, onSelect }) => {
  // Implementation following existing patterns
};
```

#### Vue.js Projects:
```vue
<template>
  <div :class="cardClasses" @click="handleSelect">
    <!-- Component template -->
  </div>
</template>

<script>
export default {
  name: 'GiftCard',
  props: ['brand'],
  // Implementation following Vue patterns
}
</script>

<style scoped>
/* Scoped styles or use existing styling approach */
</style>
```

#### Next.js Projects:
```typescript
// pages/gift-catalog.tsx or app/gift-catalog/page.tsx
import { GetStaticProps } from 'next';
// Follow existing Next.js patterns for data fetching and routing
```

### Step 4: State Management Adaptation

#### Redux Projects:
```typescript
// store/slices/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
// Follow existing Redux patterns
```

#### Context API Projects:
```typescript
// contexts/CartContext.tsx
import { createContext, useContext } from 'react';
// Follow existing context patterns
```

#### Zustand Projects:
```typescript
// stores/cartStore.ts
import { create } from 'zustand';
// Follow existing Zustand patterns
```

#### No State Management:
```typescript
// Use local useState and prop drilling
// Or suggest adding Context API for cart state
```

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

### Step 1: Environment Preparation
```bash
# Ensure development server works with existing setup
npm install  # Install any missing dependencies
npm run dev  # Verify current setup works

# If Tango MCP integration needed:
# Check for existing catalog.json or API integration
ls *.json | grep -i catalog
grep -r "mcp\|tango" src/
```

### Step 2: Component Development Following Existing Patterns

#### A. Gift Card Catalog Component
**Create following existing component structure:**
```typescript
// src/components/GiftCatalog.tsx
// Follow same import patterns as existing components
// Use same TypeScript interface style
// Match existing component export pattern
```

#### B. Type Definitions  
**Match existing type file structure:**
```typescript
// src/types/catalog.ts (if types/ directory exists)
// OR src/types/index.ts (append to existing)
// Follow same interface naming conventions
```

#### C. Context for State Management
**Only if Context API is used in existing codebase:**
```typescript
// src/contexts/CartContext.tsx
// Follow same context pattern as existing contexts
// Use same provider setup approach
```

### Step 3: Integration Implementation

#### Navigation Integration (Most Common)
```typescript
// Update existing Sidebar.tsx or Navigation component
// Add gift card icon (use same icon library as existing)
// Follow same NavLink pattern
// Use existing active state styling
```

#### Routing Integration
```typescript
// Update App.tsx routing
// Follow same Route definition pattern
// Use same layout wrapper if exists
```

### Step 4: Styling Integration
**Use existing design system:**
```tsx
// Card Component Example - Match existing card patterns
<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
  {/* Use existing color classes */}
  <div className="text-kyron-primary font-semibold">
  <button className="bg-kyron-primary text-white hover:bg-kyron-primary/90">
</div>
```

**Grid Layout - Follow existing responsive patterns:**
```tsx
// Match existing grid systems found in codebase
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

## 📁 File Structure Guide (Adaptive to Project Structure)

**First analyze existing structure, then adapt file creation:**

```bash
# Check current structure and adapt accordingly
tree src/ -I node_modules 2>/dev/null || find src -type d | head -10

# Identify existing patterns
ls -la src/
```

### Common Structure Patterns & Adaptations:

#### Pattern A: Feature-Based Structure
```
src/
├── features/
│   └── gift-catalog/           # Create new feature folder
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
```

#### Pattern B: Type-Based Structure (React/Angular)
```
src/
├── components/                 # Add gift components here
│   ├── GiftCatalog/
│   ├── GiftCard/
│   └── Cart/
├── services/                   # Add gift card API service
├── types/ (or models/)         # Add gift card types
└── store/ (or state/)          # Add cart state
```

#### Pattern C: Page-Based Structure (Next.js)
```
src/
├── pages/ (or app/)
│   └── gift-catalog.tsx       # New page
├── components/
│   └── gift/                  # Gift-related components
└── lib/
    └── gift-api.ts            # API integration
```

#### Pattern D: Flat Structure (Simple projects)
```
src/
├── GiftCatalog.js             # Single component approach
├── gift-api.js                # API utilities
└── gift-types.js              # Type definitions
```

#### Pattern E: Domain-Driven Structure
```
src/
├── domains/
│   └── employee-incentives/   # New domain
│       ├── components/
│       ├── services/
│       ├── types/
│       └── index.ts
```

### File Extensions Based on Project:
- **TypeScript Projects**: `.tsx`, `.ts`
- **JavaScript Projects**: `.jsx`, `.js`
- **Vue Projects**: `.vue`
- **Angular Projects**: `.component.ts`, `.service.ts`

### Styling File Locations:
- **Tailwind**: No separate style files needed
- **CSS Modules**: `ComponentName.module.css` next to component
- **Styled Components**: Styles in component file
- **SCSS**: `ComponentName.scss` or global SCSS imports
- **Plain CSS**: `ComponentName.css` or add to existing global CSS

## 🎯 Implementation Checklist (Contextual)

### Phase 1: Analysis & Planning
- [ ] **Analyze existing tech stack** (React version, TS config, styling approach)
- [ ] **Identify integration points** (sidebar, routing, dashboard, etc.)
- [ ] **Confirm design system usage** (existing Tailwind colors, component patterns)
- [ ] **Choose state management approach** (Context API, Redux, or existing pattern)

### Phase 2: Foundation Setup  
- [ ] **Create type definitions** following existing interface patterns
- [ ] **Set up state management** using same approach as existing codebase
- [ ] **Create base components** matching existing component structure
- [ ] **Configure routing** (if needed) following existing route patterns

### Phase 3: Component Development
- [ ] **Gift catalog grid** using existing card/grid patterns
- [ ] **Filtering system** matching existing filter UI patterns
- [ ] **Shopping cart** following existing dropdown/modal patterns
- [ ] **Gift card details modal** using existing modal implementation style

### Phase 4: Integration & Polish
- [ ] **Navigation integration** (update sidebar/nav following existing pattern)
- [ ] **Route registration** (add to existing routing structure)
- [ ] **Styling consistency** (ensure all components match existing design)
- [ ] **Responsive design** (follow existing breakpoint usage)

### Phase 5: Data & Functionality
- [ ] **Tango MCP integration** (API calls, data fetching)
- [ ] **Employee data connection** (mock or API integration)
- [ ] **Cart functionality** (add, remove, quantity management)
- [ ] **Checkout flow** (purpose selection, recipient selection)

## � Key Questions for User

### Integration Decisions
1. **Navigation Placement**: "I found an existing sidebar with navigation items. Should I add 'Employee Incentives' there, or prefer a different location?"

2. **Design Consistency**: "I see you're using [kyron-primary/secondary/accent] colors. Should I maintain this exact color scheme?"

3. **Component Patterns**: "I notice existing components use [specific pattern]. Should I follow the same structure for consistency?"

4. **State Management**: "Your current codebase uses [Context API/Redux/other]. Should I use the same approach for cart state?"

5. **Data Source**: "For employee data, should I create mock data or integrate with an existing API endpoint?"

### Technical Preferences  
1. **Icon Library**: "I see you're using [Heroicons/Lucide/other]. Should I use the same for gift card icons?"

2. **Modal Style**: "Looking at existing modals, should I match the same backdrop/positioning style?"

3. **Grid Layout**: "Your existing components use [specific grid classes]. Should I maintain the same responsive breakpoints?"

4. **Error Handling**: "How do you currently handle API errors in the existing codebase? Should I follow the same pattern?"

## 🚀 Getting Started Command

```bash
# 1. Analyze the existing codebase first
npm run dev  # Ensure current setup works

# 2. Examine existing patterns
grep -r "export.*function\|export.*const" src/components/ | head -5  # Component patterns
cat tailwind.config.js | grep -A 10 colors  # Color scheme
find src -name "*Context*" -o -name "*Provider*"  # State management

# 3. Ask user for integration preferences based on findings

# 4. Begin implementation following discovered patterns
```

## 📞 Best Practices for Integration

### Component Development
1. **Match Existing Patterns**: Study 2-3 existing components before creating new ones
2. **Consistent Naming**: Follow existing component and file naming conventions  
3. **Same Import Style**: Use same import order and aliasing as existing code
4. **TypeScript Consistency**: Match existing interface definitions and type usage

### Styling Integration
1. **Color Harmony**: Only use colors defined in existing Tailwind config
2. **Spacing Consistency**: Use same padding/margin patterns as existing components
3. **Typography**: Match existing font sizes, weights, and line heights
4. **Component Sizing**: Follow existing card/modal sizing patterns

### State Management
1. **Follow Existing Pattern**: Don't introduce new state management if pattern exists
2. **Context Naming**: Use same naming convention as existing contexts
3. **Provider Structure**: Match existing provider setup and usage patterns

### Integration Points
1. **Navigation**: Always update existing navigation, don't create parallel systems
2. **Routing**: Extend existing routing structure, maintain same route naming
3. **Layout**: Use existing layout wrappers and page structures

## 📝 Example Integration Flow

```typescript
// 1. Study existing component (e.g., src/components/ExistingCard.tsx)
// 2. Create new component following same pattern:

import { useState } from 'react';  // Same import style
import { Gift } from 'lucide-react';  // Same icon library
import type { Brand } from '../types/catalog';  // Same type import style

// Follow existing component export pattern
export default function GiftCard({ brand, onSelect }: GiftCardProps) {
  // Use same hook patterns
  const [isSelected, setIsSelected] = useState(false);
  
  return (
    // Use existing color classes and structure
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Follow existing card content pattern */}
    </div>
  );
}

// 3. Update existing navigation (e.g., src/components/Sidebar.tsx)
const navigation = [
  // ...existing items (keep all existing)
  { name: 'Employee Incentives', href: '/gift-catalog', icon: GiftIcon },  // Add new item
];

// 4. Update existing routing (e.g., src/App.tsx)  
<Routes>
  {/* ...existing routes (keep all existing) */}
  <Route path="gift-catalog" element={<GiftCatalog />} />  {/* Add new route */}
</Routes>
```

## 🎉 Success Criteria

Your integration is successful when:
- [ ] **Seamless Visual Integration**: New components look like they were built with the original app
- [ ] **Consistent User Experience**: Navigation, interactions, and flows feel natural
- [ ] **No Breaking Changes**: All existing functionality continues to work
- [ ] **Performance Maintained**: No significant impact on app loading or runtime performance  
- [ ] **Code Quality Match**: New code follows same patterns, conventions, and quality standards

---

**Remember**: The goal is to enhance the existing application, not replace it. Always prioritize consistency with existing patterns over introducing new approaches, unless specifically requested by the user.

---

## 🌐 Framework Compatibility Examples

### React with Different Styling Approaches

#### Tailwind CSS Example:
```tsx
const GiftCard = ({ brand }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
    <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      Select Gift
    </button>
  </div>
);
```

#### CSS Modules Example:
```tsx
import styles from './GiftCard.module.css';

const GiftCard = ({ brand }) => (
  <div className={styles.card}>
    <h3 className={styles.title}>{brand.name}</h3>
    <button className={styles.button}>Select Gift</button>
  </div>
);
```

#### Styled Components Example:
```tsx
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
`;

const GiftCard = ({ brand }) => (
  <Card>
    <h3>{brand.name}</h3>
    <button>Select Gift</button>
  </Card>
);
```

### Vue.js Example:
```vue
<template>
  <div class="gift-card" :class="cardClasses">
    <h3>{{ brand.name }}</h3>
    <button @click="selectGift" class="select-btn">Select Gift</button>
  </div>
</template>

<script>
export default {
  props: ['brand'],
  computed: {
    cardClasses() {
      return {
        'card-selected': this.isSelected
      }
    }
  },
  methods: {
    selectGift() {
      this.$emit('gift-selected', this.brand);
    }
  }
}
</script>
```

### Angular Example:
```typescript
@Component({
  selector: 'app-gift-card',
  template: `
    <div class="gift-card" [ngClass]="cardClasses">
      <h3>{{ brand.name }}</h3>
      <button (click)="selectGift()" class="select-btn">Select Gift</button>
    </div>
  `
})
export class GiftCardComponent {
  @Input() brand: Brand;
  @Output() giftSelected = new EventEmitter<Brand>();
  
  selectGift() {
    this.giftSelected.emit(this.brand);
  }
}
```

This approach ensures the integration works regardless of the existing project's technology stack, styling approach, or architectural patterns.
