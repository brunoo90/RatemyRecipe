import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from '../modules/recipes/RecipeCard';

/**
 * Unit-Tests für die RecipeCard-Komponente
 * 
 * Diese Tests überprüfen das Rendering und die Interaktionen
 * der RecipeCard-Komponente, einschließlich Favoriten-Funktionalität
 * und Navigation.
 * 
 * @author Bruno
 * @version 1.0
 */
describe('RecipeCard', () => {
  // Mock-Daten für Tests
  const mockRecipe = {
    id: 1,
    title: 'Test Rezept',
    description: 'Ein leckeres Test-Rezept für Unit-Tests',
    cookTime: 30,
    servings: 4,
    difficulty: 'MITTEL',
    category: 'HAUPTGERICHT',
    rating: 4.5,
    ratingCount: 12,
    user: {
      id: 1,
      firstName: 'Test',
      lastName: 'User'
    }
  };

  const mockUser = {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  };

  // Mock-Funktionen
  const mockOnFavoriteToggle = vi.fn();
  const mockOnRatingChange = vi.fn();

  // Wrapper-Komponente für Router-Kontext
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test: RecipeCard rendert korrekt
   * Überprüft, ob alle wichtigen Elemente der RecipeCard angezeigt werden
   */
  it('renders recipe information correctly', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    // Überprüfe, ob alle wichtigen Informationen angezeigt werden
    expect(screen.getByText('Test Rezept')).toBeInTheDocument();
    expect(screen.getByText('Ein leckeres Test-Rezept für Unit-Tests')).toBeInTheDocument();
    expect(screen.getByText('30 Min')).toBeInTheDocument();
    expect(screen.getByText('4 Portionen')).toBeInTheDocument();
    expect(screen.getByText('MITTEL')).toBeInTheDocument();
    expect(screen.getByText('HAUPTGERICHT')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(12 Bewertungen)')).toBeInTheDocument();
  });

  /**
   * Test: Favoriten-Button funktioniert korrekt
   * Überprüft, ob der Favoriten-Button korrekt funktioniert
   */
  it('handles favorite toggle correctly', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
        isFavorite={false}
      />
    );

    // Finde und klicke den Favoriten-Button
    const favoriteButton = screen.getByRole('button', { name: /favorit/i });
    fireEvent.click(favoriteButton);

    // Überprüfe, ob die Callback-Funktion aufgerufen wurde
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith(mockRecipe.id);
    expect(mockOnFavoriteToggle).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Favoriten-Button zeigt korrekten Zustand
   * Überprüft, ob der Favoriten-Button den korrekten visuellen Zustand zeigt
   */
  it('shows correct favorite state', () => {
    // Test für nicht-favorisiertes Rezept
    const { rerender } = renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
        isFavorite={false}
      />
    );

    // Überprüfe, ob der Button als "nicht favorisiert" angezeigt wird
    const favoriteButton = screen.getByRole('button', { name: /favorit/i });
    expect(favoriteButton).toHaveClass('text-gray-400');

    // Test für favorisiertes Rezept
    rerender(
      <BrowserRouter>
        <RecipeCard 
          recipe={mockRecipe}
          user={mockUser}
          onFavoriteToggle={mockOnFavoriteToggle}
          onRatingChange={mockOnRatingChange}
          isFavorite={true}
        />
      </BrowserRouter>
    );

    // Überprüfe, ob der Button als "favorisiert" angezeigt wird
    expect(favoriteButton).toHaveClass('text-red-500');
  });

  /**
   * Test: Navigation zu Rezept-Details
   * Überprüft, ob die Navigation zu den Rezept-Details funktioniert
   */
  it('navigates to recipe details when clicked', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    // Finde und klicke auf die Rezeptkarte
    const recipeCard = screen.getByRole('link', { name: /test rezept/i });
    expect(recipeCard).toHaveAttribute('href', '/recipe/1');
  });

  /**
   * Test: Bewertungssystem funktioniert
   * Überprüft, ob das Sterne-Bewertungssystem korrekt funktioniert
   */
  it('displays rating correctly', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    // Überprüfe, ob die Bewertung angezeigt wird
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(12 Bewertungen)')).toBeInTheDocument();
  });

  /**
   * Test: Benutzer-Bewertung ändern
   * Überprüft, ob Benutzer ihre Bewertung ändern können
   */
  it('allows user to change rating', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
        userRating={3}
      />
    );

    // Finde und klicke auf einen Stern (5. Stern)
    const stars = screen.getAllByTestId('star');
    fireEvent.click(stars[4]); // 5. Stern

    // Überprüfe, ob die Callback-Funktion aufgerufen wurde
    expect(mockOnRatingChange).toHaveBeenCalledWith(mockRecipe.id, 5);
  });

  /**
   * Test: Rezept ohne Bewertung
   * Überprüft, ob Rezepte ohne Bewertung korrekt angezeigt werden
   */
  it('handles recipe without rating', () => {
    const recipeWithoutRating = {
      ...mockRecipe,
      rating: null,
      ratingCount: 0
    };

    renderWithRouter(
      <RecipeCard 
        recipe={recipeWithoutRating}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    // Überprüfe, ob "Keine Bewertung" angezeigt wird
    expect(screen.getByText('Keine Bewertung')).toBeInTheDocument();
  });

  /**
   * Test: Rezept ohne Benutzer
   * Überprüft, ob Rezepte ohne Benutzer-Information korrekt angezeigt werden
   */
  it('handles recipe without user information', () => {
    const recipeWithoutUser = {
      ...mockRecipe,
      user: null
    };

    renderWithRouter(
      <RecipeCard 
        recipe={recipeWithoutUser}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    // Überprüfe, ob "Unbekannter Autor" angezeigt wird
    expect(screen.getByText('Unbekannter Autor')).toBeInTheDocument();
  });

  /**
   * Test: Responsive Design
   * Überprüft, ob die Komponente responsive CSS-Klassen hat
   */
  it('has responsive design classes', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    const recipeCard = screen.getByTestId('recipe-card');
    expect(recipeCard).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
  });

  /**
   * Test: Accessibility
   * Überprüft, ob die Komponente accessibility-Features hat
   */
  it('has proper accessibility attributes', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    // Überprüfe, ob der Favoriten-Button einen aria-label hat
    const favoriteButton = screen.getByRole('button', { name: /favorit/i });
    expect(favoriteButton).toHaveAttribute('aria-label');

    // Überprüfe, ob die Sterne-Bewertung accessibility-Features hat
    const stars = screen.getAllByTestId('star');
    stars.forEach((star, index) => {
      expect(star).toHaveAttribute('aria-label');
    });
  });

  /**
   * Test: Performance bei vielen Rezepten
   * Überprüft, ob die Komponente auch bei vielen Rezepten performant bleibt
   */
  it('renders efficiently with many recipes', () => {
    const startTime = performance.now();

    // Rendere 100 RecipeCards
    for (let i = 0; i < 100; i++) {
      const recipeWithId = { ...mockRecipe, id: i };
      renderWithRouter(
        <RecipeCard 
          recipe={recipeWithId}
          user={mockUser}
          onFavoriteToggle={mockOnFavoriteToggle}
          onRatingChange={mockOnRatingChange}
        />
      );
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Performance-Check: 100 Karten sollten unter 1 Sekunde gerendert werden
    expect(duration).toBeLessThan(1000);
  });

  /**
   * Test: Error-Handling
   * Überprüft, ob die Komponente Fehler korrekt behandelt
   */
  it('handles missing recipe data gracefully', () => {
    const incompleteRecipe = {
      id: 1,
      title: 'Test Rezept'
      // Fehlende Felder
    };

    // Sollte keinen Fehler werfen
    expect(() => {
      renderWithRouter(
        <RecipeCard 
          recipe={incompleteRecipe}
          user={mockUser}
          onFavoriteToggle={mockOnFavoriteToggle}
          onRatingChange={mockOnRatingChange}
        />
      );
    }).not.toThrow();
  });

  /**
   * Test: Event-Propagation
   * Überprüft, ob Events korrekt weitergegeben werden
   */
  it('prevents event propagation on favorite button click', () => {
    renderWithRouter(
      <RecipeCard 
        recipe={mockRecipe}
        user={mockUser}
        onFavoriteToggle={mockOnFavoriteToggle}
        onRatingChange={mockOnRatingChange}
      />
    );

    const favoriteButton = screen.getByRole('button', { name: /favorit/i });
    const mockEvent = {
      stopPropagation: vi.fn()
    };

    fireEvent.click(favoriteButton, mockEvent);

    // Überprüfe, ob stopPropagation aufgerufen wurde
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
}); 