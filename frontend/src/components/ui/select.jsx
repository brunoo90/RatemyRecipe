import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({ value, onValueChange, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedLabel, setSelectedLabel] = useState('');
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value, label) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>{selectedLabel || 'Auswählen...'}</SelectValue>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              return React.cloneElement(child, { onSelect: handleSelect });
            }
            return child;
          })}
        </SelectContent>
      )}
    </div>
  );
}

export function SelectTrigger({ className = "", children, ...props }) {
  const baseClasses = "flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  return (
    <button
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ children }) {
  return <span className="text-left">{children}</span>;
}

export function SelectContent({ className = "", children, onSelect }) {
  const baseClasses = "absolute top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white p-1 shadow-lg";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, { onSelect });
        }
        return child;
      })}
    </div>
  );
}

export function SelectItem({ value, children, onSelect }) {
  const baseClasses = "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100";
  
  return (
    <div
      className={baseClasses}
      onClick={() => onSelect(value, children)}
    >
      {children}
    </div>
  );
} 