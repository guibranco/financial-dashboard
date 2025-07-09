import React from 'react';
import { Home, CreditCard, PieChart, BarChart4, Settings, HelpCircle, LogOut, Bell, User } from 'lucide-react';
import { cn } from '../ui/utils/cn';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentPage }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'Accounts', icon: CreditCard, id: 'accounts' },
    { name: 'Investments', icon: PieChart, id: 'investments' },
    { name: 'Transactions', icon: BarChart4, id: 'transactions' },
    { name: 'Notifications', icon: Bell, id: 'notifications' },
    { name: 'Profile', icon: User, id: 'profile' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ];

  const secondaryNavItems = [
    { name: 'Help', icon: HelpCircle, id: 'help' },
    { name: 'Logout', icon: LogOut, id: 'logout' },
  ];

  return (
    <div className="hidden md:flex md:shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto scrollbar-thin">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    currentPage === item.id
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 shrink-0 h-5 w-5 transition-colors',
                      currentPage === item.id 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                    )}
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="shrink-0 w-full space-y-1">
              {secondaryNavItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
                >
                  <item.icon className="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 mr-3 shrink-0 h-5 w-5 transition-colors" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};