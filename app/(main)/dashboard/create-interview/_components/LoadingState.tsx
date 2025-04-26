import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{message}</span>
    </div>
  );
} 