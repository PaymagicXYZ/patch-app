import { cn } from '@/utils/';
import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftButton?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, leftButton, ...props }, ref) => {
  return (
    <div className={cn('relative flex h-10 items-end flex-1')}>
      {leftButton && <div className="absolute inset-y-0 left-0 flex items-center pl-2">{leftButton}</div>}
      <input
        type={type}
        className={cn(
          'h-10 flex-1 rounded-xl border-[0.5px] border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          {
            'pl-20': leftButton,
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
