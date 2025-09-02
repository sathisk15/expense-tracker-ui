import Title from '../shared/Title';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { RiProgress1Line } from 'react-icons/ri';
import { TiWarning } from 'react-icons/ti';
import { formatCurrency, formatDateFullStyle } from '../../../utils/utils';

const Transactions = ({ transactions }) => {
  return (
    <div className="py-20 w-full md:w-2/3">
      <Title title="Latest Transactions" />
      <div className="overflow-x-auto mt-5">
        <table className="w-full">
          <thead className="w-full border-b border-gray-300 dark:border-gray-700">
            <tr className="w-full text-black dark:text-gray-400 text-left">
              <th className="py-2">Date</th>
              <th className="py-2">Name</th>
              <th className="py-2 ">Status</th>
              <th className="py-2">Source</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => {
              const { updatedat, description, status, source, amount } =
                transaction;
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-500 hover:bg-gray-300/10"
                >
                  <td className="py-2 px-2">
                    {formatDateFullStyle(updatedat)}
                  </td>
                  <td className="py-2 px-2">
                    <div>
                      <p className="font-medium text-lg text-black dark:text-gray-400">
                        {description}
                      </p>
                      <span className="text-sm text-gray-600">
                        {/* {row.contact} */}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-2 flex items-center gap-2">
                    {status === 'Pending' && (
                      <RiProgress1Line className="text-amber-600" size={24} />
                    )}
                    {status === 'Completed' && (
                      <IoCheckmarkDoneCircle
                        className="text-emerald-600"
                        size={24}
                      />
                    )}
                    {status === 'Rejected' && (
                      <TiWarning className="text-red-600" size={24} />
                    )}
                  </td>
                  <td className="py-2 px-2">{source}</td>
                  <td className="py-2 px-2 text-black dark:text-gray-400 text-base font-medium">
                    {formatCurrency(amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
