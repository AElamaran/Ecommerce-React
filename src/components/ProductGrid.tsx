
import React from 'react';
import { Grid, Box } from '@mui/material';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { useProducts } from '@/contexts/ProductContext';

export const ProductGrid: React.FC = () => {
  const { state } = useProducts();

  if (state.loading) {
    return <ProductGridSkeleton />;
  }

  if (state.products.length === 0) {
    return <EmptyState type="no-products" />;
  }

  if (state.filteredProducts.length === 0) {
    return <EmptyState type="no-results" />;
  }

  return (
    <Grid container spacing={3}>
      {state.filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} lg={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
