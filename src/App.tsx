import { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { Expense, Budget, BudgetStatus, Category } from '@/lib/types';
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { EditExpenseDialog } from '@/components/EditExpenseDialog';
import { ExpenseList } from '@/components/ExpenseList';
import { BudgetsView } from '@/components/BudgetsView';
import { TrendsView } from '@/components/TrendsView';
import { Wallet, Target, ChartPie } from '@phosphor-icons/react';
import { CATEGORIES } from '@/lib/constants';

function App() {
  const [expenses, setExpenses] = useKV<Expense[]>('expenses', []);
  const [budgets, setBudgets] = useKV<Budget[]>('budgets', []);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const expensesList = expenses || [];
  const budgetsList = budgets || [];

  const handleAddExpense = (expense: Expense) => {
    setExpenses((current) => [...(current || []), expense]);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses((current) =>
      (current || []).map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((current) => (current || []).filter((expense) => expense.id !== id));
  };

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditDialogOpen(true);
  };

  const handleUpdateBudget = (category: string, limit: number) => {
    setBudgets((current) => {
      const currentBudgets = current || [];
      const existingBudget = currentBudgets.find((b) => b.category === category);
      if (existingBudget) {
        return currentBudgets.map((b) => (b.category === category ? { ...b, limit } : b));
      }
      return [...currentBudgets, { category: category as Category, limit }];
    });
  };

  const budgetStatuses: BudgetStatus[] = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyExpenses = expensesList.filter((expense) => expense.date.startsWith(currentMonth));

    return CATEGORIES.map((cat) => {
      const budget = budgetsList.find((b) => b.category === cat.value);
      const limit = budget?.limit || 0;
      const spent = monthlyExpenses
        .filter((expense) => expense.category === cat.value)
        .reduce((sum, expense) => sum + expense.amount, 0);
      const remaining = limit - spent;
      const percentage = limit > 0 ? (spent / limit) * 100 : 0;

      return {
        category: cat.value,
        limit,
        spent,
        remaining,
        percentage,
      };
    });
  }, [expensesList, budgetsList]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Finance Tracker</h1>
              <p className="text-muted-foreground mt-2">
                Track your expenses and manage your budget
              </p>
            </div>
            <AddExpenseDialog onAddExpense={handleAddExpense} />
          </div>
        </header>

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="expenses" className="gap-2">
              <Wallet size={20} />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="gap-2">
              <Target size={20} />
              <span className="hidden sm:inline">Budgets</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <ChartPie size={20} />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses">
            <ExpenseList expenses={expensesList} onExpenseClick={handleExpenseClick} />
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetsView budgets={budgetStatuses} onUpdateBudget={handleUpdateBudget} />
          </TabsContent>

          <TabsContent value="trends">
            <TrendsView expenses={expensesList} />
          </TabsContent>
        </Tabs>
      </div>

      <EditExpenseDialog
        expense={selectedExpense}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateExpense={handleUpdateExpense}
        onDeleteExpense={handleDeleteExpense}
      />

      <Toaster />
    </div>
  );
}

export default App;