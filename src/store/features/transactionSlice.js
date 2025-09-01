import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifyFailure, notifySuccess } from './notificationSlice';
import api from '../../api/apiService';

export const transferFunds = createAsyncThunk(
  'transaction/transferFunds',
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

export const getDashboardInfo = createAsyncThunk(
  'transaction/dashboardInfo',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/transaction/dashboardInfo');
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
  dashboardInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
    data: {},
  },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransaction: () => initialState,
  },
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
      })
      .addCase(getDashboardInfo.pending, ({ dashboardInfo }) => {
        dashboardInfo.isLoading = true;
      })
      .addCase(getDashboardInfo.fulfilled, ({ dashboardInfo }, action) => {
        dashboardInfo.isLoading = false;
        dashboardInfo.isSuccess = true;
        dashboardInfo.data = action.payload;
      })
      .addCase(getDashboardInfo.rejected, ({ dashboardInfo }, action) => {
        dashboardInfo.isLoading = false;
        dashboardInfo.isSuccess = false;
        dashboardInfo.message = action.payload;
      }),
});

export const { resetTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
