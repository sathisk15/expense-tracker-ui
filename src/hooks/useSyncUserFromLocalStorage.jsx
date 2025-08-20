import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/authSlice';

const useSyncUserFromLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) dispatch(setAuth({ token }));
  }, [dispatch]);
  return null;
};

export default useSyncUserFromLocalStorage;
