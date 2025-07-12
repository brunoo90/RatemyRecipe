import React from 'react';
import { ArrowLeft, Clock, Users, Star, ChefHat, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Recipe({ recipe }) {
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black">Lade Rezept...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-black hover:text-[#6C63FF] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Zurück
          </button>
        </div>

        {/* Recipe Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-64 md:h-80 bg-gray-200 flex items-center justify-center">
            <ChefHat className="h-16 w-16 text-gray-400" />
            <div className="absolute top-4 right-4 px-3 py-1 bg-white text-black text-sm font-medium rounded-full shadow-sm">
              {recipe.category || 'Hauptgericht'}
            </div>
          </div>

          {/* Recipe Info */}
          <div className="p-6">
            {/* Title and Rating */}
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-black">{recipe.title}</h1>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(recipe.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-black ml-2 font-medium">
                {recipe.rating || 4.0}
              </span>
            </div>

            {/* Description */}
            <p className="text-black mb-6 leading-relaxed">
              {recipe.description || 'Ein köstliches Rezept für jeden Anlass.'}
            </p>

            {/* Recipe Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#6C63FF] mb-1">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-black">{recipe.cookTime || 30} Min</div>
                <div className="text-xs text-black">Kochzeit</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#A16AE8] mb-1">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-black">{recipe.servings || 4}</div>
                <div className="text-xs text-black">Portionen</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#6C63FF] mb-1">
                  <ChefHat className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-black">{recipe.difficulty || 'Mittel'}</div>
                <div className="text-xs text-black">Schwierigkeit</div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-black mb-4">Zutaten</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {(recipe.ingredients || []).map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#6C63FF] rounded-full"></div>
                      <span className="text-black">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Zubereitung</h3>
              <div className="space-y-4">
                {(recipe.instructions || []).map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#6C63FF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-black leading-relaxed pt-1">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 