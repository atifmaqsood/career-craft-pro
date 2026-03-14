import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium'
  },
  analytics: {
    views: 124,
    downloads: 45,
    shares: 12
  },
  isLoaded: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
      state.isLoaded = true;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
    updateAnalytics: (state, action) => {
      const { metric, value } = action.payload;
      state.analytics[metric] = value;
    }
  }
});

export const { setUser, setAnalytics, updateAnalytics } = userSlice.actions;
export default userSlice.reducer;
