package com.example.RateMyRecipe;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.RateMyRecipe.Model.Favorite;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.Services.FavoriteService;
import com.example.RateMyRecipe.repositories.FavoriteRepository;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

/**
 * Unit-Tests für den FavoriteService
 * 
 * Diese Tests überprüfen die Geschäftslogik für das Favoriten-System
 * und stellen sicher, dass alle Favoriten-Operationen korrekt funktionieren.
 * 
 * @author Bruno
 * @version 1.0
 */
@ExtendWith(MockitoExtension.class)
public class FavoriteServiceTest {

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private FavoriteService favoriteService;

    private User testUser;
    private Recipe testRecipe;
    private Favorite testFavorite;

    /**
     * Setup-Methode, die vor jedem Test ausgeführt wird
     * Initialisiert Test-Daten für alle Tests
     */
    @BeforeEach
    void setUp() {
        // Test-User erstellen
        testUser = new User();
        testUser.setId(1L);
        testUser.setFirstName("Test");
        testUser.setLastName("User");
        testUser.setEmail("test@example.com");

        // Test-Rezept erstellen
        testRecipe = new Recipe();
        testRecipe.setId(1L);
        testRecipe.setTitle("Test Rezept");
        testRecipe.setDescription("Ein Test-Rezept");
        testRecipe.setUser(testUser);

        // Test-Favorit erstellen
        testFavorite = new Favorite();
        testFavorite.setId(1L);
        testFavorite.setUser(testUser);
        testFavorite.setRecipe(testRecipe);
    }

