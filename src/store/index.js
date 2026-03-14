import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    user: userReducer,
  },
});
