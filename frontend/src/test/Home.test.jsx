import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Home from '../modules/pages/Home';

// Mock für die recipes-Service
vi.mock('../services/recipes', () => ({
  recipes: [
    {
      id: 1,
      title: "Pizza Margherita",
      description: "Leckere Pizza",
      category: "Hauptgericht",
      rating: 4.5,
      cookTime: 30,
      servings: 4,
      difficulty: "Mittel"
    }
  ]
}));

// Mock für localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

test('Home zeigt Suchleiste an', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  // Prüfe ob ein Input-Element vorhanden ist (Suchleiste)
  const searchInput = screen.getByRole('textbox');
  expect(searchInput).toBeInTheDocument();
});

test('Home zeigt Rezept-Karten an', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  // Prüfe ob der Rezepttitel angezeigt wird
  expect(screen.getByText(/Pizza Margherita/i)).toBeInTheDocument();
});

test('Home zeigt Kategorien-Filter an', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  // Prüfe ob Kategorien-Buttons vorhanden sind (mehrere Elemente möglich)
  const hauptgerichtElements = screen.getAllByText(/Hauptgericht/i);
  expect(hauptgerichtElements.length).toBeGreaterThanOrEqual(1);
}); 