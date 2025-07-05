import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { Input, Avatar, Dropdown, DropdownItem, DropdownSeparator, Badge } from '../ui';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      setShowUserMenu(false);
      setShowNotifications(false);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Financial Dashboard</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-hidden focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
            <div className="relative">
              <button 
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={toggleNotifications}
              >
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">2</span>
                <Bell className="h-6 w-6" />
              </button>
              
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-2 px-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      <button 
                        onClick={() => handleNavigate('notifications')}
                        className="text-xs text-blue-600 hover:text-blue-500"
                      >
                        View all
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <button 
                      onClick={() => handleNavigate('notifications')}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-200"
                    >
                      <div className="flex">
                        <div className="shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">New Transaction</p>
                          <p className="text-xs text-gray-500 line-clamp-2">You have received a deposit of $1,250.00 to your Main Checking account.</p>
                          <p className="text-xs text-gray-400 mt-1">30 minutes ago</p>
                        </div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNavigate('notifications')}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="flex">
                        <div className="shrink-0">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-red-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Security Alert</p>
                          <p className="text-xs text-gray-500 line-clamp-2">Your password was changed successfully. If you did not make this change, please contact support immediately.</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-3 relative">
              <div>
                <button 
                  className="flex text-sm rounded-full focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={toggleUserMenu}
                >
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                    <User className="h-full w-full text-gray-500" />
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1 mt-2 text-gray-500" />
                </button>
              </div>
              
              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleNavigate('profile')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => handleNavigate('settings')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        // In a real app, this would handle logout logic
                        console.log('Logging out');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
