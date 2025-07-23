import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/AccountPage';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import useStore from './store';
import { Toaster } from 'sonner';

const RootLayout = () => {
  const user = useStore((state) => state.user);
  return !user ? (
    <Navigate to="/signIn" />
  ) : (
    <div className="min-h-[cal(h-screen-100px)]">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <main>
      <Toaster richColors position="top-right" />
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<Navigate to={'/overview'} />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
