import React from 'react';
import useCartStore from '../store/useCartStore';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Header = ({ onCartClick }) => {
  const totalQuantity = useCartStore((state) => state.totalQuantity);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: '80px', display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <LocalMallIcon sx={{ mr: 2, color: '#2196f3', fontSize: 32 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', color: '#ffffff' }}>
            AstroStore
          </Typography>
        </Box>
        <IconButton onClick={onCartClick} size="large" sx={{ color: '#ffffff', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' }}}>
          <Badge badgeContent={totalQuantity} sx={{ '& .MuiBadge-badge': { backgroundColor: '#2196f3', color: '#ffffff', fontSize: 14, height: 24, minWidth: 24 }}}>
            <ShoppingCartIcon fontSize="inherit" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

