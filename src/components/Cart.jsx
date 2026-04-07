import React from 'react';
import useCartStore from '../store/useCartStore';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  Paper,
  Button
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart = ({ onBack }) => {
  const { items: cartItems, totalAmount, removeItem, updateQuantity } = useCartStore();

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = (id) => {
    removeItem(id);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, sm: 4 }, 
        m: 2, 
        mt: 4, 
        borderRadius: 2, 
        backgroundColor: '#111111',
        border: '1px solid #333333'
      }}
    >
      <Box display="flex" mb={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: '#2196f3', '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
          Back to Shop
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: '#ffffff' }}>
        Your Shopping Cart
      </Typography>
      <Divider sx={{ mb: 2, backgroundColor: '#333333' }} />
      {cartItems.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" sx={{ color: '#aaaaaa' }}>
            Your cart is currently empty.
          </Typography>
        </Box>
      ) : (
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                sx={{ py: 3 }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.id)} sx={{ color: '#ffffff', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' }}}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={<Typography variant="h6" fontWeight="bold" color="#ffffff">{item.name}</Typography>}
                  secondary={<Typography variant="body1" sx={{ color: '#aaaaaa', mt: 1 }}>${item.price.toFixed(2)} / item</Typography>}
                />
                <Box display="flex" alignItems="center" mr={4}>
                  <IconButton onClick={() => handleDecrement(item)}>
                    <RemoveCircleOutlineIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                  <Typography variant="h6" sx={{ mx: 2, fontWeight: 'bold', color: '#ffffff' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton onClick={() => handleIncrement(item)}>
                    <AddCircleOutlineIcon sx={{ color: '#2196f3' }} />
                  </IconButton>
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mr: 4, minWidth: '80px', textAlign: 'right', color: '#ffffff' }}>
                  ${item.totalPrice.toFixed(2)}
                </Typography>
              </ListItem>
              <Divider sx={{ backgroundColor: '#333333' }} />
            </React.Fragment>
          ))}
        </List>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} p={3} sx={{ backgroundColor: '#000000', borderRadius: 2, border: '1px solid #333333' }}>
        <Typography variant="h4" fontWeight="bold" color="#ffffff">Total</Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#2196f3' }}>${totalAmount.toFixed(2)}</Typography>
      </Box>
      {cartItems.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button variant="contained" size="large" endIcon={<ShoppingCartCheckoutIcon />} sx={{ px: 4, py: 1.5, backgroundColor: '#ffffff', color: '#000000', '&:hover': { backgroundColor: '#cccccc' } }}>
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Cart;
