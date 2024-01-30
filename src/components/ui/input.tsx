
import { cn } from "@/utils/"
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftButton?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftButton, ...props }, ref) => {
    return (
      <div className="relative flex h-10 items-end">
        {leftButton && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {leftButton}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "h-10 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            {
              "pl-28": leftButton,
              
            },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input"

export { Input }
