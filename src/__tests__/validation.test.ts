import { ProductCategory } from '@/types/product';
import { validateProductForm, validatePriceRange } from '@/utils/validation';

describe('validateProductForm', () => {
  const validFormData = {
    name: 'Test Product',
    price: '29.99',
    category: 'Electronics' as ProductCategory,
    stockQuantity: '10',
    description: 'Test description',
    imageFile: null,
  };

  it('should pass validation with valid data', () => {
    const result = validateProductForm(validFormData);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('should fail validation when name is empty', () => {
    const result = validateProductForm({ ...validFormData, name: '', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Product name is required');
  });

  it('should fail validation when name is too short', () => {
    const result = validateProductForm({ ...validFormData, name: 'ab', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Product name must be at least 3 characters');
  });

  it('should fail validation when name is too long', () => {
    const result = validateProductForm({ ...validFormData, name: 'a'.repeat(51), category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Product name must not exceed 50 characters');
  });

  it('should fail validation when price is empty', () => {
    const result = validateProductForm({ ...validFormData, price: '', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.price).toBe('Price is required');
  });

  it('should fail validation when price is negative', () => {
    const result = validateProductForm({ ...validFormData, price: '-10', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.price).toBe('Price must be a positive number');
  });

  it('should fail validation when price has too many decimal places', () => {
    const result = validateProductForm({ ...validFormData, price: '10.999', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.price).toBe('Price must have at most 2 decimal places');
  });

  it('should fail validation when stock quantity is empty', () => {
    const result = validateProductForm({ ...validFormData, stockQuantity: '', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.stockQuantity).toBe('Stock quantity is required');
  });

  it('should fail validation when stock quantity is negative', () => {
    const result = validateProductForm({ ...validFormData, stockQuantity: '-5', category: 'Electronics' as ProductCategory });
    expect(result.isValid).toBe(false);
    expect(result.errors.stockQuantity).toBe('Stock quantity must be a non-negative integer');
  });

  it('should fail validation when description is too long', () => {
    const result = validateProductForm({ 
      ...validFormData, 
      description: 'a'.repeat(201),
      category: 'Electronics' as ProductCategory
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.description).toBe('Description must not exceed 200 characters');
  });

  it('should pass validation with empty optional fields', () => {
    const result = validateProductForm({
      ...validFormData,
      description: '',
      imageFile: null,
      category: 'Electronics' as ProductCategory
    });
    expect(result.isValid).toBe(true);
  });
});

describe('validatePriceRange', () => {
  it('should pass validation with empty range', () => {
    const result = validatePriceRange('', '');
    expect(result.isValid).toBe(true);
  });

  it('should pass validation with valid range', () => {
    const result = validatePriceRange('10', '100');
    expect(result.isValid).toBe(true);
  });

  it('should fail validation when min price is negative', () => {
    const result = validatePriceRange('-10', '100');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Minimum price must be a positive number');
  });

  it('should fail validation when max price is negative', () => {
    const result = validatePriceRange('10', '-5');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Maximum price must be a positive number');
  });

  it('should fail validation when min is greater than max', () => {
    const result = validatePriceRange('100', '50');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Minimum price cannot be greater than maximum price');
  });

  it('should pass validation with only min price', () => {
    const result = validatePriceRange('10', '');
    expect(result.isValid).toBe(true);
  });

  it('should pass validation with only max price', () => {
    const result = validatePriceRange('', '100');
    expect(result.isValid).toBe(true);
  });
});
