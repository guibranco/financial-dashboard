import React, { useState } from 'react';
import { Bell, Search, Filter, Check, Trash2, AlertTriangle, CreditCard, ShieldAlert, Info } from 'lucide-react';

// Mock notification data
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'transaction' | 'security' | 'alert' | 'info';
  isRead: boolean;
  date: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Transaction',
    message: 'You have received a deposit of $1,250.00 to your Main Checking account.',
    type: 'transaction',
    isRead: false,
    date: '2025-04-15T10:30:00',
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Your password was changed successfully. If you did not make this change, please contact support immediately.',
    type: 'security',
    isRead: false,
    date: '2025-04-14T15:45:00',
  },
  {
    id: '3',
    title: 'Low Balance Alert',
    message: 'Your Savings Account balance is below $500. Consider adding funds to avoid fees.',
    type: 'alert',
    isRead: true,
    date: '2025-04-12T09:15:00',
  },
  {
    id: '4',
    title: 'New Feature Available',
    message: 'We\'ve added a new currency converter tool to help you manage international transactions.',
    type: 'info',
    isRead: true,
    date: '2025-04-10T14:20:00',
  },
  {
    id: '5',
    title: 'Unusual Activity Detected',
    message: 'We noticed a login attempt from an unrecognized device. Please verify this was you.',
    type: 'security',
    isRead: false,
    date: '2025-04-08T23:10:00',
  },
  {
    id: '6',
    title: 'Investment Update',
    message: 'Your investment portfolio has increased by 3.2% this month.',
    type: 'info',
    isRead: true,
    date: '2025-04-05T11:45:00',
  },
  {
    id: '7',
    title: 'Transaction Declined',
    message: 'Your recent transaction of $350.00 at Electronics Store was declined due to insufficient funds.',
    type: 'transaction',
    isRead: false,
    date: '2025-04-03T16:30:00',
  },
  {
    id: '8',
    title: 'Account Statement Available',
    message: 'Your monthly account statement for March 2025 is now available for download.',
    type: 'info',
    isRead: true,
    date: '2025-04-01T08:00:00',
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  
  // Filter notifications based on search term and tab
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'unread' && !notification.isRead) ||
      (activeTab === notification.type);
    
    return matchesSearch && matchesTab;
  });
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const toggleExpand = (id: string) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <CreditCard className="h-6 w-6 text-blue-600" />;
      case 'security':
        return <ShieldAlert className="h-6 w-6 text-red-600" />;
      case 'alert':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'info':
        return <Info className="h-6 w-6 text-green-600" />;
      default:
        return <Bell className="h-6 w-6 text-gray-600" />;
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-blue-100';
      case 'security':
        return 'bg-red-100';
      case 'alert':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-xs text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg mb-8">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Notification Center
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {unreadCount} unread
                  </span>
                )}
              </h2>
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
                    activeTab === 'unread' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('unread')}
                >
                  Unread
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'transaction' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('transaction')}
                >
                  Transactions
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'security' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  Security
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
                  placeholder="Search notifications"
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
        
        <ul className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <li className="px-6 py-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any notifications matching your criteria.
              </p>
            </li>
          ) : (
            filteredNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`px-6 py-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`shrink-0 h-10 w-10 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0" onClick={() => toggleExpand(notification.id)}>
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${!notification.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(notification.date)}</p>
                    </div>
                    <p className={`text-sm ${expandedNotification === notification.id ? '' : 'line-clamp-2'} ${!notification.isRead ? 'text-blue-700' : 'text-gray-500'}`}>
                      {notification.message}
                    </p>
                    {expandedNotification === notification.id && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark as read
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-sm text-red-700 bg-white hover:bg-gray-50"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 self-center flex">
                    <div className="flex space-x-1">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <span className="sr-only">Mark as read</span>
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <span className="sr-only">Delete</span>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        
        {filteredNotifications.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredNotifications.length}</span> of{' '}
                <span className="font-medium">{notifications.length}</span> notifications
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
        )}
      </div>

      <div className="mt-8 bg-white shadow-sm overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Preferences</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage how and when you receive notifications.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-transactions"
                      name="email-transactions"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-transactions" className="font-medium text-gray-700">
                      Transaction alerts
                    </label>
                    <p className="text-gray-500">Receive emails for significant account transactions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-security"
                      name="email-security"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-security" className="font-medium text-gray-700">
                      Security alerts
                    </label>
                    <p className="text-gray-500">Receive emails about security-related events.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-marketing"
                      name="email-marketing"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-marketing" className="font-medium text-gray-700">
                      Marketing communications
                    </label>
                    <p className="text-gray-500">Receive emails about new features and promotions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="push-transactions"
                      name="push-transactions"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="push-transactions" className="font-medium text-gray-700">
                      Transaction alerts
                    </label>
                    <p className="text-gray-500">Receive push notifications for account transactions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="push-security"
                      name="push-security"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="push-security" className="font-medium text-gray-700">
                      Security alerts
                    </label>
                    <p className="text-gray-500">Receive push notifications about security-related events.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="push-balance"
                      name="push-balance"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="push-balance" className="font-medium text-gray-700">
                      Balance alerts
                    </label>
                    <p className="text-gray-500">Receive push notifications when your balance is low.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;