
import React from 'react';
import { Box } from '@mui/material';
import { ProductProvider } from '@/contexts/ProductContext';
import { Header } from '@/components/Header';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductFormModal } from '@/components/ProductFormModal';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

export const ProductDashboard: React.FC = () => {
  return (
    <ProductProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Box
          component="main"
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: 2,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <ProductFilters />
          <ProductGrid />
        </Box>
        <ProductFormModal />
        <DeleteConfirmDialog />
      </Box>
    </ProductProvider>
  );
};
