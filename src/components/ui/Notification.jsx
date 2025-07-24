import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { clearNotification } from '../../features/notificationSlice';

const Notification = () => {
  const { type, message } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      if (type === 'success') toast.success(message);
      else if (type === 'error') toast.error(message);
    }
    return () => dispatch(clearNotification());
  }, [type, message, dispatch]);

  return <Toaster richColors position="top-right" />;
};

export default Notification;