    /**
     * Test: Favorit hinzufügen - Erfolgreicher Fall
     * Überprüft, ob ein Rezept korrekt zu den Favoriten hinzugefügt wird
     */
    @Test
    void testAddFavoriteSuccess() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.empty());
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(testFavorite);

        // When
        Favorite result = favoriteService.addFavorite(1L, 1L);

        // Then
        assertNotNull(result);
        assertEquals(testUser, result.getUser());
        assertEquals(testRecipe, result.getRecipe());
        verify(favoriteRepository).save(any(Favorite.class));
    }

    /**
     * Test: Favorit hinzufügen - Bereits vorhanden
     * Überprüft, ob ein bereits vorhandener Favorit korrekt behandelt wird
     */
    @Test
    void testAddFavoriteAlreadyExists() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.of(testFavorite));

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            favoriteService.addFavorite(1L, 1L);
        });

        verify(favoriteRepository, never()).save(any(Favorite.class));
    }

    /**
     * Test: Favorit hinzufügen - Benutzer nicht gefunden
     * Überprüft, ob ein Fehler geworfen wird, wenn der Benutzer nicht existiert
     */
    @Test
    void testAddFavoriteUserNotFound() {
        // Given
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            favoriteService.addFavorite(999L, 1L);
        });

        verify(favoriteRepository, never()).save(any(Favorite.class));
    }

    /**
     * Test: Favorit hinzufügen - Rezept nicht gefunden
     * Überprüft, ob ein Fehler geworfen wird, wenn das Rezept nicht existiert
     */
    @Test
    void testAddFavoriteRecipeNotFound() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(recipeRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            favoriteService.addFavorite(1L, 999L);
        });

        verify(favoriteRepository, never()).save(any(Favorite.class));
    }

    /**
     * Test: Favorit entfernen - Erfolgreicher Fall
     * Überprüft, ob ein Favorit korrekt entfernt wird
     */
    @Test
    void testRemoveFavoriteSuccess() {
        // Given
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.of(testFavorite));

        // When
        favoriteService.removeFavorite(1L, 1L);

        // Then
        verify(favoriteRepository).delete(testFavorite);
    }

    /**
     * Test: Favorit entfernen - Nicht vorhanden
     * Überprüft, ob ein Fehler geworfen wird, wenn der Favorit nicht existiert
     */
    @Test
    void testRemoveFavoriteNotFound() {
        // Given
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            favoriteService.removeFavorite(1L, 1L);
        });

        verify(favoriteRepository, never()).delete(any(Favorite.class));
    }

    /**
     * Test: Alle Favoriten eines Benutzers abrufen
     * Überprüft, ob alle Favoriten eines Benutzers korrekt zurückgegeben werden
     */
    @Test
    void testGetUserFavorites() {
        // Given
        List<Favorite> userFavorites = Arrays.asList(testFavorite);
        when(favoriteRepository.findByUserId(1L)).thenReturn(userFavorites);

        // When
        List<Favorite> result = favoriteService.getUserFavorites(1L);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testFavorite, result.get(0));
    }

    /**
     * Test: Leere Favoriten-Liste
     * Überprüft, ob eine leere Liste zurückgegeben wird, wenn keine Favoriten vorhanden sind
     */
    @Test
    void testGetUserFavoritesEmpty() {
        // Given
        when(favoriteRepository.findByUserId(1L)).thenReturn(Arrays.asList());

        // When
        List<Favorite> result = favoriteService.getUserFavorites(1L);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Test: Prüfen ob Rezept favorisiert ist
     * Überprüft, ob korrekt erkannt wird, ob ein Rezept favorisiert ist
     */
    @Test
    void testIsFavoriteTrue() {
        // Given
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.of(testFavorite));

        // When
        boolean result = favoriteService.isFavorite(1L, 1L);

        // Then
        assertTrue(result);
    }

    /**
     * Test: Prüfen ob Rezept nicht favorisiert ist
     * Überprüft, ob korrekt erkannt wird, wenn ein Rezept nicht favorisiert ist
     */
    @Test
    void testIsFavoriteFalse() {
        // Given
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.empty());

        // When
        boolean result = favoriteService.isFavorite(1L, 1L);

        // Then
        assertFalse(result);
    }

    /**
     * Test: Anzahl der Favoriten eines Rezepts
     * Überprüft, ob die korrekte Anzahl der Favoriten für ein Rezept zurückgegeben wird
     */
    @Test
    void testGetFavoriteCount() {
        // Given
        when(favoriteRepository.countByRecipeId(1L)).thenReturn(5L);

        // When
        long result = favoriteService.getFavoriteCount(1L);

        // Then
        assertEquals(5L, result);
    }

    /**
     * Test: Favoriten nach Datum sortiert abrufen
     * Überprüft, ob Favoriten korrekt nach Datum sortiert zurückgegeben werden
     */
    @Test
    void testGetUserFavoritesSortedByDate() {
        // Given
        Favorite olderFavorite = new Favorite();
        olderFavorite.setId(1L);
        olderFavorite.setUser(testUser);
        olderFavorite.setRecipe(testRecipe);

        Favorite newerFavorite = new Favorite();
        newerFavorite.setId(2L);
        newerFavorite.setUser(testUser);
        newerFavorite.setRecipe(testRecipe);

        List<Favorite> userFavorites = Arrays.asList(olderFavorite, newerFavorite);
        when(favoriteRepository.findByUserId(1L)).thenReturn(userFavorites);

        // When
        List<Favorite> result = favoriteService.getUserFavoritesSortedByDate(1L);

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(olderFavorite, result.get(0));
        assertEquals(newerFavorite, result.get(1));
    }

    /**
     * Test: Batch-Favoriten-Operationen
     * Überprüft, ob mehrere Favoriten-Operationen korrekt funktionieren
     */
    @Test
    void testBatchFavoriteOperations() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));
        when(recipeRepository.findById(2L)).thenReturn(Optional.of(testRecipe));
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.empty());
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 2L)).thenReturn(Optional.empty());
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(testFavorite);

        // When
        Favorite favorite1 = favoriteService.addFavorite(1L, 1L);
        Favorite favorite2 = favoriteService.addFavorite(1L, 2L);

        // Then
        assertNotNull(favorite1);
        assertNotNull(favorite2);
        verify(favoriteRepository, times(2)).save(any(Favorite.class));
    }

    /**
     * Test: Performance bei vielen Favoriten
     * Überprüft, ob die Performance auch bei vielen Favoriten akzeptabel bleibt
     */
    @Test
    void testPerformanceWithManyFavorites() {
        // Given
        List<Favorite> manyFavorites = Arrays.asList(
                testFavorite, testFavorite, testFavorite, testFavorite, testFavorite
        );
        when(favoriteRepository.findByUserId(1L)).thenReturn(manyFavorites);

        // When
        long startTime = System.currentTimeMillis();
        List<Favorite> result = favoriteService.getUserFavorites(1L);
        long endTime = System.currentTimeMillis();

        // Then
        long duration = endTime - startTime;
        assertEquals(5, result.size());
        
        // Performance-Check: Operation sollte unter 100ms dauern
        assertTrue(duration < 100, "Favoriten-Abruf zu langsam: " + duration + "ms");
    }

    /**
     * Test: Exception-Handling bei Datenbankfehlern
     * Überprüft, ob Datenbankfehler korrekt behandelt werden
     */
    @Test
    void testDatabaseErrorHandling() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));
        when(favoriteRepository.findByUserIdAndRecipeId(1L, 1L)).thenReturn(Optional.empty());
        when(favoriteRepository.save(any(Favorite.class))).thenThrow(new RuntimeException("Database error"));

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            favoriteService.addFavorite(1L, 1L);
        });
    }
} 