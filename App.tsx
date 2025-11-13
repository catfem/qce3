import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import MyBankPage from './pages/MyBankPage';
import OpenBankPage from './pages/OpenBankPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './hooks/useAuth';
import AuthModal from './components/AuthModal';
import { Page } from './types';


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const { user, loading } = useAuth();
  
  const handleSetPage = (page: Page) => {
    const isGuest = user && 'isGuest' in user && user.isGuest;
    const isProtected = page === 'my-bank' || page === 'dashboard' || page === 'settings';

    if (isGuest && isProtected) {
      // Don't allow guests to navigate to protected pages
      return;
    }
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'my-bank':
        return <MyBankPage />;
      case 'open-bank':
        return <OpenBankPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark text-text-light-primary dark:text-dark-primary">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <AuthModal />;
  }

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-sans text-text-light-primary dark:text-dark-primary">
      <Sidebar activePage={activePage} setActivePage={handleSetPage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;