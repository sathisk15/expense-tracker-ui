import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from './shared/Button';
import { BiLoader } from 'react-icons/bi';
import Input from './shared/Input';
import PopUp from './shared/PopUp';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAmount,
  getAccountInfo,
  resetAccounts,
} from '../../store/features/accountSlice';

const AddMoney = ({ isOpen, setIsOpen, accountId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isSuccess } = useSelector(
    ({ account }) => account.addAmount
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      dispatch(resetAccounts());
      dispatch(getAccountInfo());
    }
  }, [dispatch, isSuccess, setIsOpen]);

  const onSubmit = async ({ amount }) => {
    dispatch(addAmount({ accountId, amount }));
  };

  return (
    <PopUp isOpen={isOpen} close={() => setIsOpen(false)} title="Add Money">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            'Add Money'
          )}
        </Button>
      </form>
    </PopUp>
  );
};

export default AddMoney;
