import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
} from "lucide-react";
import { useMockApi } from "../../hooks/useMockApi";
import { formatPercentage } from "../../utils/formatters";

const Investments: React.FC = () => {
  const { investments, isLoading } = useMockApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredInvestments = investments.filter((investment) =>
    investment.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate total investment value
  const totalValue = investments.reduce(
    (sum, investment) => sum + investment.value,
    0,
  );

  // Calculate performance metrics
  const positiveInvestments = investments.filter((inv) => inv.change > 0);
  const negativeInvestments = investments.filter((inv) => inv.change < 0);
  const averageReturn =
    investments.reduce((sum, inv) => sum + inv.changePercentage, 0) /
    investments.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Investments</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-xs text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">
                Total Portfolio Value
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Portfolio Performance
          </h2>
          <div className="flex items-center">
            {averageReturn >= 0 ? (
              <ArrowUpRight className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <ArrowDownRight className="h-6 w-6 text-red-500 mr-2" />
            )}
            <p
              className={`text-2xl font-semibold ${averageReturn >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {formatPercentage(averageReturn)}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">Average return</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Investment Breakdown
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Positive</p>
              <p className="text-xl font-semibold text-green-500">
                {positiveInvestments.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Negative</p>
              <p className="text-xl font-semibold text-red-500">
                {negativeInvestments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg mb-8">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Your Investments
              </h2>
              <div className="mt-1 flex space-x-4">
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "all"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "stocks"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("stocks")}
                >
                  Stocks
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "crypto"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("crypto")}
                >
                  Crypto
                </button>
              </div>
            </div>
            <div className="mt-3 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search investments"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-xs text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Investment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Change
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Performance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvestments.map((investment) => (
                <tr key={investment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {investment.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {investment.formattedValue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        signDisplay: "always",
                      }).format(investment.change)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {investment.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          investment.change >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {formatPercentage(investment.changePercentage)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-900">
                      Trade
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvestments.length === 0 && (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            No investments found matching your search.
          </div>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Investment Allocation
          </h2>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <PieChart className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2">Allocation chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
