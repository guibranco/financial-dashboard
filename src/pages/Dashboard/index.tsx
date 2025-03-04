import React from 'react';
import BalanceOverview from '../../components/BalanceOverview';
import CurrencyConverter from '../../components/CurrencyConverter';
import Investments from '../../components/Investments';
import CurrencyTrendsChart from '../../components/CurrencyTrendsChart';
import { useMockApi } from '../../hooks/useMockApi';

const Dashboard: React.FC = () => {
  const { balances, investments, currencyRates, currencyTrends, isLoading } = useMockApi();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BalanceOverview balances={balances} />
        </div>
        <div>
          <CurrencyConverter rates={currencyRates} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CurrencyTrendsChart trends={currencyTrends} />
        </div>
        <div>
          <Investments investments={investments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;