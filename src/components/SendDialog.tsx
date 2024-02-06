import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/utils";

export function SendDialog({
  children,
  className,
  subtitle,
  TriggerComponent,
  FooterComponent,
}: {
  children: React.ReactNode;
  className?: string;
  subtitle: string;
  TriggerComponent: React.ReactNode;
  FooterComponent?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent
        className={cn("min-w-[260px] bg-gray-900 border-none", className)}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Send</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{FooterComponent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
