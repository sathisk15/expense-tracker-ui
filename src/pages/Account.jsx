import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/ui/shared/Loading';
import Title from '../components/ui/shared/Title';
import { MdAdd } from 'react-icons/md';
import { getAccountInfo } from '../store/features/accountSlice';
import AddAccount from '../components/ui/account/AddAccount';
import AddMoney from '../components/ui/account/AddMoney';
import TransferMoney from '../components/ui/account/TransferMoney';

import AccountCard from '../components/ui/account/AccountCard';

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
            <AccountCard
              key={account.id + index}
              account={account}
              addMoney={handleOpenAddMoney}
              transferMoney={handleOpenTransferMoney}
            />
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
