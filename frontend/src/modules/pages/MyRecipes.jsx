import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyRecipes() {
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const savedRecipes = JSON.parse(localStorage.getItem('myRecipes') || '[]');
      setMyRecipes(savedRecipes);
      setLoading(false);
    }, 500);
  }, []);

  const handleToggleFavorite = (recipeId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = savedFavorites.includes(recipeId)
      ? savedFavorites.filter(id => id !== recipeId)
      : [...savedFavorites, recipeId];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleEditRecipe = (recipe) => {
    console.log('Rezept bearbeiten:', recipe);
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Möchtest du dieses Rezept wirklich löschen?')) {
      const updatedRecipes = myRecipes.filter(recipe => recipe.id !== recipeId);
      setMyRecipes(updatedRecipes);
      localStorage.setItem('myRecipes', JSON.stringify(updatedRecipes));
    }
  };

  const isFavorite = (recipeId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return savedFavorites.includes(recipeId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-16 h-16 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-black">Lade deine Rezepte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#5A52E0] transition-colors duration-200 mb-4"
        >
          <span>←</span>
          <span>Zurück zur Startseite</span>
        </button>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] bg-clip-text text-transparent">
            Meine Rezepte
          </h1>
          <p className="text-xl text-black">Verwalte deine eigenen kulinarischen Kreationen</p>
        </div>
      </div>

      {myRecipes.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-4">👨‍🍳</div>
          <h2 className="text-2xl font-bold mb-4 text-black">Noch keine eigenen Rezepte</h2>
          <p className="text-black mb-6 text-lg">
            Du hast noch keine eigenen Rezepte erstellt.
          </p>
          <button
            onClick={() => navigate('/create')}
            className="bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white px-8 py-3 rounded-xl font-semibold hover:from-[#5A52E0] hover:to-[#8B5CF6] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            ➕ Erstes Rezept erstellen
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">
                    {myRecipes.length} {myRecipes.length === 1 ? 'Rezept' : 'Rezepte'}
                  </h2>
                  <p className="text-black">Deine eigenen kulinarischen Kreationen</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#5A52E0] hover:to-[#8B5CF6] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ➕ Neues Rezept
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <span className="text-6xl">🍽️</span>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">👨‍🍳</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-black group-hover:text-[#6C63FF] transition-colors duration-200">
                    {recipe.title}
                  </h3>
                  <p className="text-black text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-full">
                      <span>⏱️</span>
                      <span className="font-medium text-black">{recipe.cookTime} Min</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-full">
                      <span>👥</span>
                      <span className="font-medium text-black">{recipe.servings}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm ml-1 font-medium text-black">{recipe.rating}/5</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      onClick={() => navigate('/')}
                      className="bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white px-3 py-2 rounded-lg font-medium hover:from-[#5A52E0] hover:to-[#8B5CF6] transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                    >
                      👁️ Ansehen
                    </button>
                    <button
                      onClick={() => handleToggleFavorite(recipe.id)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                        isFavorite(recipe.id) 
                          ? 'bg-red-500 text-white hover:bg-red-600 shadow-md' 
                          : 'bg-gray-100 text-black hover:bg-gray-200'
                      }`}
                    >
                      {isFavorite(recipe.id) ? '❤️' : '🤍'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleEditRecipe(recipe)}
                      className="px-3 py-2 bg-[#6C63FF] text-white rounded-lg font-medium hover:bg-[#5A52E0] transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                    >
                      ✏️ Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                    >
                      🗑️ Löschen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
