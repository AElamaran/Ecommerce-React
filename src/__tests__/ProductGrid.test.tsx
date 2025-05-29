import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/muiTheme';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductProvider } from '@/contexts/ProductContext';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ProductProvider>
      {children}
    </ProductProvider>
  </ThemeProvider>
);

describe('ProductGrid', () => {
  it('should render loading skeleton when loading', () => {
    render(
      <TestWrapper>
        <ProductGrid />
      </TestWrapper>
    );

    // Check if skeleton cards are rendered
    const skeletons = screen.getAllByTestId(/skeleton/i);
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render EmptyState component when there are no products', () => {
    render(
      <TestWrapper>
        <ProductGrid />
      </TestWrapper>
    );

    // Mock the ProductContext state to simulate no products
    jest.spyOn(require('@/contexts/ProductContext'), 'useProducts').mockReturnValue({
      state: {
        products: [],
        filteredProducts: [],
        loading: false,
        isFormModalOpen: false,
        isDeleteDialogOpen: false,
        selectedProducts: [],
        productToDelete: null,
        editingProduct: null,
        filters: {
          search: '',
          category: 'All',
          minPrice: '',
          maxPrice: '',
          stockStatus: 'All',
        },
      },
      addProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      openFormModal: jest.fn(),
      closeFormModal: jest.fn(),
      openDeleteDialog: jest.fn(),
      closeDeleteDialog: jest.fn(),
      toggleProductSelection: jest.fn(),
      deleteSelectedProducts: jest.fn(),
      clearSelection: jest.fn(),
      setFilters: jest.fn(),
      clearFilters: jest.fn(),
    });

    // Check if EmptyState component is rendered
    expect(screen.getByText(/no products yet/i)).toBeInTheDocument();
  });

  it('should render EmptyState component when there are no filtered products', () => {
    render(
      <TestWrapper>
        <ProductGrid />
      </TestWrapper>
    );

    // Mock the ProductContext state to simulate no filtered products
    jest.spyOn(require('@/contexts/ProductContext'), 'useProducts').mockReturnValue({
      state: {
        products: [{ id: '1', name: 'Test Product', price: 20, category: 'Electronics', stockQuantity: 5 }],
        filteredProducts: [],
        loading: false,
        isFormModalOpen: false,
        isDeleteDialogOpen: false,
        selectedProducts: [],
        productToDelete: null,
        editingProduct: null,
        filters: {
          search: '',
          category: 'All',
          minPrice: '',
          maxPrice: '',
          stockStatus: 'All',
        },
      },
      addProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      openFormModal: jest.fn(),
      closeFormModal: jest.fn(),
      openDeleteDialog: jest.fn(),
      closeDeleteDialog: jest.fn(),
      toggleProductSelection: jest.fn(),
      deleteSelectedProducts: jest.fn(),
      clearSelection: jest.fn(),
      setFilters: jest.fn(),
      clearFilters: jest.fn(),
    });

    // Check if EmptyState component is rendered
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('should render ProductCard components when there are filtered products', () => {
    render(
      <TestWrapper>
        <ProductGrid />
      </TestWrapper>
    );

    // Mock the ProductContext state to simulate filtered products
    jest.spyOn(require('@/contexts/ProductContext'), 'useProducts').mockReturnValue({
      state: {
        products: [{ id: '1', name: 'Test Product', price: 20, category: 'Electronics', stockQuantity: 5 }],
        filteredProducts: [{ id: '1', name: 'Test Product', price: 20, category: 'Electronics', stockQuantity: 5 }],
        loading: false,
        isFormModalOpen: false,
        isDeleteDialogOpen: false,
        selectedProducts: [],
        productToDelete: null,
        editingProduct: null,
        filters: {
          search: '',
          category: 'All',
          minPrice: '',
          maxPrice: '',
          stockStatus: 'All',
        },
      },
      addProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      openFormModal: jest.fn(),
      closeFormModal: jest.fn(),
      openDeleteDialog: jest.fn(),
      closeDeleteDialog: jest.fn(),
      toggleProductSelection: jest.fn(),
      deleteSelectedProducts: jest.fn(),
      clearSelection: jest.fn(),
      setFilters: jest.fn(),
      clearFilters: jest.fn(),
    });

    // Check if ProductCard components are rendered
    expect(screen.getByText(/test product/i)).toBeInTheDocument();
  });
});
