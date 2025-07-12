import React from 'react';

const LoadingSpinner = ({ message = "Lade..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="text-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 border-4 border-orange-200 rounded-full animate-spin"></div>
          
          {/* Inner ring */}
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-orange-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          
          {/* Center icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse-slow">
            <span className="text-2xl">🍳</span>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold gradient-text mb-2">{message}</h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce-slow"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce-slow" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce-slow" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 