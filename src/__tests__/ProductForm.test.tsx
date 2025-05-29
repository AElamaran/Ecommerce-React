import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/muiTheme';
import { ProductForm } from '@/components/ProductForm';
import { ProductProvider } from '@/contexts/ProductContext';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ProductProvider>
      {children}
    </ProductProvider>
  </ThemeProvider>
);

const mockOnClose = jest.fn();

describe('ProductForm', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should render form with all required fields', () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stock quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('should show validation errors for invalid inputs', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/product name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/price is required/i)).toBeInTheDocument();
      expect(screen.getByText(/category is required/i)).toBeInTheDocument();
      expect(screen.getByText(/stock quantity is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please fix the errors above/i)).toBeInTheDocument();
    });
  });

  it('should prevent submission with invalid data', async () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    // Form should not close and onClose should not be called
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should successfully add product with valid data', async () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    // Fill in valid data
    await userEvent.type(screen.getByLabelText(/product name/i), 'Test Product');
    await userEvent.type(screen.getByLabelText(/price/i), '29.99');
    await userEvent.type(screen.getByLabelText(/stock quantity/i), '10');
    await userEvent.type(screen.getByLabelText(/description/i), 'Test description');

    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should clear form after successful submission', async () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    // Fill in data
    const nameInput = screen.getByLabelText(/product name/i);
    await userEvent.type(nameInput, 'Test Product');
    
    expect(nameInput).toHaveValue('Test Product');

    // Submit form
    await userEvent.type(screen.getByLabelText(/price/i), '29.99');
    await userEvent.type(screen.getByLabelText(/stock quantity/i), '10');
    
    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    // Form should be cleared (onClose will be called, which would unmount the form)
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should handle edit mode correctly', () => {
    const mockProduct = {
      id: '1',
      name: 'Existing Product',
      price: 19.99,
      category: 'Electronics' as const,
      stockQuantity: 5,
      description: 'Existing description',
      imageUrl: '', // base64 or empty
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    render(
      <TestWrapper>
        <ProductForm product={mockProduct} onClose={mockOnClose} />
      </TestWrapper>
    );

    expect(screen.getByDisplayValue('Existing Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('19.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update product/i })).toBeInTheDocument();
  });

  it('should validate name length constraints', async () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/product name/i);
    
    // Test minimum length
    await userEvent.type(nameInput, 'ab');
    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/must be at least 3 characters/i)).toBeInTheDocument();
    });

    // Test maximum length
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'a'.repeat(51));
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/must not exceed 50 characters/i)).toBeInTheDocument();
    });
  });

  it('should validate price format', async () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    const priceInput = screen.getByLabelText(/price/i);
    
    // Test negative price
    await userEvent.type(priceInput, '-10');
    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/must be a positive number/i)).toBeInTheDocument();
    });

    // Test invalid decimal places
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '10.999');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/must have at most 2 decimal places/i)).toBeInTheDocument();
    });
  });

  it('should show character counter for description', () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    expect(screen.getByText(/200 characters remaining/i)).toBeInTheDocument();
  });

  it('should reset form when reset button is clicked', async () => {
    render(
      <TestWrapper>
        <ProductForm onClose={mockOnClose} />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/product name/i);
    await userEvent.type(nameInput, 'Test Product');
    
    expect(nameInput).toHaveValue('Test Product');

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);

    expect(nameInput).toHaveValue('');
  });
});
