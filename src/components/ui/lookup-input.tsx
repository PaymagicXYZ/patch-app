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
};

export const LookupInput = ({ onInputChange, onSelectChange, defaultValue, placeholder, className }: Props) => {
  return (
    <Input
      defaultValue={defaultValue}
      name="userId"
      onChange={onInputChange}
      leftButton={<SelectSocialProvider name="provider" onChange={onSelectChange} />}
      type="text"
      placeholder={placeholder}
      className={cn('mt-4', className)}
    />
  );
};
