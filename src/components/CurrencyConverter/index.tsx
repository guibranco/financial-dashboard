import React, { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { CurrencyRate } from '../../hooks/useMockApi';
import { formatCurrency } from '../../utils/formatters';

interface CurrencyConverterProps {
  rates: CurrencyRate[];
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ rates }) => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    if (rates.length > 0) {
      const fromRate = rates.find((r) => r.code === fromCurrency)?.rate || 1;
      const toRate = rates.find((r) => r.code === toCurrency)?.rate || 1;
      
      // Convert to USD first (as base), then to target currency
      const inUSD = amount / fromRate;
      const converted = inUSD * toRate;
      
      setConvertedAmount(converted);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Currency Converter</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700">
            From
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {rates.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleSwapCurrencies}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowDownUp className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div>
          <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700">
            To
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {rates.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {amount} {fromCurrency} =
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(convertedAmount, toCurrency)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              1 {fromCurrency} = {formatCurrency(
                rates.find((r) => r.code === toCurrency)?.rate || 0 / 
                rates.find((r) => r.code === fromCurrency)?.rate || 1,
                toCurrency
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;