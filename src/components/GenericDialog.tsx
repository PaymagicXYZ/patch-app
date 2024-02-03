import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/utils';
import { ArrowUp } from 'lucide-react';

export function GenericDialog({
  children,
  className,
  title,
  subtitle,
  TriggerComponent,
  FooterComponent,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
  TriggerComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {TriggerComponent ? (
          TriggerComponent
        ) : (
          <Button className="cursor-pointer bg-orange-900 px-12 text-orange-100 hover:bg-orange-900/80" asChild>
            <div className="flex items-center gap-1">
              <ArrowUp />
              <div>Send</div>
            </div>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={cn('min-w-[260px] max-w-[660px] bg-gray-900 border-none flex flex-col justify-center', className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{FooterComponent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
