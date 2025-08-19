import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import Button from './Button';
import { getCountries } from '../../features/countrySlice';
import { BiLoader } from 'react-icons/bi';

import SelectInput from './SelectInput';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const SettingForm = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const { data: countriesData } = useSelector((state) => state.countries);

  const ProfileSchema = z.object({
    firstname: z
      .string({ required_error: 'First Name is required!' })
      .min(3, 'First Name must contain at least 3 character(s)'),
    lastname: z
      .string({ required_error: 'Last Name is required!' })
      .min(3, 'Last Name must contain at least 3 character(s)'),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    contact: z
      .string({ required_error: 'Contact is required' })
      .min(6, 'Contact must be at least 6 digits long'),
  });

  const normalizeUserValues = (user) => ({
    firstname: user?.firstname ?? '',
    lastname: user?.lastname ?? '',
    email: user?.email ?? '',
    contact: user?.contact ?? '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: normalizeUserValues(user),
    values: normalizeUserValues(user),
    resolver: zodResolver(ProfileSchema),
  });
  const [selectedCountry, setSelectedCountry] = useState({
    country: user?.country,
    currency: user?.currency,
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch user update action
    const formData = {
      ...data,
      country: selectedCountry.name || user?.country,
      currency: selectedCountry.currency || user?.currency,
    };

    console.log(formData);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <Input
            className="inputStyle"
            name="firstname"
            id="firstname"
            label="First Name"
            type="text"
            disabled={isLoading}
            {...register('firstname')}
            error={errors.firstname ? errors.firstname.message : ''}
          />
        </div>
        <div className="w-full">
          <Input
            className="inputStyle"
            name="lastname"
            id="lastname"
            type="text"
            disabled={isLoading}
            label="Last Name"
            {...register('lastname')}
            error={errors.lastname ? errors.lastname.message : ''}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <Input
            className="inputStyle"
            name="email"
            id="email"
            disabled={isLoading}
            type="text"
            label="Email"
            {...register('email')}
            error={errors.email ? errors.email.message : ''}
          />
        </div>
        <div className="w-full">
          <Input
            className="inputStyle"
            name="contact"
            id="contact"
            label="Contact"
            disabled={isLoading}
            {...register('contact')}
            error={errors.contact ? errors.contact.message : ''}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <span className="labelStyle">Country</span>
          <SelectInput
            data={countriesData}
            selected={selectedCountry}
            setSelected={setSelectedCountry}
            register={register}
          />
        </div>
        <div className="w-full">
          <span className="labelStyle">Currency</span>
          <select className="inputStyles">
            <option>{selectedCountry?.currency || user?.currency}</option>
          </select>
        </div>
      </div>
      <div className="w-full flex items-center justify-between pt-10">
        <div>
          <p className="text-lg text-black dark:text-gray-400 font-semibold">
            Appearance
          </p>
          <span className="labelStyles">
            Customize how your theme looks on your device.
          </span>
        </div>
        <div className="w-28 md:w-40">
          <select
            className="inputStyles" //defaultValue={theme}
            disabled={isLoading}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className="w-full flex items-center justify-between pt-10">
        <div>
          <p className="text-lg text-black dark:text-gray-400 font-semibold">
            Language
          </p>
          <span className="labelStyles">
            Customize what language you want to use.
          </span>
        </div>
        <div className="w-28 md:w-40">
          <select
            className="inputStyles" //defaultValue={theme}
            disabled={isLoading}
          >
            <option value="english">English</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-6 justify-end pb-10 border-gray-200 dark:border-gray-800">
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
            'Save'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SettingForm;
