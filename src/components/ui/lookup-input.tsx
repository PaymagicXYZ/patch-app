import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { Input } from "./input";
import { SelectSocialProvider } from "../SelectSocialProvider";
import { cn } from "@/utils";

type Props = {
  onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  inputName?: string;
  selectName?: string;
  type?: HTMLInputTypeAttribute;
  leftButton?: React.ReactNode;
  rightElement?: React.ReactNode;
};

export const LookupInput = ({
  onInputChange,
  onSelectChange,
  rightElement,
  inputName,
  selectName,
  defaultValue,
  placeholder,
  leftButton,
  type,
  className,
  ...rest
}: Props) => {
  return (
    <Input
      defaultValue={defaultValue}
      name={inputName ?? "userId"}
      onChange={onInputChange}
      leftButton={
        leftButton ?? (
          <SelectSocialProvider
            name={selectName ?? "provider"}
            onChange={onSelectChange}
          />
        )
      }
      rightElement={rightElement}
      type={type ?? "text"}
      placeholder={placeholder}
      className={cn("mt-4", className)}
      {...rest}
    />
  );
};
