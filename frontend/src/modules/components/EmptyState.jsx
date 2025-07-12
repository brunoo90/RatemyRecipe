import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon = "🍽️", 
  title = "Keine Daten gefunden", 
  message = "Es sind noch keine Daten verfügbar.", 
  actionText = "Erste Schritte",
  actionLink = "/",
  showAction = true 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-4">
      <div className="card max-w-md w-full text-center animate-fade-in-up">
        <div className="text-8xl mb-6 animate-float">{icon}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">{message}</p>
        
        {showAction && (
          <Link to={actionLink}>
            <button className="btn-primary text-lg px-8 py-4">
              {actionText}
            </button>
          </Link>
        )}
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse-slow"></div>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse-slow" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse-slow" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState; 