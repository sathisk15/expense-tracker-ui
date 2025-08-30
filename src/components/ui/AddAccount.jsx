import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateAccountNumber } from '../../utils/utils';
import Button from './Button';
import { MdOutlineWarning } from 'react-icons/md';
import Input from './Input';
import { BiLoader } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAccount,
  getAccountInfo,
  resetAccounts,
} from '../../store/features/accountSlice';
import PopUp from './PopUp';

const accounts = ['Cash', 'Crypto', 'PayPal', 'Visa Debit Card'];
const AddAccount = ({ isOpen, setIsOpen, userAccounts }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { account_number: generateAccountNumber() } });
  const { isLoading, isSuccess } = useSelector(
    ({ account }) => account.createAccount
  );
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const existingUserAccounts = userAccounts.map((account) =>
    account.account_name?.toLowerCase()
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      dispatch(resetAccounts());
      dispatch(getAccountInfo());
    }
  }, [dispatch, isSuccess, setIsOpen]);

  const onSubmit = async (data) =>
    dispatch(createAccount({ ...data, name: selectedAccount }));

  return (
    <PopUp isOpen={isOpen} close={() => setIsOpen(false)} title="Add Account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            Select Account
          </p>
          <select
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none ring-blue-500 dark:placeholder:text-gray-700"
            disabled={isLoading}
          >
            {accounts.map((account, index) => (
              <option
                key={account + index}
                value={account}
                className="w-full flex items-center justify-center dark:bg-slate-900"
              >
                {account}
              </option>
            ))}
          </select>
        </div>

        {existingUserAccounts?.includes(selectedAccount.toLowerCase()) ? (
          <div className="flex items-center bg-yellow-400 text-black p-2 mt-6 rounded">
            <MdOutlineWarning size={30} />
            <span className="text-sm ml-2">
              This account is already been activated. Try another one. Thank
              you!
            </span>
          </div>
        ) : (
          <>
            <Input
              name="account_number"
              label="Account Number"
              placeholder="Enter account number"
              {...register('account_number', {
                required: 'Account Number is required',
              })}
              error={errors.account_number?.message ?? ''}
              className="inputStyle"
              disabled={isLoading}
            />
            <Input
              type="number"
              name="amount"
              label="Initial Amount"
              placeholder="Enter Amount "
              {...register('amount', {
                required: 'Initial Amount is required',
              })}
              error={errors.amount?.message ?? ''}
              className="inputStyle"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="bg-violet-700 text-white w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <BiLoader className="text-xl animate-spin text-white" />
              ) : (
                'Create Account'
              )}
            </Button>
          </>
        )}
      </form>
    </PopUp>
  );
};

export default AddAccount;
