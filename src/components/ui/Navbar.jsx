import React, { useState } from 'react';
import { RiCurrencyLine } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import avatar from '../../../public/avatar.png';
const links = ['Dashboard', 'Transactions', 'Accounts', 'Settings'];

const Navbar = () => {
  const [selected, setSelected] = useState(0);
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
        {links.map((link, idx) => (
          <div
            key={idx}
            className={`${
              idx === selected
                ? 'bg-black dark:bg-slate-800 text-white'
                : 'text-gray-700 dark:text-gray-500'
            } px-6 py-2 rounded-full`}
            onClick={() => setSelected(idx)}
          >
            <a href="#">{link}</a>
          </div>
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
            John Doe
          </p>
          <span className="text-sm tex-gray-700 dark:text-gray-500">
            jon@gmail.com
          </span>
        </div>
        <MdOutlineKeyboardArrowDown className="hidden md:block text-2xl text-gray-600 dark:text-gray-300 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
