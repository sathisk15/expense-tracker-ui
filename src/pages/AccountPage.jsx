import { useEffect, useState } from 'react';
import { FaBtc, FaPaypal } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';

import { RiVisaLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/ui/Loading';
import Title from '../components/ui/Title';
import { MdAdd, MdVerifiedUser } from 'react-icons/md';
import { getAccountInfo } from '../store/features/accountSlice';
import AddAccount from '../components/ui/AddAccount';
import AccountMenu from '../components/ui/AccountMenu';
import AddMoney from '../components/ui/AddMoney';
import TransferMoney from '../components/ui/TransferMoney';

const ICONS = {
  crypto: (
    <div
      className="w-12 h-12 bg-amber-600 text-white flex items-center
      justify-center rounded-full"
    >
      <FaBtc size={26} />
    </div>
  ),
  'visa debit card': (
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
      className="w-12 h-12 bg-blue-600 text-white flex items-center
      justify-center rounded-full"
    >
      <FaPaypal size={26} />
    </div>
  ),
};

const AccountPage = () => {
  const { accounts, isLoading } = useSelector(
    ({ account }) => account.getAccountInfo
  );

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isTransferMoneyOpen, setIsTransferMoneyOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  const handleOpenAddMoney = (id) => {
    setIsAddMoneyOpen(true);
    setSelectedAccountId(id);
  };

  const handleOpenTransferMoney = (id) => {
    setIsTransferMoneyOpen(true);
    setSelectedAccountId(id);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full py-10">
      <div className="flex items-center justify-between">
        <Title title="Accounts Information" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddAccountOpen(true)}
            className="py-1.5 px-2 rounded bg-black dark:bg-violet-600 text-white dark:text-white flex items-center justify-center"
          >
            <MdAdd size={22} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {accounts?.length === 0 ? (
        <div className="w-full flex items-center justify-center py-10 text-gray-600 dark:text-gray-700 text-lg">
          <span>No Account Found</span>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 py-10">
          {accounts.map((account, index) => (
            <div
              key={account.id + index}
              className="w-full h-48 gap-4 flex bg-gray-50 dark:bg-slate-800 p-3 rounded shadow"
            >
              <div>{ICONS[account?.account_name?.toLowerCase()]}</div>
              <div className="spac-y-2 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-black dark:text-white text-2xl font-bold">
                      {account.account_name}
                    </p>
                    <MdVerifiedUser
                      size={26}
                      className="text-emerald-600 ml-1"
                    />
                  </div>
                  <AccountMenu
                    addMoney={() => handleOpenAddMoney(account.id)}
                    transferMoney={() => handleOpenTransferMoney(account.id)}
                  />
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-light leading-loose">
                  {account.account_number}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-500">
                  {new Date(account.createdat).toLocaleDateString('en-US', {
                    dateStyle: 'full',
                  })}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                    {account.account_balance}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddAccount
        isOpen={isAddAccountOpen}
        setIsOpen={setIsAddAccountOpen}
        userAccounts={accounts}
      />
      <AddMoney
        isOpen={isAddMoneyOpen}
        setIsOpen={setIsAddMoneyOpen}
        accountId={selectedAccountId}
      />
      <TransferMoney
        isOpen={isTransferMoneyOpen}
        setIsOpen={setIsTransferMoneyOpen}
        accounts={accounts}
        selectedAccountId={selectedAccountId}
      />
    </div>
  );
};

export default AccountPage;
