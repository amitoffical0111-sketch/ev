import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface WishlistState { items: Product[]; }

const load = (): Product[] => [];

const save = (items: Product[]) => {
  if (typeof window !== 'undefined') localStorage.setItem('wishlist', JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] } as WishlistState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const idx = state.items.findIndex(i => i._id === action.payload._id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
      save(state.items);
    },
    clearWishlist: (state) => { state.items = []; save([]); },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export const isInWishlist = (state: { wishlist: WishlistState }, id: string) =>
  state.wishlist.items.some(i => i._id === id);
export default wishlistSlice.reducer;
