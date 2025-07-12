import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F4F4F6] overflow-x-hidden">
      <div className="min-h-screen pt-16 lg:pt-20 pb-8">
        {children}
      </div>
    </div>
  );
} 