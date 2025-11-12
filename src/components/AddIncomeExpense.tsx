import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Upload, X } from 'lucide-react';

interface AddIncomeExpenseProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function AddIncomeExpense({ onNavigate, onLogout }: AddIncomeExpenseProps) {
  const [formData, setFormData] = useState({
    type: 'income',
    account: '',
    amount: '',
    date: '',
    documentNo: '',
    category: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Transaction saved successfully!');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader title="Add Transaction" />
      
      <main className="p-4">
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Transaction Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'income'
                        ? 'border-green-600 bg-green-50 text-green-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'expense'
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Expense
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Account */}
              <div className="space-y-2">
                <Label htmlFor="account">Account</Label>
                <Select
                  value={formData.account}
                  onValueChange={(value) => setFormData({ ...formData, account: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-bank">Main Bank</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="petty-cash">Petty Cash</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.type === 'income' ? (
                      <>
                        <SelectItem value="sales">Sales Revenue</SelectItem>
                        <SelectItem value="consulting">Consulting Fee</SelectItem>
                        <SelectItem value="interest">Interest</SelectItem>
                        <SelectItem value="other-income">Other Income</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="office-supplies">Office Supplies</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="other-expense">Other</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              {/* Document Number */}
              <div className="space-y-2">
                <Label htmlFor="documentNo">Document No. (Optional)</Label>
                <Input
                  id="documentNo"
                  type="text"
                  placeholder="INV-2025-001"
                  value={formData.documentNo}
                  onChange={(e) => setFormData({ ...formData, documentNo: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Attach Receipt (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Tap to upload</p>
                  <p className="text-gray-400">Image or PDF</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onNavigate('dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentPage="add-transaction" onNavigate={onNavigate} />
    </div>
  );
}
