import React from 'react';

const badgeVariants = {
  default: "bg-blue-500 text-white",
  secondary: "bg-gray-100 text-gray-900",
  outline: "border border-gray-300 bg-white text-gray-700",
  destructive: "bg-red-500 text-white"
};

export function Badge({ variant = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  
  const classes = `${baseClasses} ${badgeVariants[variant]} ${className}`;
  
  return (
    <div className={classes} {...props} />
  );
} 