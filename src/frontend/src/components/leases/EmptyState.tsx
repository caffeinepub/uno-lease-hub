import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-md text-center">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="whitespace-pre-line">{description}</CardDescription>
      </CardHeader>
      {action && (
        <CardContent>
          <Button onClick={action.onClick} className="w-full">
            {action.label}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
