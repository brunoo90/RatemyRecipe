package com.example.RateMyRecipe.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.RateMyRecipe.Model.*;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.repositories.*;

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

    // Favorit hinzufügen (nur bei fremden Rezepten)
    @PostMapping("/{recipeId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long recipeId,
                                         @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        if (recipe.getAuthor().getId().equals(user.getId())) {
            return ResponseEntity.badRequest().body("Cannot favorite your own recipe");
        }

        if (favoriteRepository.findByUserAndRecipe(user, recipe).isPresent()) {
            return ResponseEntity.badRequest().body("Recipe already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);
        favoriteRepository.save(favorite);

        return ResponseEntity.ok("Recipe added to favorites");
    }

    // Favorit entfernen
    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long recipeId,
                                            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        Favorite favorite = favoriteRepository.findByUserAndRecipe(user, recipe)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        favoriteRepository.delete(favorite);
        return ResponseEntity.ok("Favorite removed");
    }

    // Alle Favoriten des Users
    @GetMapping
    public List<Recipe> getMyFavorites(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        List<Favorite> favorites = favoriteRepository.findByUser(user);
        return favorites.stream()
                .map(Favorite::getRecipe)
                .collect(Collectors.toList());
    }
}
