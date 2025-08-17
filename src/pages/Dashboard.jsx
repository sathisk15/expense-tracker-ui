import Info from '../components/ui/Info';
import Stats from '../components/ui/Stats';
import Chart from '../components/ui/Chart';
import Transactions from '../components/ui/Transactions';
import DoughnutChart from '../components/ui/DouhgnutChart';
import Accounts from '../components/ui/Accounts';

const Dashboard = () => {
  return (
    <div className="">
      <div className="px-0 md:px-5 2xl:px-20">
        <Info
          title={'Dashboard'}
          subTitle={'Monitor your financial activities'}
        />
        <Stats />
        <div className="w-full flex flex-col-reverse md:flex-row items-center gap-10">
          <Chart />
          <DoughnutChart />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-0 md:gap-10 2xl:gap-20">
          <Transactions />
          <Accounts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
