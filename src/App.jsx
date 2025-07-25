import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/AccountPage';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import { useSelector } from 'react-redux';
import Notification from './components/ui/Notification';

const RootLayout = () => {
  const { token } = useSelector((state) => state.auth);
  return !token ? (
    <Navigate to="/signIn" />
  ) : (
    <div className="min-h-[cal(h-screen-100px)]">
      <Outlet />
    </div>
  );
};

function App() {
  const theme = 'dark';

  return (
    <main className={theme}>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Notification />
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
