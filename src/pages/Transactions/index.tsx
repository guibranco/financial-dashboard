import React, { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, Download } from 'lucide-react';

// Mock transaction data
interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'credit' | 'debit';
  account: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-04-15',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 3500,
    type: 'credit',
    account: 'Main Checking',
  },
  {
    id: '2',
    date: '2025-04-14',
    description: 'Grocery Store',
    category: 'Food & Dining',
    amount: 85.75,
    type: 'debit',
    account: 'Main Checking',
  },
  {
    id: '3',
    date: '2025-04-12',
    description: 'Electric Bill',
    category: 'Utilities',
    amount: 120.50,
    type: 'debit',
    account: 'Main Checking',
  },
  {
    id: '4',
    date: '2025-04-10',
    description: 'Online Shopping',
    category: 'Shopping',
    amount: 65.99,
    type: 'debit',
    account: 'Main Checking',
  },
  {
    id: '5',
    date: '2025-04-08',
    description: 'Restaurant',
    category: 'Food & Dining',
    amount: 45.80,
    type: 'debit',
    account: 'Main Checking',
  },
  {
    id: '6',
    date: '2025-04-05',
    description: 'Interest Payment',
    category: 'Income',
    amount: 12.33,
    type: 'credit',
    account: 'Savings Account',
  },
  {
    id: '7',
    date: '2025-04-03',
    description: 'Mobile Phone Bill',
    category: 'Utilities',
    amount: 55.00,
    type: 'debit',
    account: 'Main Checking',
  },
  {
    id: '8',
    date: '2025-04-01',
    description: 'Transfer to Savings',
    category: 'Transfer',
    amount: 500.00,
    type: 'debit',
    account: 'Main Checking',
  },
];

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter transactions based on search term, tab, and category
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.account.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'income' && transaction.type === 'credit') ||
      (activeTab === 'expenses' && transaction.type === 'debit');
    
    const matchesCategory = 
      selectedCategory === 'all' || transaction.category === selectedCategory;
    
    return matchesSearch && matchesTab && matchesCategory;
  });
  
  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(mockTransactions.map(t => t.category))];
  
  // Calculate totals
  const totalIncome = mockTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Income</h2>
          <div className="flex items-center">
            <ArrowDownLeft className="h-6 w-6 text-green-500 mr-2" />
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalIncome)}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">Total income this month</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Expenses</h2>
          <div className="flex items-center">
            <ArrowUpRight className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalExpenses)}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">Total expenses this month</p>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Transaction History</h2>
              <div className="mt-1 flex space-x-4">
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'all' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'income' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('income')}
                >
                  Income
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'expenses' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('expenses')}
                >
                  Expenses
                </button>
              </div>
            </div>
            <div className="mt-3 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search transactions"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            No transactions found matching your search.
          </div>
        )}
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredTransactions.length}</span> of{' '}
              <span className="font-medium">{mockTransactions.length}</span> transactions
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;