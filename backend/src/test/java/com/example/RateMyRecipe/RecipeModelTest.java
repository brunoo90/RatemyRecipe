package com.example.RateMyRecipe;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;

public class RecipeModelTest {

    private Recipe recipe;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User("testuser", "test@example.com", "password");
        user.setId(1L);

        recipe = new Recipe();
        recipe.setId(1L);
        recipe.setTitle("Test Recipe");
        recipe.setDescription("A delicious test recipe");
        recipe.setCategory("Dessert");
        recipe.setAuthor(user);
        recipe.setIngredients(Arrays.asList("Sugar", "Flour", "Eggs"));
        recipe.setInstructions("Mix ingredients and bake");
        recipe.setImageUrl("https://example.com/image.jpg");
    }

    @Test
    void testRecipeCreation() {
        assertNotNull(recipe);
        assertEquals("Test Recipe", recipe.getTitle());
        assertEquals("A delicious test recipe", recipe.getDescription());
        assertEquals("Dessert", recipe.getCategory());
        assertEquals(user, recipe.getAuthor());
        assertEquals(3, recipe.getIngredients().size());
        assertEquals("Mix ingredients and bake", recipe.getInstructions());
        assertEquals("https://example.com/image.jpg", recipe.getImageUrl());
    }

    @Test
    void testRecipeUpdate() {
        recipe.setTitle("Updated Recipe");
        recipe.setDescription("Updated description");
        recipe.setCategory("Main Course");

        assertEquals("Updated Recipe", recipe.getTitle());
        assertEquals("Updated description", recipe.getDescription());
        assertEquals("Main Course", recipe.getCategory());
    }

    @Test
    void testIngredientsManagement() {
        List<String> newIngredients = Arrays.asList("Milk", "Butter", "Vanilla");
        recipe.setIngredients(newIngredients);

        assertEquals(3, recipe.getIngredients().size());
        assertTrue(recipe.getIngredients().contains("Milk"));
        assertTrue(recipe.getIngredients().contains("Butter"));
        assertTrue(recipe.getIngredients().contains("Vanilla"));
    }

    @Test
    void testAverageRatingCalculation() {
        // Test mit leeren Bewertungen
        recipe.updateAverageRating();
        assertEquals(0.0, recipe.getAverageRating());
        assertEquals(0, recipe.getRatingCount());

        // Test mit Bewertungen (wenn Rating-Model verfügbar)
        // Hier würden wir echte Rating-Objekte hinzufügen
        // Für jetzt testen wir nur die Grundfunktionalität
    }

    @Test
    void testRecipeValidation() {
        // Test dass alle erforderlichen Felder gesetzt sind
        assertNotNull(recipe.getTitle());
        assertNotNull(recipe.getDescription());
        assertNotNull(recipe.getCategory());
        assertNotNull(recipe.getAuthor());
        assertNotNull(recipe.getIngredients());
        assertNotNull(recipe.getInstructions());
    }
} 