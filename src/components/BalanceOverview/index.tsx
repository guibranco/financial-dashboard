import React from 'react';
import { ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { Balance } from '../../hooks/useMockApi';
import { formatPercentage } from '../../utils/formatters';

interface BalanceOverviewProps {
  balances: Balance[];
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ balances }) => {
  const totalBalance = balances.reduce((sum, account) => sum + account.balance, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(totalBalance);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Balance Overview</h2>
        <div className="mt-2 flex items-baseline">
          <p className="text-3xl font-semibold text-gray-900">{formattedTotal}</p>
          <p className="ml-2 text-sm font-medium text-gray-500">Total Balance</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        {balances.map((account) => (
          <div key={account.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{account.accountName}</p>
                <p className="text-xs text-gray-500">{account.accountNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{account.formattedBalance}</p>
              <div className="flex items-center justify-end">
                {account.change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <p
                  className={`text-xs font-medium ${
                    account.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {formatPercentage(account.changePercentage)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 px-6 py-3">
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all accounts
        </a>
      </div>
    </div>
  );
};

export default BalanceOverview;