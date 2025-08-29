import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/apiService';
import { notifyFailure, notifySuccess } from './notificationSlice';

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

export const addAmount = createAsyncThunk(
  'account/addAmount',
  async ({ amount, accountId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/account/add-funds/${accountId}`, {
        amount,
      });
      dispatch(notifySuccess(response.data.message));
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const createAccount = createAsyncThunk(
  'account/createAccount',
  async (accountData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/account/create-account', accountData);
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
  getAccountInfo: {
    accounts: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  createAccount: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  addAmount: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccounts: () => initialState,
  },
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
      })
      .addCase(createAccount.pending, ({ createAccount }) => {
        createAccount.isLoading = true;
      })
      .addCase(createAccount.fulfilled, ({ createAccount }, { payload }) => {
        createAccount.isLoading = false;
        createAccount.isSuccess = true;
        createAccount.message = payload.message;
      })
      .addCase(createAccount.rejected, ({ createAccount }) => {
        createAccount.isLoading = false;
        createAccount.isSuccess = false;
      })
      .addCase(addAmount.pending, ({ addAmount }) => {
        addAmount.isLoading = true;
      })
      .addCase(addAmount.fulfilled, ({ addAmount }, { payload }) => {
        addAmount.isLoading = false;
        addAmount.isSuccess = true;
        addAmount.message = payload.message;
      })
      .addCase(addAmount.rejected, ({ addAmount }) => {
        addAmount.isLoading = false;
        addAmount.isSuccess = false;
      }),
});

export const { resetAccounts } = accountSlice.actions;

export default accountSlice.reducer;
