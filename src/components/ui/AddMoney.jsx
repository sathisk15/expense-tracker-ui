import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { BiLoader } from 'react-icons/bi';
import Input from './Input';
import PopUp from './PopUp';

const AddMoney = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const onSubmit = async (data) => {
    console.log(data);
  };

  const isLoading = false;

  return (
    <PopUp isOpen={isOpen} close={close} title="Add Money">
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
