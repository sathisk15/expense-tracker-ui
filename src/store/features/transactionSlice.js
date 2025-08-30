import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifyFailure, notifySuccess } from './notificationSlice';
import api from '../../api/apiService';

const transferFunds = createAsyncThunk(
  'transaction',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/transaction', data);
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
  transferFunds: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(transferFunds.fulfilled, ({ transferFunds }, action) => {
        transferFunds.isLoading = false;
        transferFunds.isSuccess = true;
        transferFunds.message = action.payload.message;
      })
      .addCase(transferFunds.pending, ({ transferFunds }) => {
        transferFunds.isLoading = true;
      })
      .addCase(transferFunds.rejected, ({ transferFunds }, action) => {
        transferFunds.isLoading = false;
        transferFunds.isSuccess = false;
        transferFunds.message = action.payload;
      }),
});

export const { createTransaction, setLoading, setError } =
  transactionSlice.actions;

export default transactionSlice.reducer;
