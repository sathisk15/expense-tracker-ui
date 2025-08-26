import React, { useState } from 'react';
import { FaBtc, FaPaypal } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';

import { RiVisaLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Loading from '../components/ui/Loading';
import Title from '../components/ui/Title';
import { MdAdd, MdVerifiedUser } from 'react-icons/md';

const ICONS = {
  crypto: (
    <div
      className="w-12 h-12 bg-amber-600 text-white flex items-center
      justify-center rounded-full"
    >
      <FaBtc size={26} />
    </div>
  ),
  'Visa Debit Card': (
    <div
      className="w-12 h-12 bg-blue-600 text-white flex items-center
      justify-center rounded-full"
    >
      <RiVisaLine size={26} />
    </div>
  ),
  cash: (
    <div
      className="w-12 h-12 bg-rose-600 text-white flex items-center
      justify-center rounded-full"
    >
      <GiCash size={26} />
    </div>
  ),
  paypal: (
    <div
      className="w-12 h-12 bg-blue-670 text-white flex items-center
      justify-center rounded-full"
    >
      <FaPaypal size={26} />
    </div>
  ),
};

const AccountPage = () => {
  const { user } = useSelector(({ user }) => user.getUserInfo);
  if (false) return <Loading />;
  const data = [];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full py-10">
      <div className="flex items-center justify-between">
        <Title title="Accounts Information" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="py-1.5 px-2 rounded bg-black dark:bg-violet-600 text-white dark:text-white flex items-center justify-center"
          >
            <MdAdd size={22} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {data?.length === 0 ? (
        <div className="w-full flex items-center justify-center py-10 text-gray-600 dark:text-gray-700 text-lg">
          <span>No Account Found</span>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 py-10">
          {data.map((account, index) => (
            <div
              key={account.id + index}
              className="w-full h-48 gap-4 flex bg-gray-50 dark:bg-slate-800 p-3 rounded shadow"
            >
              <div>{ICONS[account.type]}</div>
              <div className="spac-y-2 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-black dark:text-white text-2xl font-bold">
                      {account.name}
                    </p>
                    <MdVerifiedUser
                      size={26}
                      className="text-emerald-600 ml-1"
                    />
                  </div>
                  {/* <AccountMenu
                    addMoney={() => handleOpenAddMoney(account)}
                    transerMoney={() => handleTransferMoney(acc)}
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
