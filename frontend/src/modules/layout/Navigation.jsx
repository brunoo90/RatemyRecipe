import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [username, setUsername] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername('');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/RatemyRecipe.png" 
                alt="RateMyRecipe Logo" 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg object-cover transform group-hover:scale-105 transition-all duration-300"
              />
              <span className="text-xl lg:text-2xl font-bold text-black group-hover:text-[#6C63FF] transition-colors duration-300">
                RateMyRecipe
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/categories" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/categories') 
                  ? 'bg-[#6C63FF] text-white shadow-md' 
                  : 'text-black hover:text-[#6C63FF] hover:bg-gray-50'
              }`}
            >
              📂 Kategorien
            </Link>
            <Link 
              to="/favorites" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/favorites') 
                  ? 'bg-[#6C63FF] text-white shadow-md' 
                  : 'text-black hover:text-[#6C63FF] hover:bg-gray-50'
              }`}
            >
              ❤️ Favoriten
            </Link>
            <Link 
              to="/create" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/create') 
                  ? 'bg-[#6C63FF] text-white shadow-md' 
                  : 'text-black hover:text-[#6C63FF] hover:bg-gray-50'
              }`}
            >
              ➕ Erstellen
            </Link>
          </div>

          {/* Right - User Menu */}
          <div className="flex items-center space-x-4">
            {username ? (
              <div className="hidden lg:flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <span className="text-sm">👤</span>
                  <span className="text-sm font-medium text-black">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-black hover:text-red-600 transition-colors duration-300"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm text-black hover:text-[#6C63FF] transition-colors duration-300 font-medium"
                >
                  Anmelden
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white text-sm px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-300"
                >
                  Registrieren
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-black hover:text-[#6C63FF] hover:bg-gray-50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile User Menu */}
            <div className="lg:hidden">
              {username ? (
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <span className="text-sm">👤</span>
                  <span className="text-sm font-medium text-black">{username}</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-black hover:text-[#6C63FF] transition-colors duration-300 font-medium"
                >
                  Anmelden
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/categories" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive('/categories') 
                    ? 'bg-[#6C63FF] text-white shadow-md' 
                    : 'text-black hover:text-[#6C63FF] hover:bg-gray-50'
                }`}
              >
                📂 Kategorien
              </Link>
              <Link 
                to="/favorites" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive('/favorites') 
                    ? 'bg-[#6C63FF] text-white shadow-md' 
                    : 'text-black hover:text-[#6C63FF] hover:bg-gray-50'
                }`}
              >
                ❤️ Favoriten
              </Link>
              <Link 
                to="/create" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive('/create') 
                    ? 'bg-[#6C63FF] text-white shadow-md' 
                    : 'text-black hover:text-[#6C63FF] hover:bg-gray-50'
                }`}
              >
                ➕ Erstellen
              </Link>
              {username && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-sm text-black hover:text-red-600 hover:bg-red-50 transition-all duration-300 text-left"
                >
                  Abmelden
                </button>
              )}
              {!username && (
                <div className="pt-2 border-t border-gray-200">
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white text-sm px-4 py-3 rounded-lg font-medium hover:shadow-md transition-all duration-300 block text-center"
                  >
                    Registrieren
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation; 