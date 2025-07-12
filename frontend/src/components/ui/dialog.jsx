import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({ asChild, children, ...props }) {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <button {...props}>{children}</button>;
}

export function DialogContent({ className = "", children }) {
  const baseClasses = "relative bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}

export function DialogHeader({ className = "", children }) {
  const baseClasses = "flex flex-col space-y-1.5 text-center sm:text-left";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}

export function DialogTitle({ className = "", children }) {
  const baseClasses = "text-lg font-semibold leading-none tracking-tight";
  
  return (
    <h2 className={`${baseClasses} ${className}`}>
      {children}
    </h2>
  );
}

export function DialogDescription({ className = "", children }) {
  const baseClasses = "text-sm text-gray-500";
  
  return (
    <p className={`${baseClasses} ${className}`}>
      {children}
    </p>
  );
} 