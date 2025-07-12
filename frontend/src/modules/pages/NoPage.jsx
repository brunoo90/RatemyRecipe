import React from 'react';
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-6">🍳</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-4 text-black">Seite nicht gefunden</h2>
          <p className="text-black mb-8 text-lg">
            Oops! Die Seite, die du suchst, existiert nicht oder wurde verschoben.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-gradient-to-r from-[#6C63FF] to-[#A16AE8] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#5A52E0] hover:to-[#8B5CF6] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🏠 Zur Startseite
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="block w-full border-2 border-gray-200 text-black px-6 py-3 rounded-xl font-semibold hover:border-[#6C63FF] hover:bg-gray-50 transition-all duration-200"
            >
              ← Zurück
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-black">
              Brauchst du Hilfe? Entdecke unsere Rezept-Kategorien!
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link
                to="/categories"
                className="text-[#6C63FF] hover:text-[#5A52E0] font-medium transition-colors duration-200"
              >
                📂 Kategorien
              </Link>
              <Link
                to="/create"
                className="text-[#6C63FF] hover:text-[#5A52E0] font-medium transition-colors duration-200"
              >
                ➕ Erstellen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 