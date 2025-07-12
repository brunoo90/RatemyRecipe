import React from 'react';

export function Label({ className = "", ...props }) {
  const baseClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
  
  return (
    <label
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
} 