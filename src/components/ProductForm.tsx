import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Alert,
  Grid,
} from '@mui/material';
import { Save, Cancel, Grid3x3 } from '@mui/icons-material';
import { Product, ProductCategory } from '@/types/product';
import { useProducts } from '@/contexts/ProductContext';
import { validateProductForm } from '@/utils/validation';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

interface FormData {
  name: string;
  price: string;
  category: ProductCategory | '';
  stockQuantity: string;
  description: string;
  imageFile: File | null;
}

interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
  stockQuantity?: string;
  description?: string;
  imageFile?: string;
}

const categories: ProductCategory[] = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'];

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    category: '',
    stockQuantity: '',
    description: '',
    imageFile: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stockQuantity: product.stockQuantity.toString(),
        description: product.description || '',
        imageFile: null,
      });
      setImagePreview(product.imageUrl || null);
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        stockQuantity: '',
        description: '',
        imageFile: null,
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData(prev => ({ ...prev, imageFile: file || null }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(product?.imageUrl || null);
    }
    if (errors.imageFile) {
      setErrors(prev => ({ ...prev, imageFile: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateProductForm(formData).errors;
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl: string | undefined = undefined;
      if (formData.imageFile) {
        imageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(formData.imageFile!);
        });
      } else if (product && product.imageUrl) {
        imageUrl = product.imageUrl;
      }
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        category: formData.category as ProductCategory,
        stockQuantity: parseInt(formData.stockQuantity),
        description: formData.description.trim() || undefined,
        imageUrl,
      };
      if (product) {
        updateProduct({ ...product, ...productData });
      } else {
        addProduct(productData);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stockQuantity: product.stockQuantity.toString(),
        description: product.description || '',
        imageFile: null,
      });
      setImagePreview(product.imageUrl || null);
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        stockQuantity: '',
        description: '',
        imageFile: null,
      });
      setImagePreview(null);
    }
    setErrors({});
  };

  const descriptionLength = formData.description.length;
  const maxDescriptionLength = 200;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* Product Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size='small'
            label="Product Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            size='small'
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ min: 0, step: 0.01 }}
            required
          />
        </Grid>
        {/* Category */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.category} required size="small">
            <InputLabel shrink>Category</InputLabel>
            <Select
              size="small"
              value={formData.category}
              label="Category"
              displayEmpty
              onChange={(e) => handleInputChange('category', e.target.value)}
              renderValue={(selected) =>
          selected ? selected : <span style={{ color: '#aaa' }}>Select category</span>
              }
            >
              <MenuItem value="">
          <em>Select category</em>
              </MenuItem>
              {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, mx: 1.75 }}>
          {errors.category}
              </Typography>
            )}
          </FormControl>
        </Grid>
        {/* Stock Quantity */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size='small'
            label="Stock Quantity"
            type="number"
            value={formData.stockQuantity}
            onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity}
            inputProps={{ min: 0 }}
            required
          />
        </Grid>
        {/* Image Upload */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ height: 40 }}
          >
            {formData.imageFile ? formData.imageFile.name : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {(imagePreview) && (
            <Box mt={1}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8 }}
              />
            </Box>
          )}
        </Grid>
        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size='small'
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={
              errors.description ||
              `${descriptionLength}/${maxDescriptionLength} characters`
            }
          />
        </Grid>
        {/* Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="outlined"
              startIcon={<Cancel />}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
