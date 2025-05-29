import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton, 
  Checkbox, 
  Chip, 
  Box,
  Skeleton 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Product } from '@/types/product';
import { useProducts } from '@/contexts/ProductContext';
import { formatCurrency } from '@/utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const { state, openFormModal, openDeleteDialog, toggleProductSelection } = useProducts();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const isSelected = state.selectedProducts.includes(product.id);
  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 5;

  const getStockChip = () => {
    if (isOutOfStock) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    }
    if (isLowStock) {
      return <Chip label={`Low Stock (${product.stockQuantity})`} color="warning" size="small" />;
    }
    return <Chip label={`In Stock (${product.stockQuantity})`} color="success" size="small" />;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xs: '100%', sm: 340, md: 320, lg: 300 },
        mx: 'auto',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 6,
          '& .action-buttons': {
            opacity: 1,
          }
        },
        ...(isSelected && {
          outline: 2,
          outlineColor: 'primary.main',
        })
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Checkbox
            checked={isSelected}
            onChange={() => toggleProductSelection(product.id)}
          />
          <Box className="action-buttons" sx={{ opacity: 0, transition: 'opacity 0.2s', display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => openFormModal(product)}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => openDeleteDialog(product)}
              sx={{ color: 'error.main' }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ position: 'relative', mb: 2 }}>
          {imageLoading && (
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} />
          )}
          {!imageError && product.imageUrl ? (
            <CardMedia
              component="img"
              height="200"
              image={product.imageUrl}
              alt={product.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sx={{ 
                borderRadius: 1,
                objectFit: 'cover',
                display: imageLoading ? 'none' : 'block'
              }}
            />
          ) : (
            !imageLoading && (
              <Box
                sx={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>4e6</Typography>
                <Typography variant="body2" color="text.secondary">
                  No Image
                </Typography>
              </Box>
            )
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
            {truncateText(product.name, 30)}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {formatCurrency(product.price)}
            </Typography>
            {getStockChip()}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          {product.description && (
            <Typography variant="body2" color="text.secondary">
              {truncateText(product.description, 80)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
