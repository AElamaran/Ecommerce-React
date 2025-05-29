
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useProducts } from '@/contexts/ProductContext';

export const DeleteConfirmDialog: React.FC = () => {
  const { state, closeDeleteDialog, deleteProduct } = useProducts();

  const handleConfirmDelete = () => {
    if (state.productToDelete) {
      deleteProduct(state.productToDelete.id);
      closeDeleteDialog();
    }
  };

  return (
    <Dialog open={state.isDeleteDialogOpen} onClose={closeDeleteDialog}>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone. This will permanently delete the product{' '}
          <strong>"{state.productToDelete?.name}"</strong> from your catalog.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog}>Cancel</Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          autoFocus
        >
          Delete Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};
