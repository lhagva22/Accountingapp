import { Home, Plus, TrendingUp, FileText } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: TrendingUp },
    { id: 'add-transaction', label: 'Add', icon: Plus },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {item.id === 'add-transaction' ? (
                <div className={`w-12 h-12 -mt-6 rounded-full flex items-center justify-center shadow-lg ${
                  isActive ? 'bg-blue-600' : 'bg-blue-600'
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <>
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
