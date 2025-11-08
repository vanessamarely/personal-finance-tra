import { Card } from '@/components/ui/card';

interface EmptyPlaceholderProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

export function EmptyPlaceholder({ icon: Icon, title, description }: EmptyPlaceholderProps) {
  return (
    <Card className="p-12 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Icon size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-md">{description}</p>
      </div>
    </Card>
  );
}
