import { useFormStatus } from "react-dom";
import { LoadingSpinner } from "./Spinner";
import { cn } from "@/utils";

export function FormSubmissionLoader({ className }: { className?: string }) {
  // Note: useFormStatus works only in the context of a form
  const { pending } = useFormStatus();
  return (
    <LoadingSpinner
      className={cn(className, {
        hidden: !pending,
      })}
    />
  );
}
