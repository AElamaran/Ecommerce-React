
import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

export const ProductGridSkeleton: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2, borderRadius: 1 }} />
              <Skeleton variant="text" width="75%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="50%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={20} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
