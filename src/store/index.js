import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    user: userReducer,
    auth: authReducer,
  },
});
