import { cn } from "@/libs/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftButton?: React.ReactNode;
  rightElement?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, leftButton, rightElement, wrapperClassName, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn("relative flex h-11 items-end flex-1", wrapperClassName)}
      >
        {leftButton && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {leftButton}
          </div>
        )}
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightElement}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "h-11 flex-1 rounded-xl border-[0.5px] bg-gray-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-gray-800 focus:border-[0.5px] focus:bg-gray-1000",
            {
              "pl-20": leftButton,
            },
            className,
          )}
          autoComplete="off"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
