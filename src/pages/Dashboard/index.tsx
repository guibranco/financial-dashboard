import React from "react";
import BalanceOverview from "../../components/BalanceOverview";
import CurrencyConverter from "../../components/CurrencyConverter";
import Investments from "../../components/Investments";
import CurrencyTrendsChart from "../../components/CurrencyTrendsChart";
import { useMockApi } from "../../hooks/useMockApi";
import { Spinner } from "../../ui";

const Dashboard: React.FC = () => {
  const { balances, investments, currencyRates, currencyTrends, isLoading } =
    useMockApi();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Spinner
            size="lg"
            className="text-primary-600 dark:text-primary-400"
          />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Financial Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
