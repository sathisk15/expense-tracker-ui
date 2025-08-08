import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { BsChevronExpand } from 'react-icons/bs';
const SettingForm = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValue: { ...user } });
  const [selectedCountry, setSelectedCountry] = useState({
    country: user?.country,
    currency: user?.currency,
  });
  const [query, setQuery] = useState('');
  const [countriesData, setCountriesData] = useState([]);

  const onSubmit = () => {};

  const filteredCountries =
    query === ''
      ? countriesData
      : countriesData.filter((country) =>
          country.country.toLowerCase().replace(/\s+/g, '')
        );

  const Country = () => (
    <div className="w-full">
      <Combobox value={selectedCountry} onChange={setSelectedCountry}>
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
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveForm="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
        </Transition>
      </Combobox>
    </div>
  );
  return <div>SettingForm</div>;
};

export default SettingForm;
