import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/AccountPage';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Notification from './components/ui/Notification';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  const theme = 'light';

  return (
    <main className={theme}>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Notification />
        <Routes>
          <Route element={<ProtectedRoutes />}>
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
