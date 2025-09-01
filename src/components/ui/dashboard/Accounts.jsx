import React from 'react';
import { FaBtc } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';
import Title from '../shared/Title';
import {
  formatCurrency,
  getIcon,
  maskAccountNumber,
} from '../../../utils/utils';

const Accounts = ({ accounts }) => {
  console.log(accounts);
  return (
    <div className="mt-20 md:mt-0 py-5 md:py-20 md:w-1/3">
      <Title title={'Accounts'} />
      <span className="text-sm text-gray-600 dark:text-gray-500">
        View all your accounts
      </span>
      <div className="w-full">
        {accounts?.map((account, idx) => {
          const { account_name, account_number, account_balance } = account;
          const [Icon, color] = getIcon(account_name?.toLowerCase());
          return (
            <div key={idx} className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-${color}-600 text-white`}>
                  <Icon size={26} />
                </div>
              </div>
              <div>
                <p className="text-black dark:text-gray-400 text-lg">
                  {account_name}
                </p>
                <span className="text-gray-600">
                  {maskAccountNumber(account_number)}
                </span>
              </div>
              <div>
                <p className="text-xl text-black dark:text-gray-400 font-medium">
                  {formatCurrency(account_balance)}
                </p>
                <span className="text-xl text-gray-600 dark:text-violet-700">
                  Account Balance
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accounts;
