import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Hauptgericht',
    cookTime: '',
    servings: '',
    difficulty: 'Mittel',
    ingredients: '',
    instructions: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Hauptgericht', 'Vorspeise', 'Dessert'];
  const difficulties = ['Einfach', 'Mittel', 'Schwer'];

  const validate = () => {
    if (!formData.title.trim()) return 'Titel ist ein Pflichtfeld.';
    if (!formData.description.trim()) return 'Beschreibung ist ein Pflichtfeld.';
    if (!formData.ingredients.trim()) return 'Mindestens eine Zutat angeben.';
    if (!formData.instructions.trim()) return 'Zubereitung ist ein Pflichtfeld.';
    if (!formData.cookTime) return 'Kochzeit ist ein Pflichtfeld.';
    if (!formData.servings) return 'Portionen ist ein Pflichtfeld.';
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      try {
        console.log('Neues Rezept:', formData);
        alert('Rezept wurde erfolgreich erstellt!');
        
        setFormData({
          title: '',
          description: '',
          category: 'Hauptgericht',
          cookTime: '',
          servings: '',
          difficulty: 'Mittel',
          ingredients: '',
          instructions: ''
        });
        
        navigate('/');
      } catch (error) {
        setError('Fehler beim Erstellen des Rezepts. Bitte prüfe deine Eingaben.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-6">
              Neues Rezept erstellen
            </h1>
            <p className="text-lg lg:text-xl text-black max-w-2xl mx-auto leading-relaxed mb-8">
              Teile deine kulinarischen Kreationen mit der Community
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">🍽️</span>
                <span className="font-medium text-black">Neues Rezept</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">⭐</span>
                <span className="font-medium text-black">Community</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-lg">👥</span>
                <span className="font-medium text-black">Teilen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-base flex items-center space-x-3">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-black mb-3">
                🍽️ Titel *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                placeholder="z.B. Spaghetti Carbonara"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-semibold text-black mb-3">
                📝 Beschreibung *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                placeholder="Kurze Beschreibung des Rezepts..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-lg font-semibold text-black mb-3">
                  📂 Kategorie
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-lg font-semibold text-black mb-3">
                  📊 Schwierigkeit
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cookTime" className="block text-lg font-semibold text-black mb-3">
                  ⏱️ Kochzeit (Minuten) *
                </label>
                <input
                  type="number"
                  id="cookTime"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                  placeholder="30"
                />
              </div>

              <div>
                <label htmlFor="servings" className="block text-lg font-semibold text-black mb-3">
                  👥 Portionen *
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                  placeholder="4"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-lg font-semibold text-black mb-3">
                🥘 Zutaten * (eine pro Zeile)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                placeholder="400g Spaghetti&#10;200g Pancetta&#10;4 Eigelb&#10;100g Parmesan&#10;Schwarzer Pfeffer&#10;Salz"
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-lg font-semibold text-black mb-3">
                👨‍🍳 Zubereitung * (eine Schritt pro Zeile)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                required
                rows={8}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-all duration-300 text-lg"
                placeholder="Spaghetti in Salzwasser kochen&#10;Pancetta in der Pfanne anbraten&#10;Eigelb mit Parmesan vermengen&#10;Pasta mit Pancetta mischen&#10;Ei-Käse-Mischung unterrühren"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#6C63FF] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5A52E0] disabled:opacity-50 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Wird erstellt...</span>
                  </div>
                ) : (
                  'Rezept erstellen'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
