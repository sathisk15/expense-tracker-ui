import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/authSlice';

const useSyncUserFromLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (user && token) dispatch(setAuth({ user, token }));
  }, [dispatch]);
  return null;
};

export default useSyncUserFromLocalStorage;
