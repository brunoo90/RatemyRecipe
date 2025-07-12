package com.example.RateMyRecipe.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RateMyRecipe.Model.Rating;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.repositories.RatingRepository;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

import jakarta.validation.Valid;

/**
 * REST-Controller für die Verwaltung von Rezeptbewertungen.
 * 
 * <p>Dieser Controller stellt Endpunkte bereit, um Rezepte zu bewerten,
 * bestehende Bewertungen zu aktualisieren und Bewertungsdaten abzurufen.
 * Bewertungen können nur von authentifizierten Benutzern abgegeben werden
 * und ein Benutzer kann ein Rezept nur einmal bewerten.</p>
 * 
 * <p>Wichtige Geschäftsregeln:</p>
 * <ul>
 *   <li>Benutzer können ihre eigenen Rezepte nicht bewerten</li>
 *   <li>Jeder Benutzer kann ein Rezept nur einmal bewerten (Update möglich)</li>
 *   <li>Bewertungen bestehen aus 1-5 Sternen und optionalem Kommentar</li>
 * </ul>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024-06-12
 */
@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:5173")
public class RatingController {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Bewertet ein Rezept oder aktualisiert eine bestehende Bewertung.
     * 
     * <p>Diese Methode ermöglicht es authentifizierten Benutzern, ein Rezept zu bewerten.
     * Falls bereits eine Bewertung für das Rezept vom gleichen Benutzer existiert,
     * wird diese aktualisiert. Benutzer können ihre eigenen Rezepte nicht bewerten.</p>
     * 
     * <p>Die Bewertung wird automatisch mit dem aktuellen Benutzer und dem
     * angegebenen Rezept verknüpft.</p>
     * 
     * @param recipeId Die ID des zu bewertenden Rezepts
     * @param ratingRequest Die Bewertungsdaten (Sterne und optionaler Kommentar)
     * @param userDetails Die Details des authentifizierten Benutzers
     * @return ResponseEntity mit Erfolgsmeldung oder Fehlermeldung
     * 
     * @throws RuntimeException wenn Benutzer oder Rezept nicht gefunden werden
     * 
     * <p>Mögliche Antworten:</p>
     * <ul>
     *   <li>200 OK - "Rating added" (neue Bewertung erstellt)</li>
     *   <li>200 OK - "Rating updated" (bestehende Bewertung aktualisiert)</li>
     *   <li>400 Bad Request - "You cannot rate your own recipe"</li>
     * </ul>
     */
    @PostMapping("/{recipeId}")
    public ResponseEntity<?> rateRecipe(@PathVariable Long recipeId,
                                        @Valid @RequestBody Rating ratingRequest,
                                        @AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        if (recipe.getAuthor().getId().equals(user.getId())) {
            return ResponseEntity.badRequest().body("You cannot rate your own recipe");
        }

        Optional<Rating> existingRating = ratingRepository.findByUserAndRecipe(user, recipe);

        if (existingRating.isPresent()) {
            Rating rating = existingRating.get();
            rating.setStars(ratingRequest.getStars());
            rating.setComment(ratingRequest.getComment());
            ratingRepository.save(rating);
            return ResponseEntity.ok("Rating updated");
        } else {
            ratingRequest.setUser(user);
            ratingRequest.setRecipe(recipe);
            ratingRepository.save(ratingRequest);
            return ResponseEntity.ok("Rating added");
        }
    }
}
