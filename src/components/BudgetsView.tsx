import { BudgetStatus } from '@/lib/types';
import { BudgetCard } from './BudgetCard';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { Target } from '@phosphor-icons/react';

interface BudgetsViewProps {
  budgets: BudgetStatus[];
  onUpdateBudget: (category: string, limit: number) => void;
}

export function BudgetsView({ budgets, onUpdateBudget }: BudgetsViewProps) {
  const activeBudgets = budgets.filter((b) => b.limit > 0);

  if (activeBudgets.length === 0) {
    return (
      <EmptyPlaceholder
        icon={Target}
        title="No budgets set"
        description="Set monthly budget limits for your spending categories to track your progress"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeBudgets.map((budget) => (
        <BudgetCard key={budget.category} budget={budget} onUpdateBudget={onUpdateBudget} />
      ))}
    </div>
  );
}
