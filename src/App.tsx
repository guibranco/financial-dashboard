import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Investments from './pages/Investments';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import { AppLayout } from './layout/AppLayout';
import { DarkModeProvider } from './context/DarkModeContext.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <DarkModeProvider>
      <AppLayout onNavigate={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </AppLayout>
    </DarkModeProvider>
  );

  function renderPage() {
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
  }
}

export default App;