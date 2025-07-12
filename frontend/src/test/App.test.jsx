import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

// Mock für localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

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

test('App rendert ohne Fehler', () => {
  render(<App />);
  // Prüfe ob das Logo "RateMyRecipe" in der Navigation angezeigt wird
  const logoElements = screen.getAllByText(/RateMyRecipe/i);
  expect(logoElements.length).toBeGreaterThanOrEqual(1);
});

test('App zeigt Navigation an', () => {
  render(<App />);
  // Prüfe ob Anmelden-Link in der Navigation vorhanden ist
  const anmeldenElements = screen.getAllByText(/Anmelden/i);
  expect(anmeldenElements.length).toBeGreaterThanOrEqual(1);
});

test('App zeigt Registrieren-Button an', () => {
  render(<App />);
  // Prüfe ob Registrieren-Button vorhanden ist
  expect(screen.getByText(/Registrieren/i)).toBeInTheDocument();
}); 