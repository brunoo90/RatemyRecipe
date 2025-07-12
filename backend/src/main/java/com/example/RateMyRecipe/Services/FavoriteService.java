package com.example.RateMyRecipe.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RateMyRecipe.Model.Favorite;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.repositories.FavoriteRepository;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

/**
 * Service-Klasse für die Verwaltung von Favoriten
 * 
 * Diese Klasse implementiert die Geschäftslogik für das Favoriten-System,
 * einschließlich dem Hinzufügen, Entfernen und Abrufen von Favoriten.
 * 
 * @author Bruno
 * @version 1.0
 */
@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    /**
     * Fügt ein Rezept zu den Favoriten eines Benutzers hinzu
     * 
     * @param userId ID des Benutzers
     * @param recipeId ID des Rezepts
     * @return Das erstellte Favorite-Objekt
     * @throws RuntimeException wenn Benutzer oder Rezept nicht gefunden werden
     */
    public Favorite addFavorite(Long userId, Long recipeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Rezept nicht gefunden"));

        // Prüfen ob Favorit bereits existiert
        favoriteRepository.findByUserIdAndRecipeId(userId, recipeId)
                .ifPresent(favorite -> {
                    throw new RuntimeException("Rezept ist bereits in den Favoriten");
                });

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);

        return favoriteRepository.save(favorite);
    }

    /**
     * Entfernt ein Rezept aus den Favoriten eines Benutzers
     * 
     * @param userId ID des Benutzers
     * @param recipeId ID des Rezepts
     * @throws RuntimeException wenn der Favorit nicht gefunden wird
     */
    public void removeFavorite(Long userId, Long recipeId) {
        Favorite favorite = favoriteRepository.findByUserIdAndRecipeId(userId, recipeId)
                .orElseThrow(() -> new RuntimeException("Favorit nicht gefunden"));

        favoriteRepository.delete(favorite);
    }

    /**
     * Ruft alle Favoriten eines Benutzers ab
     * 
     * @param userId ID des Benutzers
     * @return Liste aller Favoriten des Benutzers
     */
    public List<Favorite> getUserFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    /**
     * Ruft alle Favoriten eines Benutzers ab
     * 
     * @param userId ID des Benutzers
     * @return Liste aller Favoriten des Benutzers
     */
    public List<Favorite> getUserFavoritesSortedByDate(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    /**
     * Prüft ob ein Rezept von einem Benutzer favorisiert ist
     * 
     * @param userId ID des Benutzers
     * @param recipeId ID des Rezepts
     * @return true wenn das Rezept favorisiert ist, false sonst
     */
    public boolean isFavorite(Long userId, Long recipeId) {
        return favoriteRepository.findByUserIdAndRecipeId(userId, recipeId).isPresent();
    }

    /**
     * Zählt die Anzahl der Favoriten für ein Rezept
     * 
     * @param recipeId ID des Rezepts
     * @return Anzahl der Favoriten
     */
    public long getFavoriteCount(Long recipeId) {
        return favoriteRepository.countByRecipeId(recipeId);
    }

    /**
     * Ruft alle Favoriten für ein Rezept ab
     * 
     * @param recipeId ID des Rezepts
     * @return Liste aller Favoriten für das Rezept
     */
    public List<Favorite> getRecipeFavorites(Long recipeId) {
        return favoriteRepository.findByRecipeId(recipeId);
    }

    /**
     * Löscht alle Favoriten eines Benutzers
     * 
     * @param userId ID des Benutzers
     */
    public void deleteAllUserFavorites(Long userId) {
        favoriteRepository.deleteByUserId(userId);
    }

    /**
     * Löscht alle Favoriten für ein Rezept
     * 
     * @param recipeId ID des Rezepts
     */
    public void deleteAllRecipeFavorites(Long recipeId) {
        favoriteRepository.deleteByRecipeId(recipeId);
    }
} 