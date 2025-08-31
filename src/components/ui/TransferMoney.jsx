import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from './shared/PopUp';
import Input from './shared/Input';
import Button from './shared/Button';
import { MdOutlineWarning } from 'react-icons/md';
import {
  resetTransaction,
  transferFunds,
} from '../../store/features/transactionSlice';
import { getAccountInfo } from '../../store/features/accountSlice';
import { BiLoader } from 'react-icons/bi';

const TransferMoney = ({ isOpen, setIsOpen, accounts, selectedAccountId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isSuccess } = useSelector(
    ({ transaction }) => transaction.transferFunds
  );

  const [selectedFromAccount, setSelectedFromAccount] =
    useState(selectedAccountId);
  const [selectedToAccount, setSelectedToAccount] = useState(null);

  useEffect(() => {
    setSelectedFromAccount(selectedAccountId);
  }, [selectedAccountId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      dispatch(resetTransaction());
      dispatch(getAccountInfo());
    }
  }, [dispatch, isSuccess, setIsOpen]);

  const onSubmit = ({ amount }) => {
    const data = {
      fromAccountId: selectedFromAccount,
      toAccountId: selectedToAccount,
      amount,
    };
    dispatch(transferFunds(data));
  };

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
            onChange={(e) => setSelectedFromAccount(e.target.value)}
            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none ring-blue-500 dark:placeholder:text-gray-700"
            // disabled={isLoading}
            value={selectedFromAccount}
          >
            <option
              key={'account + index'}
              value={''}
              className="w-full flex items-center justify-center dark:bg-slate-900"
            >
              {'Select Account'}
            </option>
            {accounts.map(({ account_name, account_number, id }, idx) => (
              <option
                key={account_number + '' + idx}
                value={id}
                className="w-full flex items-center justify-center dark:bg-slate-900"
              >
                {`${account_name} (${account_number})`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            To Account
          </p>
          <select
            onChange={(e) => setSelectedToAccount(e.target.value)}
            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none ring-blue-500 dark:placeholder:text-gray-700"
            disabled={isLoading}
          >
            <option
              key={'account + index'}
              value={''}
              className="w-full flex items-center justify-center dark:bg-slate-900"
            >
              {'Select Account'}
            </option>
            {accounts.map(({ account_name, account_number, id }, idx) => (
              <option
                key={account_number + '' + idx}
                value={id}
                className="w-full flex items-center justify-center dark:bg-slate-900"
              >
                {`${account_name} (${account_number})`}
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
          disabled={isLoading}
        />
        {selectedFromAccount === selectedToAccount ? (
          <div className="flex items-center bg-yellow-400 text-black p-2 mt-6 rounded">
            <MdOutlineWarning size={30} />
            <span className="text-sm ml-2">
              From Account and To Account must be different. Thank you!
            </span>
          </div>
        ) : (
          <Button
            type="submit"
            className="bg-violet-700 text-white w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <BiLoader className="text-xl animate-spin text-white" />
            ) : (
              'Transfer Money'
            )}
          </Button>
        )}
      </form>
    </PopUp>
  );
};

export default TransferMoney;
