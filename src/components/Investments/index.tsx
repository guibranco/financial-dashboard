import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { Investment } from '../../hooks/useMockApi';
import { formatPercentage } from '../../utils/formatters';

interface InvestmentsProps {
  investments: Investment[];
}

const Investments: React.FC<InvestmentsProps> = ({ investments }) => {
  const totalValue = investments.reduce((sum, investment) => sum + investment.value, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(totalValue);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Investments</h2>
        <div className="mt-2 flex items-baseline">
          <p className="text-3xl font-semibold text-gray-900">{formattedTotal}</p>
          <p className="ml-2 text-sm font-medium text-gray-500">Total Value</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        {investments.map((investment) => (
          <div key={investment.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{investment.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{investment.formattedValue}</p>
              <div className="flex items-center justify-end">
                {investment.change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <p
                  className={`text-xs font-medium ${
                    investment.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {formatPercentage(investment.changePercentage)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 px-6 py-3">
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all investments
        </a>
      </div>
    </div>
  );
};

export default Investments;