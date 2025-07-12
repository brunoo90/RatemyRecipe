import React from 'react';

export function Avatar({ className = "", children }) {
  const baseClasses = "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ className = "", src, alt, ...props }) {
  const baseClasses = "aspect-square h-full w-full";
  
  return (
    <img
      className={`${baseClasses} ${className}`}
      src={src}
      alt={alt}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", children }) {
  const baseClasses = "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
} 