import React from 'react';

export function Checkbox({ checked, onCheckedChange, className = "", ...props }) {
  const baseClasses = "h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
} 