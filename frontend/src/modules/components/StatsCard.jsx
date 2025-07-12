import React from 'react';

const StatsCard = ({ 
  icon, 
  title, 
  value, 
  subtitle = "", 
  color = "orange",
  animate = true,
  index = 0 
}) => {
  const colorClasses = {
    orange: "from-orange-500 to-red-500",
    blue: "from-slate-600 to-purple-600",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    yellow: "from-yellow-500 to-orange-500"
  };

  return (
    <div 
      className={`card text-center animate-fade-in-up ${animate ? '' : 'animate-none'}`}
      style={{animationDelay: `${index * 0.1}s`}}
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses[color]} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float`}>
        <span className="text-3xl">{icon}</span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <div className="text-4xl font-bold gradient-text mb-2">{value}</div>
      
      {subtitle && (
        <p className="text-gray-600 text-lg">{subtitle}</p>
      )}
      
      <div className="mt-4 flex justify-center space-x-1">
        <div className={`w-2 h-2 bg-gradient-to-r ${colorClasses[color]} rounded-full animate-pulse-slow`}></div>
        <div className={`w-2 h-2 bg-gradient-to-r ${colorClasses[color]} rounded-full animate-pulse-slow`} style={{animationDelay: '0.2s'}}></div>
        <div className={`w-2 h-2 bg-gradient-to-r ${colorClasses[color]} rounded-full animate-pulse-slow`} style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
};

export default StatsCard; 