package com.example.RateMyRecipe.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.repositories.RecipeRepository;

@RestController
@RequestMapping("/public/recipes")
@CrossOrigin(origins = "*")
public class PublicRecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Recipe>> getRecipesByCategory(@PathVariable String category) {
        List<Recipe> recipes = recipeRepository.findByCategory(category);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String query) {
        List<Recipe> recipes = recipeRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<Recipe>> getTopRatedRecipes() {
        List<Recipe> recipes = recipeRepository.findTop10ByOrderByAverageRatingDesc();
        return ResponseEntity.ok(recipes);
    }
} 