import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/AccountPage';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Notification from './components/ui/Notification';
import ProtectedRoutes from './utils/ProtectedRoutes';
import useSyncTokenFromLocalStorage from './hooks/useSyncTokenFromLocalStorage';

function App() {
  const theme = 'light';
  useSyncTokenFromLocalStorage();
  return (
    <main className={theme}>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Notification />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate to={'/dashboard'} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountPage />} />
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
