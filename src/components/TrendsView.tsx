import { Card } from '@/components/ui/card';
import { Expense, Category } from '@/lib/types';
import { formatCurrency, getCategoryLabel, CATEGORY_COLORS } from '@/lib/constants';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { ChartPie } from '@phosphor-icons/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface TrendsViewProps {
  expenses: Expense[];
}

export function TrendsView({ expenses }: TrendsViewProps) {
  if (expenses.length === 0) {
    return (
      <EmptyPlaceholder
        icon={ChartPie}
        title="No trends data"
        description="Add some expenses to see your spending trends and category breakdown"
      />
    );
  }

  const categoryData = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<Category, number>);

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: getCategoryLabel(category as Category),
    value: amount,
    color: CATEGORY_COLORS[category as Category],
  }));

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const dailySpending = expenses
    .filter((expense) => new Date(expense.date) >= last30Days)
    .reduce((acc, expense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
    }, {} as Record<string, number>);

  const barData = Object.entries(dailySpending)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .slice(-14)
    .map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount,
    }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Spent</h3>
          <p className="text-3xl font-bold">{formatCurrency(totalSpent)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold">{expenses.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Expense</h3>
          <p className="text-3xl font-bold">{formatCurrency(totalSpent / expenses.length)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Spending (Last 14 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'oklch(0.99 0 0)', border: '1px solid oklch(0.88 0.01 250)' }}
              />
              <Bar dataKey="amount" fill="oklch(0.60 0.15 190)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {pieData
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {((item.value / totalSpent) * 100).toFixed(1)}%
                  </span>
                  <span className="font-semibold min-w-[100px] text-right">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
