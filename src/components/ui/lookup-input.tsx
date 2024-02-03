import { ChangeEvent } from 'react';
import { Input } from './input';
import { SelectSocialProvider } from '../SelectSocialProvider';
import { cn } from '@/utils';

type Props = {
  onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  leftButton?: React.ReactNode;
};

export const LookupInput = ({ onInputChange, onSelectChange, defaultValue, placeholder, leftButton, className }: Props) => {
  return (
    <Input
      defaultValue={defaultValue}
      name="userId"
      onChange={onInputChange}
      leftButton={leftButton ?? <SelectSocialProvider name="provider" onChange={onSelectChange} />}
      type="text"
      placeholder={placeholder}
      className={cn('mt-4', className)}
    />
  );
};
