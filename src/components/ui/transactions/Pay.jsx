import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PopUp from '../shared/PopUp';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { BiLoader } from 'react-icons/bi';
import { getAccountInfo } from '../../../store/features/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

const Pay = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { accounts: accountList } = useSelector(
    ({ account }) => account.getAccountInfo
  );

  const [selectedAccount, setSelectedAccount] = useState('');

  const [accounts, setAccounts] = useState([]);
  const [source, setSource] = useState('');

  const dispatch = useDispatch();

  const isLoading = false;

  const onSubmit = async (data) => {
    // dispatch(addAmount({ accountId, amount }));
    console.log({ ...data, accountId: selectedAccount, source });
  };

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  useEffect(() => {
    setAccounts(accountList);
  }, [accountList]);

  useEffect(() => {
    setSource(
      accounts.find((acc) => acc.id == selectedAccount)?.account_name || ''
    );
  }, [selectedAccount, accounts]);

  return (
    <PopUp
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      title="Add Transaction"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            Account
          </p>
          <select
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none ring-blue-500 dark:placeholder:text-gray-700"
            // disabled={isLoading}
            value={selectedAccount}
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
          name="source"
          label="Source"
          {...register('source')}
          error={errors.source?.message ?? ''}
          className="inputStyle"
          value={source}
          disabled
        />

        <Input
          name="description"
          label="Description"
          placeholder="Enter Description"
          {...register('description', {
            required: 'Description is required',
          })}
          error={errors.description?.message ?? ''}
          className="inputStyle"
          disabled={isLoading}
        />

        <Input
          name="amount"
          label="Amount"
          placeholder="Enter Amount"
          {...register('amount', {
            required: 'Amount is required',
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
            'Add Transaction'
          )}
        </Button>
      </form>
    </PopUp>
  );
};

export default Pay;
