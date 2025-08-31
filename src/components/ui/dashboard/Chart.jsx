import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Title from './Title';

const data = [
  { label: 'January', income: 5000, expense: 3000 },
  { label: 'Febrary', income: 5000, expense: 3000 },
  { label: 'March', income: 5000, expense: 3000 },
  { label: 'April', income: 5000, expense: 3000 },
  { label: 'May', income: 5000, expense: 3000 },
  { label: 'June', income: 5000, expense: 3000 },
  { label: 'July', income: 5000, expense: 3000 },
  { label: 'August', income: 5000, expense: 3000 },
  { label: 'September', income: 5000, expense: 3000 },
  { label: 'October', income: 5000, expense: 3000 },
  { label: 'November', income: 5000, expense: 3000 },
  { label: 'December', income: 5000, expense: 3000 },
];

const Chart = () => {
  return (
    <div className="w-full md:w-2/3">
      <Title title={'Transaction Activity'} />
      <ResponsiveContainer width={'100%'} height={500} className={'mt-5'}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#8884d8" />
          <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
