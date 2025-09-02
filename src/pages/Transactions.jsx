import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Title from '../components/ui/shared/Title';
import { IoSearchOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { CiExport } from 'react-icons/ci';
import DateRange from '../components/ui/shared/DateRange';

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState('');
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const handleViewTransaction = (transaction) => {
    setSelected(transaction);
    setIsOpenView(true);
  };

  const fetchTransactions = () => {};

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ startDate, endDate, search });
  };

  return (
    <>
      <div className="w-full py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <Title title="Transactions Activity" />
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <DateRange />
            <form onSubmit={(e) => handleSearch(e)}>
              <div className="w-full flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-2">
                <IoSearchOutline className="text-xl text-gray-700 placeholder:text-gray-600" />
                <input
                  type="text"
                  value={search}
                  placeholder="Search now.."
                  className="outline-none group bg-transparent text-gray-700 dark:text-gray-600 placeholder:text-gray-600"
                />
              </div>
            </form>
            <button
              onClick={() => setIsOpen(true)}
              className="py-1.5 px-2 rounded text-white bg-black dark:bg-violet-800 flex items-center justify-center gapt-2"
            >
              <MdAdd size={22} />
              <span>Pay</span>
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="py-1.5 px-2 rounded text-white bg-black dark:bg-violet-800 flex items-center justify-center gapt-2"
            >
              <MdAdd size={22} />
              <span
                onClick={() =>
                  // exportToExcel(data, `Transactions ${startDate} to ${endDate}`)
                  console.log('Export')
                }
                className="flex items-center gap-2 text-white dark:text-gray-300"
              >
                Export <CiExport size={24} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
