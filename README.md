
# E-Commerce Product Dashboard

A comprehensive React application for managing an e-commerce product catalog with full CRUD functionality, advanced search/filter capabilities, and performance optimizations.

## 🚀 Features

### Core Functionality
- **Complete CRUD Operations**: Add, edit, delete products with confirmation dialogs
- **Advanced Search & Filtering**: Real-time search with category, price range, and stock status filters
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Data Persistence**: Local storage integration with error handling
- **Form Validation**: Comprehensive client-side validation with real-time feedback

### Advanced Features
- **Bulk Operations**: Select and delete multiple products
- **Performance Optimizations**: Debounced search, memoized components, optimized re-renders
- **Error Handling**: Error boundaries and graceful error handling
- **Loading States**: Skeleton screens and loading indicators
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: Reusable logic with useLocalStorage, useDebounce
- **Context API**: Centralized state management with useReducer
- **Comprehensive Testing**: Unit tests with React Testing Library
- **Modern React Patterns**: Functional components, hooks, and best practices

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **React Testing Library** - Testing utilities for React components
- **Jest** - JavaScript testing framework
- **Vite** - Fast build tool and development server

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) to view the application.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ProductGrid.tsx
│   └── ...
├── contexts/           # React contexts
│   └── ProductContext.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── use-toast.ts
├── types/              # TypeScript type definitions
│   └── product.ts
├── utils/              # Utility functions
│   ├── currency.ts
│   └── validation.ts
├── __tests__/          # Test files
│   ├── setup.ts
│   └── *.test.tsx
└── pages/              # Page components
    ├── Index.tsx
    └── NotFound.tsx
```

## 🎯 Key Components

### ProductDashboard
The main application component that provides the overall layout and integrates all features.

### ProductContext
Centralized state management using React Context and useReducer for:
- Product CRUD operations
- Filter state management
- UI state (modals, selections)
- Local storage persistence

### ProductForm
Comprehensive form component with:
- Real-time validation
- Character counters
- Error handling
- Edit/Add modes

### ProductGrid
Responsive grid displaying products with:
- Memoized product cards
- Loading states
- Empty states
- Bulk selection

## 🔧 Validation Rules

### Product Name
- Required field
- Minimum 3 characters
- Maximum 50 characters

### Price
- Required field
- Must be positive number
- Maximum 2 decimal places

### Stock Quantity
- Required field
- Must be non-negative integer

### Description
- Optional field
- Maximum 200 characters

### Image URL
- Optional field
- Must be valid URL format

## 🚀 Performance Optimizations

### Component Level
- **React.memo**: Prevents unnecessary re-renders of ProductCard components
- **useCallback**: Memoizes event handlers passed to child components
- **useMemo**: Caches expensive calculations like filtered products

### Search & Filtering
- **Debounced Search**: 300ms delay to prevent excessive filtering
- **Optimized Filters**: Efficient filtering algorithms
- **Combined Filtering**: All filters work together seamlessly

### Data Management
- **Local Storage**: Automatic persistence with error handling
- **Optimistic Updates**: Immediate UI updates for better UX
- **State Structure**: Optimized to minimize re-renders

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**:
  - Mobile: 1 column grid
  - Tablet: 2 column grid
  - Desktop: 3 column grid
- **Touch Friendly**: Appropriate touch targets and interactions

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling in modals
- **Color Contrast**: WCAG compliant color schemes
- **Error Announcements**: Screen reader friendly error messages

## 🧪 Testing Strategy

### Component Tests
- Form validation and submission
- Product display and interactions
- Filter functionality
- CRUD operations

### Hook Tests
- useLocalStorage functionality
- Custom hook behavior
- Error handling

### Integration Tests
- Full user workflows
- Data persistence
- State management

### Coverage Goals
- Components: >90%
- Hooks: >95%
- Utilities: >95%

## 🔄 State Management Flow

```
User Action → Context Action → Reducer → State Update → Component Re-render → Local Storage
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🎨 Design Decisions

### Color Scheme
- Primary: Blue (#2563eb) - Trust and professionalism
- Success: Green - Positive actions
- Danger: Red - Destructive actions
- Neutral: Gray scale - Content and backgrounds

### Typography
- System fonts for performance
- Clear hierarchy with appropriate sizes
- Readable line heights and spacing

### Layout
- Grid-based responsive design
- Consistent spacing using Tailwind scale
- Card-based product presentation

## 🔮 Future Enhancements

- **Pagination**: Handle large product catalogs
- **Image Upload**: Direct image upload with preview
- **Categories Management**: Dynamic category creation
- **Export/Import**: CSV/JSON data operations
- **Advanced Analytics**: Product performance metrics
- **User Authentication**: Multi-user support
- **Real-time Updates**: WebSocket integration

## 🐛 Known Issues

None currently identified. Please report any issues in the project repository.

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the project repository.
