package com.example.RateMyRecipe.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    // Alle Rezepte abrufen
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }

    // Rezept nach ID abrufen
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Rezepte nach Kategorie filtern
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Recipe>> getRecipesByCategory(@PathVariable String category) {
        List<Recipe> recipes = recipeRepository.findByCategoryIgnoreCase(category);
        return ResponseEntity.ok(recipes);
    }

    // Rezepte durchsuchen
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String query) {
        List<Recipe> recipes = recipeRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
        return ResponseEntity.ok(recipes);
    }

    // Neues Rezept erstellen
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Optional<User> user = userRepository.findById(userDetails.getId());
        if (user.isPresent()) {
            recipe.setAuthor(user.get());
            Recipe savedRecipe = recipeRepository.save(recipe);
            return ResponseEntity.ok(savedRecipe);
        }
        return ResponseEntity.badRequest().build();
    }

    // Rezept aktualisieren
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @RequestBody Recipe recipeDetails) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isPresent()) {
            Recipe existingRecipe = recipe.get();
            
            // Prüfen ob der Benutzer der Autor ist oder Admin
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            
            if (!existingRecipe.getAuthor().getId().equals(userDetails.getId()) && 
                !userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            
            existingRecipe.setTitle(recipeDetails.getTitle());
            existingRecipe.setDescription(recipeDetails.getDescription());
            existingRecipe.setImageUrl(recipeDetails.getImageUrl());
            existingRecipe.setCategory(recipeDetails.getCategory());
            existingRecipe.setInstructions(recipeDetails.getInstructions());
            existingRecipe.setIngredients(recipeDetails.getIngredients());
            
            Recipe updatedRecipe = recipeRepository.save(existingRecipe);
            return ResponseEntity.ok(updatedRecipe);
        }
        return ResponseEntity.notFound().build();
    }

    // Rezept löschen
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isPresent()) {
            // Prüfen ob der Benutzer der Autor ist oder Admin
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            
            if (!recipe.get().getAuthor().getId().equals(userDetails.getId()) && 
                !userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            
            recipeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Alle verfügbaren Kategorien abrufen
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = recipeRepository.findDistinctCategories();
        return ResponseEntity.ok(categories);
    }

    // Top bewertete Rezepte abrufen
    @GetMapping("/top-rated")
    public ResponseEntity<List<Recipe>> getTopRatedRecipes(@RequestParam(defaultValue = "10") int limit) {
        List<Recipe> recipes = recipeRepository.findTopRatedRecipes(limit);
        return ResponseEntity.ok(recipes);
    }
}
