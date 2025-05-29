
import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search, Clear } from '@mui/icons-material';
import { useProducts } from '@/contexts/ProductContext';
import { ProductCategory } from '@/types/product';

const categories: (ProductCategory | 'All')[] = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'];
const stockStatuses = ['All', 'In Stock', 'Out of Stock', 'Low Stock'] as const;

export const ProductFilters: React.FC = () => {
  const { filters, setFilters, clearFilters } = useProducts();

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'All' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.stockStatus !== 'All';

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Search */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size='small'
              label="Search Products"
              placeholder="Search by name or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} md={6} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                displayEmpty
                onChange={(e) => handleFilterChange('category', e.target.value)}
                renderValue={(selected) => {
                  if (!selected || selected === 'All') {
                    return <span style={{ color: '#aaa' }}>Category</span>;
                  }
                  return selected;
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Range */}
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size='small'
                label="Min Price"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Max Price"
                type="number"
                size='small'
                inputProps={{ min: 0, step: 0.01 }}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                sx={{ flex: 1 }}
              />
            </Box>
          </Grid>

          {/* Stock Status */}
          <Grid item xs={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Stock Status</InputLabel>
              <Select
                size='small'
                value={filters.stockStatus}
                label="Stock Status"
                onChange={(e) => handleFilterChange('stockStatus', e.target.value)}
              >
                {stockStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {hasActiveFilters && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Active filters applied
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Clear />}
              onClick={clearFilters}
              sx={{ color: 'text.secondary' }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
