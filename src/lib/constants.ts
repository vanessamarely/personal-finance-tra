import { Category } from './types';
import {
  ShoppingCart,
  ForkKnife,
  Car,
  FilmSlate,
  Lightning,
  Heart,
  DotsThree,
} from '@phosphor-icons/react';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'bills', label: 'Bills' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

export const CATEGORY_ICONS: Record<Category, React.ComponentType<any>> = {
  food: ForkKnife,
  transport: Car,
  entertainment: FilmSlate,
  shopping: ShoppingCart,
  bills: Lightning,
  health: Heart,
  other: DotsThree,
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: 'oklch(0.65 0.18 150)',
  transport: 'oklch(0.60 0.15 250)',
  entertainment: 'oklch(0.70 0.20 300)',
  shopping: 'oklch(0.65 0.20 25)',
  bills: 'oklch(0.75 0.15 85)',
  health: 'oklch(0.65 0.22 0)',
  other: 'oklch(0.55 0.05 250)',
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function getCategoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.value === category)?.label || category;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
