import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function Tabs({ value, onValueChange, className = "", children }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children }) {
  const baseClasses = "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = "", children, ...props }) {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = selectedValue === value;
  
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const selectedClasses = isSelected ? "bg-white text-gray-900 shadow-sm" : "hover:text-gray-900";
  
  const classes = `${baseClasses} ${selectedClasses} ${className}`;
  
  return (
    <button
      className={classes}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
} 