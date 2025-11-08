import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BudgetStatus } from '@/lib/types';
import { formatCurrency, getCategoryLabel } from '@/lib/constants';
import { CategoryIcon } from './CategoryIcon';
import { Pencil, Check, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface BudgetCardProps {
  budget: BudgetStatus;
  onUpdateBudget: (category: string, limit: number) => void;
}

export function BudgetCard({ budget, onUpdateBudget }: BudgetCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [limitValue, setLimitValue] = useState(budget.limit.toString());

  const handleSave = () => {
    const newLimit = parseFloat(limitValue);
    if (!isNaN(newLimit) && newLimit > 0) {
      onUpdateBudget(budget.category, newLimit);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setLimitValue(budget.limit.toString());
    setIsEditing(false);
  };

  const getStatusColor = () => {
    if (budget.percentage >= 100) return 'text-destructive';
    if (budget.percentage >= 70) return 'text-[oklch(0.75_0.15_85)]';
    return 'text-[oklch(0.65_0.18_150)]';
  };

  const getProgressColor = () => {
    if (budget.percentage >= 100) return 'bg-destructive';
    if (budget.percentage >= 70) return 'bg-[oklch(0.75_0.15_85)]';
    return 'bg-[oklch(0.65_0.18_150)]';
  };

  const getStatusBadge = () => {
    if (budget.percentage >= 100) return { label: 'Over Budget', variant: 'destructive' as const };
    if (budget.percentage >= 70) return { label: 'Warning', variant: 'secondary' as const };
    return { label: 'On Track', variant: 'default' as const };
  };

  const status = getStatusBadge();

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
            <CategoryIcon category={budget.category} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-base">{getCategoryLabel(budget.category)}</h3>
            <Badge variant={status.variant} className="text-xs mt-1">
              {status.label}
            </Badge>
          </div>
        </div>
        {!isEditing && (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil size={18} />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className={cn('font-semibold', getStatusColor())}>
            {formatCurrency(budget.spent)}
          </span>
        </div>

        <Progress 
          value={Math.min(budget.percentage, 100)} 
          className="h-2"
          indicatorClassName={getProgressColor()}
        />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Budget</span>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.01"
                min="0.01"
                value={limitValue}
                onChange={(e) => setLimitValue(e.target.value)}
                className="w-28 h-8"
              />
              <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8">
                <Check size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8">
                <X size={16} />
              </Button>
            </div>
          ) : (
            <span className="font-semibold">{formatCurrency(budget.limit)}</span>
          )}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {budget.remaining >= 0 ? 'Remaining' : 'Over by'}
            </span>
            <span className={cn('font-semibold', getStatusColor())}>
              {formatCurrency(Math.abs(budget.remaining))}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
