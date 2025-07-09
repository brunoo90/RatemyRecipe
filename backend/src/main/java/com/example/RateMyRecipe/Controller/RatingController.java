package com.example.RateMyRecipe.Controller;

import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.RateMyRecipe.Model.*;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.repositories.*;

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

    // Bewertung hinzufügen / bearbeiten
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
