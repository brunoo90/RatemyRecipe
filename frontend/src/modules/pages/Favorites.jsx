import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '../../services/recipes';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const favoriteRecipes = recipes.filter(recipe => savedFavorites.includes(recipe.id));
      setFavorites(favoriteRecipes);
      setLoading(false);
    }, 500);
  }, []);

  const handleToggleFavorite = (recipeId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = savedFavorites.includes(recipeId)
      ? savedFavorites.filter(id => id !== recipeId)
      : [...savedFavorites, recipeId];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#555]">Lade deine Favoriten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-6">
              Deine Favoriten
            </h1>
            <p className="text-lg lg:text-xl text-black max-w-2xl mx-auto leading-relaxed mb-8">
              Deine gesammelten Lieblingsrezepte
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">❤️</span>
                <span className="font-medium text-black">{favorites.length} Favoriten</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">⭐</span>
                <span className="font-medium text-black">4.8/5 Bewertung</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">👥</span>
                <span className="font-medium text-black">1.2k Nutzer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-black mb-4">Keine Favoriten gefunden</h3>
            <p className="text-lg text-black mb-8">Du hast noch keine Rezepte zu deinen Favoriten hinzugefügt.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#6C63FF] text-white text-lg px-8 py-3 rounded-lg font-medium hover:bg-[#5A52E0] transition-colors duration-300"
            >
              🍽️ Rezepte entdecken
            </button>
          </div>
        ) : (
          <>
            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#6C63FF] rounded-lg flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      {favorites.length} {favorites.length === 1 ? 'Favorit' : 'Favoriten'}
                    </h2>
                    <p className="text-black">Deine gesammelten Lieblingsrezepte</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe Grid - Max 3 per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group h-full flex flex-col"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <span className="text-6xl">🍽️</span>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleFavorite(recipe.id)}
                        className="w-10 h-10 bg-[#6C63FF] text-white rounded-lg flex items-center justify-center text-lg transition-all duration-300 hover:bg-[#5A52E0] shadow-md"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 text-black group-hover:text-[#6C63FF] transition-colors duration-300">
                      {recipe.title}
                    </h3>
                    <p className="text-black mb-4 line-clamp-2 leading-relaxed flex-1">{recipe.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded">
                        <span>⏱️</span>
                        <span className="font-medium text-sm text-black">{recipe.cookTime} Min</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded">
                        <span>👥</span>
                        <span className="font-medium text-sm text-black">{recipe.servings}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                      <span className="text-sm ml-2 font-medium text-black">{recipe.rating}/5</span>
                    </div>

                    <button
                      onClick={() => navigate('/')}
                      className="w-full bg-[#6C63FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5A52E0] transition-colors duration-300 mt-auto"
                    >
                      Rezept ansehen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 