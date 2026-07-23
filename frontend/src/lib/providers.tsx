'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getMe } from '@/store/slices/authSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { tokenStore, safeJsonParse } from '@/lib/tokenStore';
import { Product, CartItem } from '@/types';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000, retry: 1 } },
  }));

  useEffect(() => {
    // Restore auth — re-fetch user from API using stored token (no user data in localStorage)
    const token = tokenStore.get();
    if (token) {
      store.dispatch(getMe());
    }
    // Restore cart
    const cart = safeJsonParse<CartItem[]>(localStorage.getItem('cart')) ?? [];
    cart.forEach((item) => store.dispatch(addToCart({ product: item.product, color: item.color })));
    // Restore wishlist
    const wishlist = safeJsonParse<Product[]>(localStorage.getItem('wishlist')) ?? [];
    wishlist.forEach((product) => store.dispatch(toggleWishlist(product)));
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
