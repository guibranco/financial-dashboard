import { useState, useEffect } from "react";
import { formatCurrency } from "../utils/formatters";

// Types
export interface Balance {
  id: string;
  accountName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  formattedBalance: string;
  change: number;
  changePercentage: number;
}

export interface Investment {
  id: string;
  name: string;
  value: number;
  currency: string;
  formattedValue: string;
  change: number;
  changePercentage: number;
}

export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
}

export interface CurrencyTrend {
  currency: string;
  data: { date: string; value: number }[];
}

interface MockApiData {
  balances: Balance[];
  investments: Investment[];
  currencyRates: CurrencyRate[];
  currencyTrends: CurrencyTrend[];
  isLoading: boolean;
}

export const useMockApi = (): MockApiData => {
  const [data, setData] = useState<MockApiData>({
    balances: [],
    investments: [],
    currencyRates: [],
    currencyTrends: [],
    isLoading: true,
  });

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      const mockBalances: Balance[] = [
        {
          id: "1",
          accountName: "Main Checking",
          accountNumber: "****4567",
          balance: 12450.75,
          currency: "USD",
          formattedBalance: formatCurrency(12450.75, "USD"),
          change: 250.5,
          changePercentage: 2.05,
        },
        {
          id: "2",
          accountName: "Savings Account",
          accountNumber: "****7890",
          balance: 34567.89,
          currency: "USD",
          formattedBalance: formatCurrency(34567.89, "USD"),
          change: 1200.34,
          changePercentage: 3.6,
        },
        {
          id: "3",
          accountName: "Euro Account",
          accountNumber: "****2345",
          balance: 5678.23,
          currency: "EUR",
          formattedBalance: formatCurrency(5678.23, "EUR"),
          change: -120.45,
          changePercentage: -2.08,
        },
      ];

      const mockInvestments: Investment[] = [
        {
          id: "1",
          name: "Tech Stocks",
          value: 8750.45,
          currency: "USD",
          formattedValue: formatCurrency(8750.45, "USD"),
          change: 345.67,
          changePercentage: 4.12,
        },
        {
          id: "2",
          name: "Index Fund",
          value: 12340.56,
          currency: "USD",
          formattedValue: formatCurrency(12340.56, "USD"),
          change: 567.89,
          changePercentage: 4.82,
        },
        {
          id: "3",
          name: "Crypto Portfolio",
          value: 3456.78,
          currency: "USD",
          formattedValue: formatCurrency(3456.78, "USD"),
          change: -234.56,
          changePercentage: -6.35,
        },
      ];

      const mockCurrencyRates: CurrencyRate[] = [
        { code: "USD", name: "US Dollar", rate: 1 },
        { code: "EUR", name: "Euro", rate: 0.91 },
        { code: "GBP", name: "British Pound", rate: 0.78 },
        { code: "JPY", name: "Japanese Yen", rate: 149.82 },
        { code: "CAD", name: "Canadian Dollar", rate: 1.36 },
      ];

      // Generate random trend data for the past 30 days
      const generateTrendData = (baseCurrency: string, volatility: number) => {
        const data = [];
        const today = new Date();
        let value =
          baseCurrency === "USD"
            ? 1
            : mockCurrencyRates.find((r) => r.code === baseCurrency)?.rate || 1;

        for (let i = 30; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);

          // Add some random fluctuation
          value = value + (Math.random() - 0.5) * volatility;
          if (value <= 0) value = 0.01; // Prevent negative or zero values

          data.push({
            date: date.toISOString().split("T")[0],
            value: parseFloat(value.toFixed(4)),
          });
        }

        return data;
      };

      const mockCurrencyTrends: CurrencyTrend[] = [
        { currency: "EUR", data: generateTrendData("EUR", 0.01) },
        { currency: "GBP", data: generateTrendData("GBP", 0.008) },
        { currency: "JPY", data: generateTrendData("JPY", 0.5) },
      ];

      setData({
        balances: mockBalances,
        investments: mockInvestments,
        currencyRates: mockCurrencyRates,
        currencyTrends: mockCurrencyTrends,
        isLoading: false,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return data;
};
