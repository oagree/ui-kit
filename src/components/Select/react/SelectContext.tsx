import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SelectContextProps {
  isOpen: boolean;
  toggle: () => void;
  value: any;
  select: (newValue: any) => void;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

export const useSelectContext = (): SelectContextProps => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

interface SelectProviderProps {
  children: ReactNode;
  initialValue: any;
  onChange?: (value: any) => void;
}

export const SelectProvider: React.FC<SelectProviderProps> = ({ children, initialValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const select = useCallback((newValue: any) => {
    setValue(newValue);
    onChange?.(newValue);
    setIsOpen(false);
  }, [onChange]);

  return (
    <SelectContext.Provider value={{ isOpen, toggle, value, select }}>
      {children}
    </SelectContext.Provider>
  );
};
