import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    totalPrice: 0,
    products: [],
    loading: false,
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action)=>{
        state.error = action.payload
    }
  },
});

export const { setProducts, setError, setLoading } = productSlice.actions;
export default productSlice.reducer;
