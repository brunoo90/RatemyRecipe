import React, { useState, useEffect } from 'react';
import { recipeService, favoriteService } from '../../services/api';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('alle');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['alle', 'Hauptgericht', 'Vorspeise', 'Dessert'];

  useEffect(() => {
    loadRecipes();
    loadFavorites();
    
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      console.error('Fehler beim Laden der Rezepte:', err);
      setError('Fehler beim Laden der Rezepte');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await favoriteService.getUserFavorites();
        setFavorites(data.map(fav => fav.recipeId));
      }
    } catch (err) {
      console.error('Fehler beim Laden der Favoriten:', err);
    }
  };

  const toggleFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bitte melden Sie sich an, um Favoriten zu verwalten');
        return;
      }

      if (favorites.includes(recipeId)) {
        await favoriteService.removeFromFavorites(recipeId);
        setFavorites(favorites.filter(id => id !== recipeId));
      } else {
        await favoriteService.addToFavorites(recipeId);
        setFavorites([...favorites, recipeId]);
      }
    } catch (err) {
      console.error('Fehler beim Aktualisieren der Favoriten:', err);
      alert('Fehler beim Aktualisieren der Favoriten');
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'alle' || recipe.category === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || favorites.includes(recipe.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Lade Rezepte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={loadRecipes}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <button 
            onClick={() => setSelectedRecipe(null)}
            className="mb-6 sm:mb-8 flex items-center space-x-2 sm:space-x-3 text-slate-600 hover:text-purple-600 transition-colors duration-300 animate-slide-in-left"
          >
            <span className="text-2xl sm:text-3xl">←</span>
            <span className="text-lg sm:text-xl font-semibold">Zurück zu den Rezepten</span>
          </button>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 animate-fade-in-up">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 via-purple-700 to-indigo-700 bg-clip-text text-transparent">{selectedRecipe.title}</h1>
              <p className="text-slate-600 mb-6 sm:mb-8 text-lg sm:text-xl lg:text-2xl leading-relaxed">{selectedRecipe.description}</p>
              
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-slate-100 to-slate-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl animate-pulse-slow">
                  <span className="text-lg sm:text-2xl">⏱️</span>
                  <span className="font-semibold text-sm sm:text-lg">{selectedRecipe.cookTime} Min</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-purple-100 to-purple-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl animate-pulse-slow">
                  <span className="text-lg sm:text-2xl">👥</span>
                  <span className="font-semibold text-sm sm:text-lg">{selectedRecipe.servings} Portionen</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-indigo-100 to-indigo-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl animate-pulse-slow">
                  <span className="text-lg sm:text-2xl">📊</span>
                  <span className="font-semibold text-sm sm:text-lg">{selectedRecipe.difficulty}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-1 sm:gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl sm:text-3xl ${i < Math.floor(selectedRecipe.rating) ? 'text-yellow-400 animate-bounce-slow' : 'text-slate-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg sm:text-2xl font-semibold text-slate-700">{selectedRecipe.rating}/5</span>
              </div>

              <button
                onClick={() => toggleFavorite(selectedRecipe.id)}
                className={`px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-lg sm:text-xl transition-all duration-300 ${
                  favorites.includes(selectedRecipe.id) 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl hover:shadow-2xl' 
                    : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-purple-100 hover:to-indigo-100'
                }`}
              >
                {favorites.includes(selectedRecipe.id) ? '❤️ Favorit entfernen' : '🤍 Zu Favoriten hinzufügen'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 animate-slide-in-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-slate-800 flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl">🥘</span>
                  Zutaten
                </h2>
                <ul className="space-y-3 sm:space-y-4">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-3 sm:space-x-4 text-slate-700 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                      <span className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-pulse-slow"></span>
                      <span className="text-base sm:text-lg lg:text-xl">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-slate-800 flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl">👨‍🍳</span>
                  Zubereitung
                </h2>
                <ol className="space-y-4 sm:space-y-6">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex space-x-4 sm:space-x-6 text-slate-700 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                      <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-lg lg:text-xl font-bold animate-float">
                        {index + 1}
                      </span>
                      <span className="text-base sm:text-lg lg:text-xl leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Centered */}
      <div className="bg-white border-b border-gray-200 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-6">
              Find or Create Your Recipe
            </h1>
            <p className="text-lg lg:text-xl text-black max-w-2xl mx-auto leading-relaxed mb-8">
              Teile deine kulinarischen Kreationen mit der Welt und finde neue Inspiration für deine Küche
            </p>
            
            {/* Centered Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rezepte suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-lg pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">📚</span>
                <span className="font-medium text-black">{recipes.length} Rezepte</span>
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

      {/* Filters Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto text-base px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'alle' ? 'Alle Kategorien' : category}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 border-gray-200">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-5 h-5 text-[#6C63FF] border-gray-300 rounded focus:ring-[#6C63FF]"
              />
              <span className="text-black font-medium">Nur Favoriten anzeigen</span>
            </label>
          </div>
        </div>

        {/* Recipe Grid - Max 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group h-full flex flex-col"
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <span className="text-6xl">🍽️</span>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${
                      favorites.includes(recipe.id) 
                        ? 'bg-[#6C63FF] text-white shadow-md' 
                        : 'bg-white/90 text-gray-600 hover:bg-[#6C63FF] hover:text-white'
                    }`}
                  >
                    {favorites.includes(recipe.id) ? '❤️' : '🤍'}
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
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full bg-[#6C63FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5A52E0] transition-colors duration-300 mt-auto"
                >
                  Rezept ansehen
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-black mb-4">Keine Rezepte gefunden</h3>
            <p className="text-lg text-black mb-8">Versuche andere Suchbegriffe oder Filter</p>
            <button className="bg-[#6C63FF] text-white text-lg px-8 py-3 rounded-lg font-medium hover:bg-[#5A52E0] transition-colors duration-300">
              Neue Suche starten
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 