import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/apiService';
import { notifyFailure, notifySuccess } from './notificationSlice';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDetails, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userDetails);
      dispatch(notifySuccess(response.data.message));
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
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
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
  token: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: () => initialState,
    setAuth: (state, action) => {
      state.isLoading = false;
      state.isSuccess = null;
      state.message = null;
      state.token = action.payload.token;
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
        state.token = payload.token;
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = payload;
      });
  },
});

export const { resetAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
