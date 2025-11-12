import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { AddIncomeExpense } from './components/AddIncomeExpense';
import { ExpenseList } from './components/ExpenseList';
import { ReportsPage } from './components/ReportsPage';

type Page = 'login' | 'dashboard' | 'add-transaction' | 'transactions' | 'reports';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentPage === 'add-transaction' && (
        <AddIncomeExpense onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentPage === 'transactions' && (
        <ExpenseList onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentPage === 'reports' && (
        <ReportsPage onNavigate={navigateTo} onLogout={handleLogout} />
      )}
    </div>
  );
}
