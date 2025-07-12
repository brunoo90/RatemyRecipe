package com.example.RateMyRecipe.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RateMyRecipe.Model.Favorite;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.repositories.FavoriteRepository;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

/**
 * REST-Controller für die Verwaltung von Benutzerfavoriten.
 * 
 * <p>Dieser Controller stellt Endpunkte bereit, um Rezepte zu den Favoriten
 * hinzuzufügen, zu entfernen und die Favoritenliste eines Benutzers abzurufen.
 * Favoriten können nur von authentifizierten Benutzern verwaltet werden.</p>
 * 
 * <p>Wichtige Geschäftsregeln:</p>
 * <ul>
 *   <li>Benutzer können ihre eigenen Rezepte nicht zu Favoriten hinzufügen</li>
 *   <li>Ein Rezept kann nur einmal zu den Favoriten hinzugefügt werden</li>
 *   <li>Nur der Besitzer kann seine eigenen Favoriten verwalten</li>
 *   <li>Favoriten sind benutzerspezifisch und privat</li>
 * </ul>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024-06-12
 */
@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Fügt ein Rezept zu den Favoriten des authentifizierten Benutzers hinzu.
     * 
     * <p>Diese Methode ermöglicht es Benutzern, fremde Rezepte zu ihren Favoriten
     * hinzuzufügen. Eigene Rezepte können nicht favorisiert werden, um
     * Missbrauch zu verhindern.</p>
     * 
     * @param recipeId Die ID des Rezepts, das zu den Favoriten hinzugefügt werden soll
     * @param userDetails Die Details des authentifizierten Benutzers
     * @return ResponseEntity mit Erfolgsmeldung oder Fehlermeldung
     * 
     * @throws RuntimeException wenn Benutzer oder Rezept nicht gefunden werden
     * 
     * <p>Mögliche Antworten:</p>
     * <ul>
     *   <li>200 OK - "Recipe added to favorites"</li>
     *   <li>400 Bad Request - "Cannot favorite your own recipe"</li>
     *   <li>400 Bad Request - "Recipe already in favorites"</li>
     * </ul>
     */
    @PostMapping("/{recipeId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long recipeId,
                                         @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        if (recipe.getAuthor().getId().equals(user.getId())) {
            return ResponseEntity.badRequest().body("Cannot favorite your own recipe");
        }

        if (favoriteRepository.findByUserIdAndRecipeId(user.getId(), recipe.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("Recipe already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);
        favoriteRepository.save(favorite);

        return ResponseEntity.ok("Recipe added to favorites");
    }

    /**
     * Entfernt ein Rezept aus den Favoriten des authentifizierten Benutzers.
     * 
     * <p>Diese Methode ermöglicht es Benutzern, Rezepte aus ihren Favoriten
     * zu entfernen. Nur der Besitzer der Favoriten kann diese entfernen.</p>
     * 
     * @param recipeId Die ID des Rezepts, das aus den Favoriten entfernt werden soll
     * @param userDetails Die Details des authentifizierten Benutzers
     * @return ResponseEntity mit Erfolgsmeldung oder Fehlermeldung
     * 
     * @throws RuntimeException wenn Benutzer, Rezept oder Favorit nicht gefunden werden
     * 
     * <p>Mögliche Antworten:</p>
     * <ul>
     *   <li>200 OK - "Favorite removed"</li>
     *   <li>404 Not Found - "Favorite not found"</li>
     * </ul>
     */
    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long recipeId,
                                            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        Favorite favorite = favoriteRepository.findByUserIdAndRecipeId(user.getId(), recipe.getId())
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        favoriteRepository.delete(favorite);
        return ResponseEntity.ok("Favorite removed");
    }

    /**
     * Ruft alle Favoriten des authentifizierten Benutzers ab.
     * 
     * <p>Diese Methode gibt eine Liste aller Rezepte zurück, die der
     * authentifizierte Benutzer zu seinen Favoriten hinzugefügt hat.
     * Die Liste ist benutzerspezifisch und enthält nur die eigenen Favoriten.</p>
     * 
     * @param userDetails Die Details des authentifizierten Benutzers
     * @return Liste der favorisierten Rezepte des Benutzers
     * 
     * @throws RuntimeException wenn der Benutzer nicht gefunden wird
     */
    @GetMapping
    public List<Recipe> getMyFavorites(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        List<Favorite> favorites = favoriteRepository.findByUserId(user.getId());
        return favorites.stream()
                .map(Favorite::getRecipe)
                .collect(Collectors.toList());
    }
}
