import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expense, Category } from '@/lib/types';
import { formatCurrency, formatDate, getCategoryLabel } from '@/lib/constants';
import { CategoryIcon } from './CategoryIcon';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { Wallet } from '@phosphor-icons/react';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseClick: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onExpenseClick }: ExpenseListProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredExpenses = expenses.filter((expense) => {
    if (filterCategory === 'all') return true;
    return expense.category === filterCategory;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateCompare !== 0) return dateCompare;
    return b.createdAt - a.createdAt;
  });

  if (expenses.length === 0) {
    return (
      <EmptyPlaceholder
        icon={Wallet}
        title="No expenses yet"
        description="Start tracking your spending by adding your first expense"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Filter by:</span>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="bills">Bills</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground ml-auto">
          {sortedExpenses.length} {sortedExpenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      {sortedExpenses.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No expenses in this category</p>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="flex flex-col gap-2 pr-4">
            {sortedExpenses.map((expense) => (
              <Card
                key={expense.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onExpenseClick(expense)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                    <CategoryIcon category={expense.category} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-base truncate">
                        {expense.description}
                      </h3>
                      <span className="font-semibold text-base whitespace-nowrap">
                        {formatCurrency(expense.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {getCategoryLabel(expense.category)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(expense.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
