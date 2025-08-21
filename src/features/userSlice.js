import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifyFailure, notifySuccess } from './notificationSlice';
import api from '../api/apiService';

const initialState = {
  getUserInfo: {
    isLoading: false,
    user: null,
    message: null,
    isSuccess: null,
  },
  updateUserInfo: {
    isLoading: false,
    message: null,
    user: null,
    isSuccess: null,
  },
  updateUserPassword: {
    isLoading: false,
    message: null,
    isSuccess: null,
  },
};

export const getUserInfo = createAsyncThunk(
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

export const updateUserInfo = createAsyncThunk(
  'user/updateUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put('/user', data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(
        notifySuccess(
          response.data.message.includes('success') &&
            'Profile information updated Successfully'
        )
      );
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put('/user/update-password', data);
      dispatch(notifySuccess(response.data.message));
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
      .addCase(getUserInfo.pending, ({ getUserInfo }) => {
        getUserInfo.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, ({ getUserInfo }, { payload }) => {
        getUserInfo.isLoading = false;
        getUserInfo.isSuccess = true;
        getUserInfo.user = payload.user;
      })
      .addCase(getUserInfo.rejected, ({ getUserInfo }, { payload }) => {
        getUserInfo.isLoading = false;
        getUserInfo.isSuccess = false;
        getUserInfo.message = payload;
      })
      .addCase(updateUserInfo.pending, ({ updateUserInfo }) => {
        updateUserInfo.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, ({ updateUserInfo }) => {
        updateUserInfo.isLoading = false;
        updateUserInfo.isSuccess = true;
      })
      .addCase(updateUserInfo.rejected, ({ updateUserInfo }, { payload }) => {
        updateUserInfo.isLoading = false;
        updateUserInfo.isSuccess = false;
        updateUserInfo.message = payload;
      })
      .addCase(updateUserPassword.pending, ({ updateUserPassword }) => {
        updateUserPassword.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, ({ updateUserPassword }) => {
        updateUserPassword.isLoading = false;
        updateUserPassword.isSuccess = true;
      })
      .addCase(
        updateUserPassword.rejected,
        ({ updateUserPassword }, { payload }) => {
          updateUserPassword.isLoading = false;
          updateUserPassword.isSuccess = false;
          updateUserPassword.message = payload;
        }
      ),
});

export default userSlice.reducer;
