import { createSlice } from '@reduxjs/toolkit';

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

const initialState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }

      localStorage.setItem('cartState', JSON.stringify(state));
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (quantity < 1) return; // Optional: prevent negative or zero quantity from direct update unless intended. Let's handle 0 by removing.
        const quantityDiff = quantity - existingItem.quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += quantityDiff * existingItem.price;
        
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
        
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
      
      localStorage.setItem('cartState', JSON.stringify(state));
    }
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
