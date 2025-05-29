import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/muiTheme';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductProvider } from '@/contexts/ProductContext';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ProductProvider>
      {children}
    </ProductProvider>
  </ThemeProvider>
);

describe('ProductFilters', () => {
  it('should render all filter inputs', () => {
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stock status/i)).toBeInTheDocument();
  });

  it('should update search filter on input change', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    const searchInput = screen.getByLabelText(/search products/i);
    await user.type(searchInput, 'test product');

    expect(searchInput).toHaveValue('test product');
  });

  it('should update category filter on select change', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    const categorySelect = screen.getByLabelText(/category/i);
    await user.click(categorySelect);

    const categoryOption = screen.getByText(/clothing/i);
    await user.click(categoryOption);

    expect(categorySelect).toHaveTextContent(/clothing/i);
  });

  it('should update min price filter on input change', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    const minPriceInput = screen.getByLabelText(/min price/i);
    await user.type(minPriceInput, '10');

    expect(minPriceInput).toHaveValue(10);
  });

  it('should update stock status filter on select change', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    const stockStatusSelect = screen.getByLabelText(/stock status/i);
    await user.click(stockStatusSelect);

    const stockStatusOption = screen.getByText(/out of stock/i);
    await user.click(stockStatusOption);

    expect(stockStatusSelect).toHaveTextContent(/out of stock/i);
  });

  it('should call clearFilters when clear filters button is clicked', async () => {
    const clearFiltersMock = jest.fn();
    jest.mock('@/contexts/ProductContext', () => ({
      useProducts: () => ({
        filters: {
          search: 'test',
          category: 'Electronics',
          minPrice: '10',
          maxPrice: '100',
          stockStatus: 'In Stock',
        },
        setFilters: jest.fn(),
        clearFilters: clearFiltersMock,
      }),
    }));

    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    const clearFiltersButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearFiltersButton);

    expect(clearFiltersMock).toHaveBeenCalled();
  });
});
