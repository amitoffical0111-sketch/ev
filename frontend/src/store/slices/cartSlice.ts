import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const loadCart = (): CartItem[] => [];

const saveCart = (items: CartItem[]) => {
  if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; color?: string }>) => {
      const existing = state.items.find(i => i.product._id === action.payload.product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload.product, quantity: 1, color: action.payload.color });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.product._id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.product._id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    toggleCart: (state) => { state.isOpen = !state.isOpen; },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export default cartSlice.reducer;
