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
    return accountNumber.slice(0, 13);
  }
};
