
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ProductForm } from '@/components/ProductForm';
import { useProducts } from '@/contexts/ProductContext';

export const ProductFormModal: React.FC = () => {
  const { state, closeFormModal } = useProducts();

  return (
    <Dialog 
      open={state.isFormModalOpen} 
      onClose={closeFormModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {state.editingProduct ? 'Edit Product' : 'Add New Product'}
        <IconButton onClick={closeFormModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ProductForm
          product={state.editingProduct}
          onClose={closeFormModal}
        />
      </DialogContent>
    </Dialog>
  );
};
