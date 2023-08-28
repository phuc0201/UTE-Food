import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null
  },
  reducers: {
    setOrders: (state, action)=>{
      state.orders = action.payload;
    },
    createOrder: (state, action) => {
        state.orders = action.payload;
    },
    setOrderItems: (state, action) => {
        state.orders = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload
    }
  },
});

export const { setOrderItems, setLoading, createOrder, setError, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
