import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Title from '../components/ui/shared/Title';
import { IoCheckmarkDoneCircle, IoSearchOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { CiExport } from 'react-icons/ci';
import DateRange from '../components/ui/shared/DateRange';
import { RiProgress3Line } from 'react-icons/ri';
import { TiWarning } from 'react-icons/ti';
import { formatCurrency } from '../utils/utils';
import { getTransactions } from '../store/features/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/ui/shared/Loading';

const Transactions = () => {
  const [searchParams] = useSearchParams();

  const {
    isLoading,
    isSuccess,
    data: transactionData,
  } = useSelector(({ transaction }) => transaction.transactions);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleViewTransaction = (transaction) => {
    setSelected(transaction);
    setIsOpenView(true);
  };

  const df = searchParams.get('df') || '';
  const dt = searchParams.get('dt') || '';

  const filterTransactionByDate = (df, dt, transactionDate) => {
    return (
      new Date(transactionDate).getTime() >= new Date(df).getTime() &&
      new Date(transactionDate).getTime() <= new Date(dt).getTime()
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setData(
      transactionData.filter(
        (transaction) =>
          transaction.description
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          filterTransactionByDate(df, dt, transaction.updatedat)
      )
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && transactionData)
      setData(
        transactionData.filter((transaction) =>
          filterTransactionByDate(df, dt, transaction.updatedat)
        )
      );
  }, [transactionData, isSuccess, df, dt]);

  if (isLoading) return <Loading />;

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
                  onChange={(e) => setSearch(e.target.value)}
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
        <div className="overflow-x-auto mt-5">
          {data.length === 0 ? (
            <div className="w-full flex items-center justify-center py-10 text-gray-600 dark:text-gray-700 text-lg">
              <span>No Transaction History</span>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="w-full border-b border-gray-300 dark:border-gray-700">
                  <tr className="w-full text-black dark:text-gray-400 text-left">
                    <th className="py-2">Date</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Source</th>
                    <th className="p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((transaction, idx) => (
                    <tr
                      key={idx}
                      className="w-full border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-500 hover:bf-gray-300/10 text-sm md:text-base cursor-pointer"
                    >
                      <td className="py-4">
                        <p className="w-24 md:w-auto">
                          {new Date(transaction.createdat).toDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex flex-col w-56 md:w-auto">
                          <p className="text-base 2xl:text-lg text-black dark:text-gray-400 line-clamp-2">
                            {transaction.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          {transaction.status === 'pending' && (
                            <RiProgress3Line
                              className="text-amber-600"
                              size={24}
                            />
                          )}
                          {transaction.status === 'completed' && (
                            <IoCheckmarkDoneCircle
                              className="text-emerald-600"
                              size={24}
                            />
                          )}
                          {transaction.status === 'rejected' && (
                            <TiWarning className="text-red-600" size={24} />
                          )}
                          <span>{transaction.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">{transaction?.source}</td>
                      <td className="py-4 text-black dark:text-gray-400 text-base font-medium">
                        <span
                          className={`${
                            transaction?.type === 'income'
                              ? 'text-emerald-600'
                              : 'text-red-600'
                          } text-lg font-bold mgl-1`}
                        >
                          {transaction?.type === 'income' ? '+' : '-'}
                        </span>
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-2 px-2">
                        <button className="outline-none text-violet-600 hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
