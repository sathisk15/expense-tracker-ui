import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

export const generateAccountNumber = () => {
  let accountNumber = '';
  while (accountNumber.length < 13) {
    const uuid = uuidv4().replace(/-/g, '');
    accountNumber += uuid.replace(/\D/g, '');
    return accountNumber.slice(0, 16);
  }
};

export const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  return accountNumber.replace(/(.{4})/g, '$1 ').trim();
};

export const formatCurrency = (amount) => {
  const code = JSON.parse(localStorage.getItem('user'))?.currency || 'INR';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: code,
  }).format(amount);
};

export const formatDateFullStyle = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    dateStyle: 'full',
  });

export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  const firstFourDigit = accountNumber.slice(0, 4);
  const lastFourDigit = accountNumber.slice(-4);
  const mask = '*'.repeat(accountNumber.length - 8);
  return firstFourDigit + mask + lastFourDigit;
};
