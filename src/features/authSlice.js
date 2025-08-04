import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/apiService';
import { notifyFailure, notifySuccess } from './notificationSlice';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDetails, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userDetails);
      dispatch(notifySuccess(response.data.message));
      // localStorage.setItem('token', JSON.stringify(response.data.token));
      // localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signin', userCredentials);
      dispatch(notifySuccess(response.data.message));
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: null,
  message: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isSuccess = null;
      state.message = null;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = payload.message;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = payload.message;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = payload;
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
