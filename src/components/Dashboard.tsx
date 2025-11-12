import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DollarSign, TrendingUp, TrendingDown, Clock, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

const monthlyData = [
  { month: 'Jan', income: 45000, expense: 32000 },
  { month: 'Feb', income: 52000, expense: 35000 },
  { month: 'Mar', income: 48000, expense: 38000 },
  { month: 'Apr', income: 61000, expense: 41000 },
  { month: 'May', income: 55000, expense: 39000 },
  { month: 'Jun', income: 67000, expense: 43000 },
];

const recentTransactions = [
  { id: 1, type: 'income', description: 'Client Payment', amount: 5000, date: 'Nov 10' },
  { id: 2, type: 'expense', description: 'Office Rent', amount: 2500, date: 'Nov 9' },
  { id: 3, type: 'income', description: 'Consulting Fee', amount: 3200, date: 'Nov 8' },
  { id: 4, type: 'expense', description: 'Software', amount: 299, date: 'Nov 7' },
];

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader title="Dashboard" />
      
      <main className="p-4">
        {/* Welcome */}
        <div className="mb-4">
          <h2 className="text-gray-900">Welcome back, John!</h2>
          <p className="text-gray-500">Here's your financial overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="mb-1">Income</div>
              <div className="text-white">$67,000</div>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>
              <div className="mb-1">Expenses</div>
              <div className="text-white">$43,000</div>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <ArrowDownRight className="w-3 h-3" />
                <span>+8%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mb-1">Profit</div>
              <div className="text-white">$24,000</div>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>+18%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mb-1">Pending</div>
              <div className="text-white">$8,200</div>
              <div className="text-white/80 mt-1">
                <span>3 items</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Recent Transactions</CardTitle>
            <button 
              onClick={() => onNavigate('transactions')}
              className="text-blue-600"
            >
              View All
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="text-gray-900">{transaction.description}</div>
                      <div className="text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentPage="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
