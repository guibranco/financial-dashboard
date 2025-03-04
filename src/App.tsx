import React from 'react';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Investments from './pages/Investments';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import { AppLayout } from './layout/AppLayout';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to start with login page

  if (!isLoggedIn) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <Accounts />;
      case 'investments':
        return <Investments />;
      case 'transactions':
        return <Transactions />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout onNavigate={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;