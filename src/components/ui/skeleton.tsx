import { cn } from '@/utils/index';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-100 dark:bg-gray-800', className)} {...props} />;
}

export { Skeleton };
