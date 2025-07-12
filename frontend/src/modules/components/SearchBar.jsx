import React, { useState } from 'react';

const SearchBar = ({ 
  placeholder = "Suchen...", 
  onSearch, 
  className = "",
  showFilters = false,
  filters = [],
  selectedFilter = "",
  onFilterChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchTerm);
  };

  return (
    <div className={`card ${className}`}>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`input-modern w-full text-lg pl-14 transition-all duration-300 ${
              isFocused ? 'scale-105 shadow-lg' : ''
            }`}
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl animate-pulse-slow">🔍</span>
          
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ✕
            </button>
          )}
        </div>

        {showFilters && filters.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => onFilterChange && onFilterChange(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                {filter.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-primary text-lg px-8 py-3 transform hover:scale-105"
          >
            🔍 Suchen
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 