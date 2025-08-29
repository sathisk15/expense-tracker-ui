import { MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Menu } from '@headlessui/react';
import { BiTransfer } from 'react-icons/bi';
import { MdMoreVert } from 'react-icons/md';
import { FaMoneyCheckDollar } from 'react-icons/fa6';

const AccountMenu = ({ addMoney, transferMoney }) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300">
          <MdMoreVert />
        </MenuButton>
        <MenuItems className="absolute p-2 right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white">
          <div className="p-1 space-y-2">
            <MenuItem>
              {() => (
                <button
                  onClick={transferMoney}
                  className="group flex gap-2 w-full items-center rounded-md p-2 text-sm text-gray-700 dark:textgray-300"
                >
                  <BiTransfer /> Transfer Funds
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {() => (
                <button
                  onClick={addMoney}
                  className="group flex gap-2 w-full items-center rounded-md p-2 text-sm text-gray-700 dark:textgray-300"
                >
                  <FaMoneyCheckDollar /> Add Money
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};

export default AccountMenu;
