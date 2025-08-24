import { createSlice } from '@reduxjs/toolkit';

const initialState = { type: null, message: null };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifySuccess: (state, { payload }) => {
      state.type = 'success';
      state.message = payload;
    },
    notifyFailure: (state, { payload }) => {
      state.type = 'error';
      state.message = payload;
    },
    clearNotification: () => initialState,
  },
});

export const { notifySuccess, notifyFailure, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
