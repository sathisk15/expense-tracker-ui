import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsChevronExpand } from 'react-icons/bs';

export default function SelectInput({ data, selected, setSelected }) {
  const [query, setQuery] = useState('');
  const filteredData =
    query === ''
      ? data
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-full">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery('')}
      >
        <div className="relative mt-1">
          <div>
            <ComboboxInput
              className="inputStyles"
              displayValue={(data) => data?.name}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand />
            </ComboboxButton>
          </div>
        </div>
        <ComboboxOptions
          anchor="bottom"
          transition
          className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          {filteredData.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-500">
              Nothing Found.
            </div>
          ) : (
            filteredData.map((country, index) => (
              <ComboboxOption
                key={country.name + index}
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
                        alt={country.name}
                        className="w-8 h-5 rounded-sm object-cover"
                      />
                      <span
                        className={`block truncate text-gray-700 dark:text-gray-500 ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country?.name}
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
      </Combobox>
    </div>
  );
}
