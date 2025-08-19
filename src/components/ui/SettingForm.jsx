import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import Button from './Button';
import { getCountries } from '../../features/countrySlice';
import { BiLoader } from 'react-icons/bi';

import SelectInput from './SelectInput';
const SettingForm = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const { data: countriesData } = useSelector((state) => state.countries);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValue: { ...user } });
  const [selectedCountry, setSelectedCountry] = useState({
    country: user?.country,
    currency: user?.currency,
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    // dispatch user update action
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
            register={register('firstname', {
              required: 'First Name is required!',
            })}
            defaultValue={user?.firstname}
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
            register={register('lastname', {
              required: 'Last Name is required!',
            })}
            defaultValue={user?.lastname}
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
            register={register('email', {
              required: 'Email is required!',
            })}
            defaultValue={user?.email}
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
            register={register('contact', {
              required: 'Contact is required!',
            })}
            defaultValue={user?.contact}
            error={errors.contact ? errors.contact.message : ''}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <span className="labelStyle">Country</span>
          {/* <Country /> */}
          {/* <Example /> */}
          <SelectInput
            data={countriesData}
            selected={selectedCountry}
            setSelected={setSelectedCountry}
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
