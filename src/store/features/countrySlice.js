import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { COUNTRIES_URI } from '../../utils/constants';
import { notifyFailure } from './notificationSlice';
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  message: '',
};

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(COUNTRIES_URI);
      const modifiedCountryData = data.map((country) => ({
        name: country?.name?.common || '',
        currency: Object.keys(country.currencies)[0] || '',
        flag: country.flags.png,
      }));
      modifiedCountryData.sort((a, b) => a.name.localeCompare(b.name));
      return modifiedCountryData;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      dispatch(notifyFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Countries fetched successfully';
        state.data = payload;
      })
      .addCase(getCountries.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = payload;
      }),
});

export default countriesSlice.reducer;
