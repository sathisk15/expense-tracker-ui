import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/features/authSlice';
import notificationReducer from '../store/features/notificationSlice';
import countriesReducer from '../store/features/countrySlice';
import userReducer from '../store/features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    countries: countriesReducer,
    user: userReducer,
  },
});
