import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifyFailure } from './notificationSlice';
import api from '../api/apiService';

const initialState = {
  isLoading: false,
  user: null,
  message: null,
  isSuccess: null,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/user');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload.user;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = payload;
      }),
});

export default userSlice.reducer;
