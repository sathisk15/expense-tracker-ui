import React from 'react';
// import { getSevenDaysAgo } from '../../../utils';
import { useSearchParams } from 'react-router-dom';

const DateRange = () => {
  // const sevenDaysAgo = getSevenDaysAgo();
  const [searchParams, setSearchParams] = useSearchParams();
  return <div>DateRange</div>;
};

export default DateRange;
