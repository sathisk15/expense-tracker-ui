import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import { BsChevronExpand } from 'react-icons/bs';
import Input from './Input';
import Button from './Button';
import { getCountries } from '../../features/countrySlice';
import { BiCheck } from 'react-icons/bi';
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

  const [query, setQuery] = useState('');

  const onSubmit = () => {
    // dispatch user update action
  };

  const filteredCountries = useMemo(() => {
    return query === ''
      ? countriesData
      : countriesData.filter((country) =>
          country.country.toLowerCase().includes(query.toLowerCase())
        );
  }, [countriesData, query]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const Country = () => (
    <div className="w-full">
      <Combobox
        value={selectedCountry}
        onChange={(country) => setSelectedCountry(country)}
        onClose={() => setQuery('')}
      >
        <div className="relative mt-1">
          <div>
            <ComboboxInput
              className="inputStyles"
              displayValue={(country) => country?.country}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand />
            </ComboboxButton>
          </div>
        </div>
        {/* <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        > */}
        <ComboboxOptions className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {filteredCountries.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-500">
              Nothing Found.
            </div>
          ) : (
            filteredCountries.map((country, index) => (
              <ComboboxOption
                key={country.country + index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-violet-600/20  text-white' : 'text-gray-900'
                  }`
                }
                value={country}
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center gap-2">
                      <img
                        src={country.flag}
                        alt={country.country}
                        className="w-8 h-5 rounded-sm object-cover"
                      />
                      <span
                        className={`block truncate text-gray-700 dark:text-gray-500 ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country?.country}
                      </span>
                    </div>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-cover pl-3 ${
                          active ? 'text-white' : 'text-teal-600'
                        }`}
                      >
                        <BiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
        {/* </Transition> */}
      </Combobox>
    </div>
  );

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
          <Country />
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
