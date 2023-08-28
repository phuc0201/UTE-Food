import { createSlice } from '@reduxjs/toolkit';

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    setUsers: (state, action)=>{
      state.data = action.payload;
    },
    setUserProfile: (state, action) => {
        state.data = action.payload;
    },
    updateProfile: (state, action) => {
        state.data = action.payload
    },
    changePassword: (state, action) => {
        state.data = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload
    }
  },
});

export const { setLoading, setError, setUserProfile, updateProfile, changePassword, setUsers } = userAccountSlice.actions;
export default userAccountSlice.reducer;
