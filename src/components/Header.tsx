
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  Container
} from '@mui/material';
import { Add, Inventory, Delete, Clear } from '@mui/icons-material';
import { useProducts } from '@/contexts/ProductContext';

export const Header: React.FC = () => {
  const { state, openFormModal, deleteSelectedProducts, clearSelection } = useProducts();

  return (
    <AppBar position="static" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Inventory sx={{ fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary' }}>
                Product Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {state.filteredProducts.length} of {state.products.length} products
                {state.selectedProducts.length > 0 && (
                  <Chip
                    label={`${state.selectedProducts.length} selected`}
                    size="small"
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {state.selectedProducts.length > 0 && (
              <>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={deleteSelectedProducts}
                >
                  Delete Selected ({state.selectedProducts.length})
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Clear />}
                  onClick={clearSelection}
                >
                  Clear Selection
                </Button>
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => openFormModal()}
            >
              Add Product
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
