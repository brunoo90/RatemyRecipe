import React, { useState, useRef, useEffect } from 'react';

export function DropdownMenu({ children }) {
  return <div className="relative">{children}</div>;
}

export function DropdownMenuTrigger({ asChild, children, ...props }) {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <button {...props}>{children}</button>;
}

export function DropdownMenuContent({ align = "center", className = "", children }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseClasses = "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg";
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
    end: "right-0"
  };

  return (
    <div className={`${baseClasses} ${alignClasses[align]} ${className}`} ref={contentRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { onToggle: () => setIsOpen(!isOpen) });
        }
        return child;
      })}
    </div>
  );
}

export function DropdownMenuItem({ className = "", children, ...props }) {
  const baseClasses = "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 disabled:pointer-events-none disabled:opacity-50";
  
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = "" }) {
  const baseClasses = "mx-1 my-1 h-px bg-gray-200";
  
  return <div className={`${baseClasses} ${className}`} />;
} 