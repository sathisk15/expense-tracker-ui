import React from 'react';
import { FaBtc } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';
import Title from './Title';

const data = [
  {
    name: 'Crypto',
    account: 'test@gmail.com',
    amount: '85,323.97',
    icon: (
      <div className="w-12 h-12 bg-amber-600 text-white">
        <FaBtc size={26} />
      </div>
    ),
  },
  {
    name: 'Visa Debit Card',
    account: '2342********9834',
    amount: '65,323.97',
    icon: (
      <div className="w-12 h-12 bg-blue-600 text-white">
        <RiVisaLine size={26} />
      </div>
    ),
  },
];

const Accounts = () => {
  return (
    <div className="mt-20 md:mt-0 py-5 md:py-20 md:w-1/3">
      <Title title={'Accounts'} />
      <span className="text-sm text-gray-600 dark:text-gray-500">
        View all your accounts
      </span>
      <div className="w-full">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">{item.icon}</div>
            <div>
              <p className="text-black dark:text-gray-400 text-lg">
                {item.name}
              </p>
              <span className="text-gray-600">{item.account}</span>
            </div>
            <div>
              <p className="text-xl text-black dark:text-gray-400 font-medium">
                ${item.amount}.00
              </p>
              <span className="text-xl text-gray-600 dark:text-violet-700">
                Account Balance
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
