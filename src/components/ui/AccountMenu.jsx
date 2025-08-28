import { Menu } from 'headlessui/react';

const AccountMenu = ({ addMoney, transferMoney }) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left"><MenuButton></MenuButton></Menu>
    </>
  );
};

export default AccountMenu;
