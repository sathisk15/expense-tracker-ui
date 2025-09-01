import { FaBtc, FaPaypal } from 'react-icons/fa';
import {
  formatAccountNumber,
  formatCurrency,
  formatDateFullStyle,
  maskAccountNumber,
} from '../../../utils/utils';
import { RiVisaLine } from 'react-icons/ri';
import { GiCash } from 'react-icons/gi';
import { MdVerifiedUser } from 'react-icons/md';
import AccountMenu from './AccountMenu';
import { useState } from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { IoEyeSharp } from 'react-icons/io5';
import { TbBrandCashapp } from 'react-icons/tb';

const getIcon = (type) => {
  switch (type) {
    case 'crypto':
      return [FaBtc, 'amber'];
    case 'visa debit card':
      return [RiVisaLine, 'blue'];
    case 'cash':
      return [GiCash, 'rose'];
    case 'paypal':
      return [FaPaypal, 'blue'];
    default:
      return [TbBrandCashapp, 'emerald'];
  }
};

const AccountCard = ({ account, index, addMoney, transferMoney }) => {
  const [isAccountNumberMasked, setIsAccountNumberMasked] = useState(true);
  const { id, account_number, account_name, createdat, account_balance } =
    account;

  const [Icon, color] = getIcon(account_name?.toLowerCase());

  const formatedAccountNumber = formatAccountNumber(
    isAccountNumberMasked ? maskAccountNumber(account_number) : account_number
  );

  return (
    <div
      key={id + index}
      className="w-full h-39 flex gap-4 bg-gray-50 dark:bg-slate-800 p-3 rounded shadow"
    >
      <div>
        <div
          className={`w-12 h-12 bg-${color}-600 text-white flex items-center
      justify-center rounded-full`}
        >
          {<Icon size={26} />}
        </div>
      </div>
      <div className="spac-y-2 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-black dark:text-white text-2xl font-bold">
              {account_name}
            </p>
            <MdVerifiedUser size={26} className="text-emerald-600 ml-1" />
          </div>
          <AccountMenu
            addMoney={() => addMoney(id)}
            transferMoney={() => transferMoney(id)}
          />
        </div>
        <span className="text-gray-600 dark:text-gray-400 font-light leading-loose w-full flex justify-between">
          <p className="font-mono tracking-widest">{formatedAccountNumber}</p>
          <button
            onClick={() => setIsAccountNumberMasked(!isAccountNumberMasked)}
          >
            {isAccountNumberMasked ? <IoEyeSharp /> : <AiFillEyeInvisible />}
          </button>
        </span>
        <p className="text-xs text-gray-600 dark:text-gray-500 mb-1">
          {formatDateFullStyle(createdat)}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {formatCurrency(account_balance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
