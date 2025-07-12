import React, { useState, useEffect } from 'react';

const SuccessMessage = ({ 
  message = "Erfolgreich!", 
  onClose, 
  autoClose = true, 
  duration = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose && onClose(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="card max-w-md w-full text-center bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="text-4xl mb-4 animate-bounce-slow">✅</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{message}</h3>
        <p className="text-gray-600 mb-4">Alles hat geklappt!</p>
        
        {!autoClose && onClose && (
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(), 300);
            }}
            className="btn-secondary text-sm"
          >
            Schließen
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage; 