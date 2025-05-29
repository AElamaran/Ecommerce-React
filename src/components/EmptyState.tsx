
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { useProducts } from '@/contexts/ProductContext';

interface EmptyStateProps {
  type: 'no-products' | 'no-results';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const { openFormModal, clearFilters } = useProducts();

  if (type === 'no-products') {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Box
          sx={{
            width: 96,
            height: 96,
            mx: 'auto',
            mb: 2,
            bgcolor: 'grey.100',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Add sx={{ fontSize: 48, color: 'grey.400' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          No products yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Get started by adding your first product to the catalog.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => openFormModal()}
        >
          Add Your First Product
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Box
        sx={{
          width: 96,
          height: 96,
          mx: 'auto',
          mb: 2,
          bgcolor: 'grey.100',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Search sx={{ fontSize: 48, color: 'grey.400' }} />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        No products found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Try adjusting your search terms or filters to find what you're looking for.
      </Typography>
      <Button variant="outlined" onClick={clearFilters}>
        Clear Filters
      </Button>
    </Box>
  );
};
