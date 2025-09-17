import { RiCurrencyLine } from 'react-icons/ri';
import avatar from '../../../assets/images/avatar.png';
import ThemeSwitch from './ThemeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo } from '../../../store/features/userSlice';
import { IoLogOutOutline } from 'react-icons/io5';

const menu = ['Dashboard', 'Transactions', 'Accounts', 'Settings'];

const Navbar = () => {
  const { user } = useSelector(({ user }) => user.getUserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    !user && dispatch(getUserInfo());
  }, [user, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-violet-700 rounded-xl">
          <RiCurrencyLine className="text-white text-3xl hover:animate-spin" />
        </div>
        <span className="text-xl font-bold text-black dark:text-white">
          My-Finance
        </span>
      </div>
      <div className="hidden md:flex items-center gap-4">
        {menu.map((link, idx) => (
          <NavLink
            to={`/${link.toLowerCase()}`}
            key={idx}
            className={({ isActive }) =>
              `${
                isActive
                  ? 'bg-black dark:bg-slate-800 text-white'
                  : 'text-gray-700 dark:text-gray-500'
              } px-6 py-2 rounded-full`
            }
          >
            {link}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-10 2xl:gap-20">
        {/* <ThemeSwitch /> */}
      </div>
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt="avatar"
          className="2-10 md:2-12 h-10 md:h-12 rounded-full object-cover cursor-pointer"
        />
        <div className="hidden md:block">
          <p className="text-lg font-medium text-black dark:text-gray-400">
            {user?.firstname}
          </p>
          <span className="text-sm tex-gray-700 dark:text-gray-500">
            {user?.email}
          </span>
        </div>
        <IoLogOutOutline
          className="hidden md:block text-2xl text-black dark:text-gray-300 cursor-pointer ml-5"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
