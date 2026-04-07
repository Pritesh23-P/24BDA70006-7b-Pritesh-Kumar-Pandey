import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useCartStore from '../store/useCartStore';
import { Card, CardContent, Typography, CardActions, Button, Container, Box, CircularProgress } from '@mui/material';

import HeadphonesIcon from '@mui/icons-material/Headphones';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import WatchIcon from '@mui/icons-material/Watch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const ICON_MAP = {
  HeadphonesIcon: HeadphonesIcon,
  SmartphoneIcon: SmartphoneIcon,
  LaptopMacIcon: LaptopMacIcon,
  WatchIcon: WatchIcon,
  CameraAltIcon: CameraAltIcon,
  SportsEsportsIcon: SportsEsportsIcon,
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products.json');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 2, pb: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6, color: '#ffffff' }}>
        Featured Products
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {products.map((product) => {
          const Icon = ICON_MAP[product.icon] || HeadphonesIcon;
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
