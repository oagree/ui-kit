import {HTMLAttributes, ReactNode} from 'react';
import {SelectProvider, useSelectContext} from "./react/SelectContext.tsx";

type SelectProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  initialValue: any;
  onChange?: (value: any) => void;
};

const Select = ({ children, initialValue, onChange, ...props }: SelectProps) => {
  return (
    <SelectProvider initialValue={initialValue} onChange={onChange}>
      <div {...props} className="eone-select">{children}</div>
    </SelectProvider>
  );
};

type TriggerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const SelectTrigger = ({ children, ...props }: TriggerProps) => {
  const { toggle } = useSelectContext();
  return (
    <div className="eone-select-trigger" onClick={toggle} {...props}>
      {children}
    </div>
  );
};

type OptionsProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const SelectOptions = ({ children, ...props }: OptionsProps) => {
  const { isOpen } = useSelectContext();
  if (!isOpen) return null;
  return <div className="eone-select-options" {...props}>{children}</div>;
};

type OptionProps = HTMLAttributes<HTMLDivElement> & {
  value: any;
  children: ReactNode;
};

const SelectOption = ({ value, children, ...props }: OptionProps) => {
  const { select } = useSelectContext();
  return (
    <div className="eone-select-option" onClick={() => select(value)} {...props}>
      {children}
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.Options = SelectOptions;
Select.Option = SelectOption;

export default Select;
