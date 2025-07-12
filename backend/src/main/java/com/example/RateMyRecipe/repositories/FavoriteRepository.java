package com.example.RateMyRecipe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.RateMyRecipe.Model.Favorite;

/**
 * Repository-Interface für die Verwaltung von Benutzerfavoriten.
 * 
 * <p>Dieses Repository erweitert JpaRepository und stellt Methoden zur
 * Datenbankoperationen für Favorite-Entitäten bereit. Es ermöglicht das
 * Abrufen, Speichern und Löschen von Favoriten sowie spezielle Abfragen
 * für benutzerbezogene Favoritenlisten.</p>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024
 */
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    /**
     * Findet einen Favoriten anhand von Benutzer-ID und Rezept-ID.
     * 
     * @param userId Die ID des Benutzers
     * @param recipeId Die ID des Rezepts
     * @return Optional mit dem gefundenen Favoriten oder leer
     */
    Optional<Favorite> findByUserIdAndRecipeId(Long userId, Long recipeId);
    
    /**
     * Findet alle Favoriten eines Benutzers.
     * 
     * @param userId Die ID des Benutzers
     * @return Liste der Favoriten des Benutzers
     */
    List<Favorite> findByUserId(Long userId);
    

    
    /**
     * Zählt die Anzahl der Favoriten für ein Rezept.
     * 
     * @param recipeId Die ID des Rezepts
     * @return Anzahl der Favoriten
     */
    long countByRecipeId(Long recipeId);
    
    /**
     * Findet alle Favoriten für ein Rezept.
     * 
     * @param recipeId Die ID des Rezepts
     * @return Liste der Favoriten für das Rezept
     */
    List<Favorite> findByRecipeId(Long recipeId);
    
    /**
     * Löscht alle Favoriten eines Benutzers.
     * 
     * @param userId Die ID des Benutzers
     */
    void deleteByUserId(Long userId);
    
    /**
     * Löscht alle Favoriten für ein Rezept.
     * 
     * @param recipeId Die ID des Rezepts
     */
    void deleteByRecipeId(Long recipeId);
    
    /**
     * Prüft, ob ein Benutzer ein Rezept favorisiert hat.
     * 
     * @param userId Die ID des Benutzers
     * @param recipeId Die ID des Rezepts
     * @return true, wenn der Benutzer das Rezept favorisiert hat
     */
    boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);
    
    /**
     * Findet alle Favoriten mit benutzerdefinierten Abfragen.
     * 
     * @param userId Die ID des Benutzers
     * @return Liste der Favoriten mit zusätzlichen Informationen
     */
    @Query("SELECT f FROM Favorite f JOIN FETCH f.recipe r JOIN FETCH f.user u WHERE f.user.id = :userId")
    List<Favorite> findFavoritesWithDetailsByUserId(@Param("userId") Long userId);
}
