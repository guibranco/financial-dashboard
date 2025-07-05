import React from 'react';
import { ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { Balance } from '../../hooks/useMockApi';
import { formatPercentage } from '../../utils/formatters';
import { Card, CardHeader, CardContent, Badge, Avatar } from '../../ui';

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
    <Card variant="elevated" padding="none" className="overflow-hidden dark:bg-gray-800">
      <CardHeader className="p-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Balance Overview</h2>
        <div className="mt-2 flex items-baseline">
          <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{formattedTotal}</p>
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</p>
        </div>
      </CardHeader>
      
      <CardContent className="border-t border-gray-200 dark:border-gray-700 p-0">
        {balances.map((account) => (
          <div 
            key={account.id} 
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center">
              <Avatar 
                size="md" 
                className="bg-primary-100 dark:bg-primary-900/20"
              >
                <CreditCard className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </Avatar>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{account.accountName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{account.accountNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{account.formattedBalance}</p>
              <div className="flex items-center justify-end">
                <Badge 
                  variant={account.change >= 0 ? 'success' : 'danger'}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {account.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {formatPercentage(account.changePercentage)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
          View all accounts
        </a>
      </div>
    </Card>
  );
};

export default BalanceOverview;
