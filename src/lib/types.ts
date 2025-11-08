export type Category = 
  | 'food' 
  | 'transport' 
  | 'entertainment' 
  | 'shopping' 
  | 'bills' 
  | 'health' 
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: number;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface BudgetStatus extends Budget {
  spent: number;
  remaining: number;
  percentage: number;
}
