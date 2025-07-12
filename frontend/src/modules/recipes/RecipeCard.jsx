import React from 'react';
import { Heart, Clock, Users, Star, ChefHat } from 'lucide-react';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onClick }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 group"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <ChefHat className="h-12 w-12 text-gray-400" />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
            }`}
          />
        </button>
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-white text-black text-xs font-medium rounded-full shadow-sm">
          {recipe.category || 'Hauptgericht'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(recipe.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-black ml-1 font-medium">
            {recipe.rating || 4.0}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 text-black line-clamp-1 group-hover:text-[#6C63FF] transition-colors">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-black text-sm mb-4 line-clamp-2 leading-relaxed">
          {recipe.description || 'Ein köstliches Rezept für jeden Anlass.'}
        </p>

        {/* Recipe Info */}
        <div className="flex items-center justify-between text-sm text-black">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-[#6C63FF]" />
            <span className="font-medium">{recipe.cookTime || 30} Min</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-[#A16AE8]" />
            <span className="font-medium">{recipe.servings || 4}</span>
          </div>
          
          <div className="px-2 py-1 bg-gray-100 text-black text-xs font-medium rounded-full">
            {recipe.difficulty || 'Mittel'}
          </div>
        </div>

        {/* Ingredients Preview */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-black mb-1">Zutaten:</p>
            <p className="text-xs text-black line-clamp-1">
              {recipe.ingredients.slice(0, 3).join(', ')}
              {recipe.ingredients.length > 3 && '...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
