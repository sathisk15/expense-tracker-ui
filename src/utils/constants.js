export const COUNTRIES_URI =
  'https://restcountries.com/v3.1/all?fields=name,currencies,flags';

export const commonResponse = {
  isLoading: false,
  isSuccess: null,
  message: null,
};

export const objectResponse = {
  ...commonResponse,
  data: {},
};
export const arrayResponse = {
  ...commonResponse,
  data: [],
};
