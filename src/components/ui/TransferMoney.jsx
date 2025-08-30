import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import PopUp from './PopUp';
import Input from './Input';
import Button from './Button';

const TransferMoney = ({ isOpen, setIsOpen, accounts }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const { isLoading, isSuccess } = useSelector(
  //     ({ account }) => account.createAccount
  //   );
  const [selectedAccount, setSelectedAccount] = useState(null);

  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setIsOpen(false);
  //       dispatch(resetAccounts());
  //       dispatch(getAccountInfo());
  //     }
  //   }, [dispatch, isSuccess, setIsOpen]);

  const onSubmit = async (data) => console.log(data);
  console.log(accounts);
  return (
    <PopUp
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      title="Transfer Funds"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            From Account
          </p>
          <select
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none ring-blue-500 dark:placeholder:text-gray-700"
            // disabled={isLoading}
          >
            <option
              key={'account + index'}
              value={''}
              className="w-full flex items-center justify-center dark:bg-slate-900"
            >
              {'Select Account'}
            </option>
            {accounts.map((account, index) => (
              <option
                key={account + index}
                value={account.account_name}
                className="w-full flex items-center justify-center dark:bg-slate-900"
              >
                {account.account_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            To Account
          </p>
          <select
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none ring-blue-500 dark:placeholder:text-gray-700"
            // disabled={isLoading}
          >
            <option
              key={'account + index'}
              value={''}
              className="w-full flex items-center justify-center dark:bg-slate-900"
            >
              {'Select Account'}
            </option>
            {accounts.map((account, index) => (
              <option
                key={account + index}
                value={account.account_name}
                className="w-full flex items-center justify-center dark:bg-slate-900"
              >
                {account.account_name}
              </option>
            ))}
          </select>
        </div>

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
          //   disabled={isLoading}
        />
        <Button
          type="submit"
          className="bg-violet-700 text-white w-full mt-4"
          //   disabled={isLoading}
        >
          {false ? (
            <BiLoader className="text-xl animate-spin text-white" />
          ) : (
            'Transfer Money'
          )}
        </Button>
      </form>
    </PopUp>
  );
};

export default TransferMoney;
