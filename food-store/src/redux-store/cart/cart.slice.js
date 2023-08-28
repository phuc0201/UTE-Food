import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    products: [],
    loading: false
  },
  reducers: {
    addToCart: (state, action) => {
        
    },
    removeFromCart: (state, action) => {
        
    },
    setCartItems: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
      state.products = action.payload.products;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCartItems, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
