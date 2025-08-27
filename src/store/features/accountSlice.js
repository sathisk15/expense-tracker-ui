import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/apiService';
import { notifyFailure } from './notificationSlice';

export const getAccountInfo = createAsyncThunk(
  'account/getAccountInfo',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/account');
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  getAccountInfo: {
    accounts: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getAccountInfo.pending, ({ getAccountInfo }) => {
        getAccountInfo.isLoading = true;
      })
      .addCase(getAccountInfo.fulfilled, ({ getAccountInfo }, { payload }) => {
        getAccountInfo.isLoading = false;
        getAccountInfo.isSuccess = true;
        getAccountInfo.accounts = payload.accounts;
        getAccountInfo.message = payload.message;
      })
      .addCase(getAccountInfo.rejected, ({ getAccountInfo }) => {
        getAccountInfo.isLoading = false;
        getAccountInfo.isSuccess = false;
      }),
});

export default accountSlice.reducer;
