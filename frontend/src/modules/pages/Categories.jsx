import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '../../services/recipes';

export default function Categories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { name: 'Alle', icon: '🍽️', count: recipes.length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Hauptgericht', icon: '🥘', count: recipes.filter(r => r.category === 'Hauptgericht').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Frühstück', icon: '🥐', count: recipes.filter(r => r.category === 'Frühstück').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Dessert', icon: '🍰', count: recipes.filter(r => r.category === 'Dessert').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Vegetarisch', icon: '🥗', count: recipes.filter(r => r.category === 'Vegetarisch').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Vegan', icon: '🌱', count: recipes.filter(r => r.category === 'Vegan').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Fisch', icon: '🐟', count: recipes.filter(r => r.category === 'Fisch').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Salat', icon: '🥬', count: recipes.filter(r => r.category === 'Salat').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
    { name: 'Suppe', icon: '🍲', count: recipes.filter(r => r.category === 'Suppe').length, color: 'from-[#6C63FF] to-[#A16AE8]' },
  ];

  const filteredRecipes = selectedCategory === 'Alle' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const handleToggleFavorite = (recipeId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = savedFavorites.includes(recipeId)
      ? savedFavorites.filter(id => id !== recipeId)
      : [...savedFavorites, recipeId];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const isFavorite = (recipeId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return savedFavorites.includes(recipeId);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-6">
              Rezept-Kategorien
            </h1>
            <p className="text-lg lg:text-xl text-black max-w-2xl mx-auto leading-relaxed mb-8">
              Entdecke Rezepte nach deinen Vorlieben
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">📂</span>
                <span className="font-medium text-black">{categories.length} Kategorien</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">🍽️</span>
                <span className="font-medium text-black">{recipes.length} Rezepte</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">⭐</span>
                <span className="font-medium text-black">4.8/5 Bewertung</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-black">Wähle eine Kategorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-6 border-2 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name
                    ? `border-[#6C63FF] bg-gradient-to-br ${category.color} text-white shadow-lg`
                    : 'border-gray-200 bg-white hover:border-[#6C63FF] hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <div className="font-bold text-sm mb-2">{category.name}</div>
                <div className={`text-xs ${selectedCategory === category.name ? 'text-white/80' : 'text-black'}`}>
                  {category.count} Rezepte
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">
            {selectedCategory} 
            <span className="text-[#6C63FF] ml-2">({filteredRecipes.length} Rezepte)</span>
          </h2>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-black mb-4">Keine Rezepte gefunden</h3>
            <p className="text-lg text-black mb-8">
              In der Kategorie "{selectedCategory}" sind noch keine Rezepte verfügbar.
            </p>
            <button
              onClick={() => navigate('/create')}
              className="bg-[#6C63FF] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5A52E0] transition-colors duration-300"
            >
              ➕ Rezept erstellen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group h-full flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <span className="text-6xl">🍽️</span>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleToggleFavorite(recipe.id)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${
                        isFavorite(recipe.id) 
                          ? 'bg-[#6C63FF] text-white shadow-md' 
                          : 'bg-white/90 text-gray-600 hover:bg-[#6C63FF] hover:text-white'
                      }`}
                    >
                      {isFavorite(recipe.id) ? '❤️' : '🤍'}
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
        )}
      </div>
    </div>
  );
} 