import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';

interface ExpenseListProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

const mockTransactions = [
  {
    id: 1,
    date: '2025-11-10',
    account: 'Main Bank',
    category: 'Office Supplies',
    amount: 120.00,
    description: 'Printer ink',
    type: 'expense',
  },
  {
    id: 2,
    date: '2025-11-09',
    account: 'Main Bank',
    category: 'Consulting',
    amount: 3200.00,
    description: 'Client ABC Corp',
    type: 'income',
  },
  {
    id: 3,
    date: '2025-11-08',
    account: 'Credit Card',
    category: 'Software',
    amount: 299.00,
    description: 'SaaS subscription',
    type: 'expense',
  },
  {
    id: 4,
    date: '2025-11-07',
    account: 'Main Bank',
    category: 'Rent',
    amount: 2500.00,
    description: 'Office rent',
    type: 'expense',
  },
  {
    id: 5,
    date: '2025-11-06',
    account: 'Main Bank',
    category: 'Sales',
    amount: 5000.00,
    description: 'Product sales',
    type: 'income',
  },
  {
    id: 6,
    date: '2025-11-05',
    account: 'Petty Cash',
    category: 'Office Supplies',
    amount: 45.50,
    description: 'Stationery',
    type: 'expense',
  },
];

export function ExpenseList({ onNavigate, onLogout }: ExpenseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader title="Transactions" />
      
      <main className="p-4">
        {/* Search and Filter */}
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-green-600 mb-1">Income</div>
              <div className="text-green-700">+${totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="text-red-600 mb-1">Expenses</div>
              <div className="text-red-700">-${totalExpense.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-6 h-6 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 truncate">{transaction.description}</div>
                    <div className="text-gray-500">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-gray-400">{transaction.account}</div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className={`${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                    <button className="p-1 mt-1">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Net Summary */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-blue-600">Net Amount</div>
              <div className="text-blue-700">
                ${(totalIncome - totalExpense).toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentPage="transactions" onNavigate={onNavigate} />
    </div>
  );
}
