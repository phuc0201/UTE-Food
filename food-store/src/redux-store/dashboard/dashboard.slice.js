import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    setData: (state, action)=>{
      state.data = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload
    }
  },
});

export const { setData, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
