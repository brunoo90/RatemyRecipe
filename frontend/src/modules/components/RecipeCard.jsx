import React from 'react';

const RecipeCard = ({ 
  recipe, 
  onView, 
  onFavorite, 
  onEdit, 
  onDelete, 
  isFavorite = false,
  showActions = true,
  index = 0 
}) => {
  return (
    <div 
      className="card overflow-hidden animate-fade-in-up group"
      style={{animationDelay: `${index * 0.1}s`}}
    >
      <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center relative overflow-hidden">
        <span className="text-6xl animate-float">🍽️</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {showActions && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => onFavorite && onFavorite(recipe.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            {recipe.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
          {recipe.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{recipe.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
            <span>⏱️</span>
            <span className="font-semibold">{recipe.cookTime} Min</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
            <span>👥</span>
            <span className="font-semibold">{recipe.servings}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xl ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
          <span className="text-sm ml-2 font-semibold text-gray-600">{recipe.rating}/5</span>
        </div>

        {showActions && (
          <div className="flex gap-3">
            {onView && (
              <button
                onClick={() => onView(recipe)}
                className="btn-primary flex-1"
              >
                👁️ Ansehen
              </button>
            )}
            
            {onEdit && (
              <button
                onClick={() => onEdit(recipe)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                ✏️ Bearbeiten
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={() => onDelete(recipe.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                🗑️ Löschen
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard; 