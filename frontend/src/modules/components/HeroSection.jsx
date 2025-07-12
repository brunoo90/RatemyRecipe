import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ 
  title = "Willkommen bei RateMyRecipe",
  subtitle = "Entdecke köstliche Rezepte und teile deine kulinarischen Kreationen",
  stats = [],
  showStats = true,
  primaryAction = { text: "Rezepte entdecken", link: "/" },
  secondaryAction = { text: "Mehr erfahren", link: "/categories" }
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-red-200/20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-300/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text animate-float">
            🍳 {title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to={primaryAction.link}>
              <button className="btn-primary text-lg px-8 py-4 transform hover:scale-105">
                {primaryAction.text}
              </button>
            </Link>
            <Link to={secondaryAction.link}>
              <button className="btn-secondary text-lg px-8 py-4 transform hover:scale-105">
                {secondaryAction.text}
              </button>
            </Link>
          </div>

          {/* Stats */}
          {showStats && stats.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full animate-pulse-slow">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="font-semibold">{stat.value}</span>
                  <span className="text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          <div className="flex justify-center">
            <div className="animate-bounce-slow">
              <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 