import React from 'react';
import { useGetPortfolioItemsQuery } from '../api/portfolioApi';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';

const PortfolioList: React.FC = () => {
  const { data: items, error, isLoading } = useGetPortfolioItemsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error loading portfolio items</Typography>;

  return (
    <Grid container spacing={4}>
      {items?.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              //image={item.imageUrl}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PortfolioList;
