import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalAmount: 0,

      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === newItem.id);
        
        let updatedItems;
        if (!existingItem) {
          updatedItems = [
            ...items,
            {
              id: newItem.id,
              name: newItem.name,
              price: newItem.price,
              quantity: 1,
              totalPrice: newItem.price,
            },
          ];
        } else {
          updatedItems = items.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.totalPrice + newItem.price,
                }
              : item
          );
        }

        set({
          items: updatedItems,
          totalQuantity: get().totalQuantity + 1,
          totalAmount: get().totalAmount + newItem.price,
        });
      },

      removeItem: (id) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === id);
        
        if (!existingItem) return;

        let updatedItems;
        if (existingItem.quantity === 1) {
          updatedItems = items.filter((item) => item.id !== id);
        } else {
          updatedItems = items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: item.totalPrice - item.price,
                }
              : item
          );
        }

        set({
          items: updatedItems,
          totalQuantity: get().totalQuantity - 1,
          totalAmount: get().totalAmount - existingItem.price,
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        
        const items = get().items;
        const existingItem = items.find((item) => item.id === id);
        if (!existingItem) return;

        const quantityDiff = quantity - existingItem.quantity;
        const updatedItems = items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: quantity,
                totalPrice: quantity * item.price,
              }
            : item
        );

        set({
          items: updatedItems,
          totalQuantity: get().totalQuantity + quantityDiff,
          totalAmount: get().totalAmount + quantityDiff * existingItem.price,
        });
      },

      clearCart: () => set({ items: [], totalQuantity: 0, totalAmount: 0 }),
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useCartStore;
