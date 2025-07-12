import React from 'react';

export function Card({ className = "", ...props }) {
  const baseClasses = "rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm";
  
  return (
    <div
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  const baseClasses = "flex flex-col space-y-1.5 p-6";
  
  return (
    <div
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }) {
  const baseClasses = "text-2xl font-semibold leading-none tracking-tight";
  
  return (
    <h3
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }) {
  const baseClasses = "text-sm text-gray-500";
  
  return (
    <p
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  const baseClasses = "p-6 pt-0";
  
  return (
    <div
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export function CardFooter({ className = "", ...props }) {
  const baseClasses = "flex items-center p-6 pt-0";
  
  return (
    <div
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
} 