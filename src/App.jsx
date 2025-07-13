import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/AccountPage';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import useStore from './store';

const RootLayout = () => {
  const user = useStore((state) => state.user);
  return !user ? <Navigate to="/signIn" /> : <Outlet />;
};

function App() {
  return (
    <main>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<Navigate to={'/overview'} />} />
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </main>
  );
}

export default App;
