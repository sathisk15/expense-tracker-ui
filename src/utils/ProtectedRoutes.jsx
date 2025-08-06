import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth.token || localStorage.getItem('token');
  return !token ? (
    <Navigate to="/signIn" />
  ) : (
    <div className="min-h-[cal(h-screen-100px)]">
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
