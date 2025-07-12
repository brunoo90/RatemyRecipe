import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-4">
      <div className="card max-w-md w-full text-center animate-fade-in-up">
        <div className="text-6xl mb-6 animate-bounce-slow">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Etwas ist schiefgelaufen</h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">{message}</p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn-primary mb-4"
          >
            🔄 Erneut versuchen
          </button>
        )}
        
        <button 
          onClick={() => window.location.reload()}
          className="btn-secondary"
        >
          🏠 Zur Startseite
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage; 