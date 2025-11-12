import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download, Mail, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ReportsPageProps {
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

const categoryData = [
  { name: 'Rent', value: 15000, color: '#3b82f6' },
  { name: 'Salary', value: 18000, color: '#8b5cf6' },
  { name: 'Supplies', value: 3000, color: '#10b981' },
  { name: 'Software', value: 2500, color: '#f59e0b' },
  { name: 'Marketing', value: 2000, color: '#ef4444' },
  { name: 'Other', value: 2500, color: '#6b7280' },
];

export function ReportsPage({ onNavigate, onLogout }: ReportsPageProps) {
  const [reportPeriod, setReportPeriod] = useState('monthly');

  const totalIncome = monthlyData.reduce((sum, row) => sum + row.income, 0);
  const totalExpense = monthlyData.reduce((sum, row) => sum + row.expense, 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader title="Reports" />
      
      <main className="p-4">
        {/* Period Selector */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-2">
              <label className="text-gray-700">Report Period</label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-3">
              <div className="mb-1">Income</div>
              <div className="text-white">${(totalIncome / 1000).toFixed(0)}k</div>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>YTD</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-3">
              <div className="mb-1">Expense</div>
              <div className="text-white">${(totalExpense / 1000).toFixed(0)}k</div>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <TrendingDown className="w-3 h-3" />
                <span>YTD</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-3">
              <div className="mb-1">Profit</div>
              <div className="text-white">${(netProfit / 1000).toFixed(0)}k</div>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>YTD</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Income vs Expense Chart */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="income" fill="#10b981" />
                <Bar dataKey="expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories Pie Chart */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profit Trend */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData.map(d => ({ ...d, profit: d.income - d.expense }))}>
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Breakdown Table */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700">Month</th>
                    <th className="text-right py-3 px-4 text-gray-700">Income</th>
                    <th className="text-right py-3 px-4 text-gray-700">Expense</th>
                    <th className="text-right py-3 px-4 text-gray-700">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {monthlyData.map((row) => (
                    <tr key={row.month}>
                      <td className="py-3 px-4 text-gray-900">{row.month}</td>
                      <td className="py-3 px-4 text-right text-green-600">
                        ${(row.income / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 px-4 text-right text-red-600">
                        ${(row.expense / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600">
                        ${((row.income - row.expense) / 1000).toFixed(0)}k
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentPage="reports" onNavigate={onNavigate} />
    </div>
  );
}
