import Info from '../components/ui/dashboard/Info';
import Stats from '../components/ui/dashboard/Stats';
import Chart from '../components/ui/dashboard/Chart';
import Transactions from '../components/ui/dashboard/Transactions';
import DoughnutChart from '../components/ui/dashboard/DouhgnutChart';
import Accounts from '../components/ui/dashboard/Accounts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardInfo } from '../store/features/transactionSlice';
import Loading from '../components/ui/shared/Loading';
import { formatCurrency } from '../utils/utils';

const Dashboard = () => {
  const { isLoading, data } = useSelector(
    ({ transaction }) => transaction.dashboardInfo
  );

  const {
    availableBalance,
    totalIncome,
    totalExpense,
    chartData,
    lastTransaction,
    lastAccount,
  } = data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardInfo());
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div className="">
      <div className="px-0 md:px-5 2xl:px-20">
        <Info
          title={'Dashboard'}
          subTitle={'Monitor your financial activities'}
        />
        <Stats
          balance={formatCurrency(availableBalance)}
          income={formatCurrency(totalIncome)}
          expense={formatCurrency(totalExpense)}
        />
        <div className="w-full flex flex-col-reverse md:flex-row items-center gap-10">
          <Chart data={chartData} />
          <DoughnutChart income={totalIncome} expense={totalExpense} />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-0 md:gap-10 2xl:gap-20">
          <Transactions transaction={lastTransaction} />
          <Accounts accounts={lastAccount} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
