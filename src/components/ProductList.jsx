import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Card, CardContent, Typography, CardActions, Button, Container, Box } from '@mui/material';

import HeadphonesIcon from '@mui/icons-material/Headphones';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import WatchIcon from '@mui/icons-material/Watch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const DUMMY_PRODUCTS = [
  { id: 'p1', price: 199.99, name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones.', icon: HeadphonesIcon },
  { id: 'p2', price: 699.99, name: 'Smartphone', description: 'Latest 5G smartphone with stunning camera.', icon: SmartphoneIcon },
  { id: 'p3', price: 1299.99, name: 'Laptop Pro', description: 'High-performance laptop for developers.', icon: LaptopMacIcon },
  { id: 'p4', price: 299.99, name: 'Smart Watch', description: 'Fitness tracking and notifications on wrist.', icon: WatchIcon },
  { id: 'p5', price: 899.99, name: 'Digital Camera', description: 'Mirrorless camera for professional photos.', icon: CameraAltIcon },
  { id: 'p6', price: 499.99, name: 'Gaming Console', description: 'Next-gen gaming experience.', icon: SportsEsportsIcon },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const { id, price, name, description } = product;
    dispatch(addItem({ id, price, name, description }));
  };

  return (
    <Container sx={{ mt: 2, pb: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6, color: '#ffffff' }}>
        Featured Products
      </Typography>
      
      {/* 
        Using Flexbox with a precise 'gap' guarantees equal and consistent spacing on all sides. 
        We use a fixed width and height on Cards to absolutely eliminate any sizing disparity.
      */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {DUMMY_PRODUCTS.map((product) => {
          const Icon = product.icon;
          return (
            <Card 
              key={product.id} 
              sx={{ 
                width: 320, 
                height: 400, 
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: '#111111' 
              }}
            >
              <Box sx={{ p: 4, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <Icon sx={{ fontSize: 64, color: '#2196f3' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3, pt: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, flexGrow: 1, color: '#aaaaaa' }}>
                  {product.description}
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#2196f3' }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0, flexShrink: 0 }}>
                <Button 
                  size="large" 
                  variant="contained" 
                  sx={{ backgroundColor: '#2196f3', color: '#ffffff', '&:hover': { backgroundColor: '#1976d2' } }}
                  fullWidth 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default ProductList;
