import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import notificationReducer from '../features/notificationSlice';
import countriesReducer from '../features/countrySlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    countries: countriesReducer,
    user: userReducer,
  },
});
