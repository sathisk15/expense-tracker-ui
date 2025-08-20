import Input from './Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { updateUserPassword } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { BiLoader } from 'react-icons/bi';

const ChangePassword = ({ isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const submitPasswordHandler = async (data) => {
    await dispatch(updateUserPassword(data));
    reset();
  };

  return (
    <div className="py-20">
      <form onSubmit={handleSubmit(submitPasswordHandler)}>
        <div className="">
          <p className="text-xl font-bold text-black dark:text-white mb-1">
            Change Password
          </p>
          <span className="labelStyles">
            This will be used to log into your account and complete high
            severity action.
          </span>
          <div className="mt-6 space-y-6">
            <Input
              type="password"
              name="currentPassword"
              label="Current Password"
              {...register('currentPassword', {
                required: 'Current Password is required!',
              })}
              error={
                errors.currentPassword ? errors.currentPassword.message : ''
              }
              className="inputStyle"
            />
            <Input
              type="password"
              name="newPassword"
              label="New Password"
              {...register('newPassword', {
                required: 'New Password is required!',
              })}
              error={errors.newPassword ? errors.newPassword.message : ''}
              className="inputStyle"
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required!',
                validate: (val) => {
                  const { newPassword } = getValues();
                  return newPassword === val || 'Password does not match!';
                },
              })}
              error={
                errors.confirmPassword ? errors.confirmPassword.message : ''
              }
              className="inputStyle"
            />
          </div>
        </div>
        <div className="flex items-center mt-10 gap-6 justify-end pb-10 border-gray-200 dark:border-gray-800">
          <Button
            className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
            type="reset"
            variant="outline"
          >
            Reset
          </Button>
          <Button type="submit" className="px-8 bg-violet-800 text-white">
            {isLoading ? (
              <BiLoader className="text-2xl text-white animate-spin" />
            ) : (
              'Change Password'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
