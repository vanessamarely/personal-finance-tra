import { Category } from '@/lib/types';
import { CATEGORY_ICONS } from '@/lib/constants';

interface CategoryIconProps {
  category: Category;
  className?: string;
  size?: number;
}

export function CategoryIcon({ category, className, size = 20 }: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[category];
  return <Icon size={size} className={className} weight="duotone" />;
}
