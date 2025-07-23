import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/apiService';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
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
    resetRegisterUser: (state) => {
      state.isLoading = false;
      state.isSuccess = null;
      state.message = null;
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
      });
  },
});

export const { resetRegisterUser } = authSlice.actions;

export default authSlice.reducer;
