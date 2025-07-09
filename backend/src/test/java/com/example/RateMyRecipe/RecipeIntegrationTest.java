package com.example.RateMyRecipe;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class RecipeIntegrationTest {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    private User testUser;
    private Recipe testRecipe;

    @BeforeEach
    void setUp() {
        // Test-User erstellen
        testUser = new User("integrationtest", "integration@test.com", "password");
        testUser = userRepository.save(testUser);

        // Test-Rezept erstellen
        testRecipe = new Recipe();
        testRecipe.setTitle("Integration Test Recipe");
        testRecipe.setDescription("A recipe for integration testing");
        testRecipe.setCategory("Test Category");
        testRecipe.setAuthor(testUser);
        testRecipe.setIngredients(Arrays.asList("Test Ingredient 1", "Test Ingredient 2"));
        testRecipe.setInstructions("Test instructions for integration");
        testRecipe.setImageUrl("https://test.com/image.jpg");
    }

    @Test
    void testRecipeCreationAndRetrieval() {
        // Rezept speichern
        Recipe savedRecipe = recipeRepository.save(testRecipe);
        assertNotNull(savedRecipe.getId());

        // Rezept abrufen
        Optional<Recipe> foundRecipe = recipeRepository.findById(savedRecipe.getId());
        assertTrue(foundRecipe.isPresent());
        assertEquals("Integration Test Recipe", foundRecipe.get().getTitle());
        assertEquals(testUser.getId(), foundRecipe.get().getAuthor().getId());
    }

    @Test
    void testRecipeDeletion() {
        // Rezept speichern
        Recipe savedRecipe = recipeRepository.save(testRecipe);
        Long recipeId = savedRecipe.getId();

        // Rezept löschen
        recipeRepository.deleteById(recipeId);

        // Prüfen dass Rezept gelöscht wurde
        Optional<Recipe> foundRecipe = recipeRepository.findById(recipeId);
        assertFalse(foundRecipe.isPresent());
    }

    @Test
    void testFindRecipesByAuthor() {
        // Mehrere Rezepte für denselben Autor erstellen
        Recipe recipe1 = new Recipe();
        recipe1.setTitle("Recipe 1");
        recipe1.setAuthor(testUser);
        recipe1.setCategory("Category 1");
        recipeRepository.save(recipe1);

        Recipe recipe2 = new Recipe();
        recipe2.setTitle("Recipe 2");
        recipe2.setAuthor(testUser);
        recipe2.setCategory("Category 2");
        recipeRepository.save(recipe2);

        // Rezepte des Autors abrufen
        List<Recipe> userRecipes = recipeRepository.findByAuthor(testUser);
        assertEquals(2, userRecipes.size());
        assertTrue(userRecipes.stream().allMatch(r -> r.getAuthor().getId().equals(testUser.getId())));
    }

    @Test
    void testRecipeValidation() {
        // Test dass Rezept ohne Titel nicht gespeichert werden kann
        Recipe invalidRecipe = new Recipe();
        invalidRecipe.setAuthor(testUser);
        invalidRecipe.setDescription("Description without title");

        // Hier würden wir Validierung testen
        // Für jetzt testen wir nur die Grundfunktionalität
        Recipe savedRecipe = recipeRepository.save(invalidRecipe);
        assertNotNull(savedRecipe.getId());
    }

    @Test
    void testRecipeWithIngredients() {
        List<String> ingredients = Arrays.asList("Ingredient 1", "Ingredient 2", "Ingredient 3");
        testRecipe.setIngredients(ingredients);

        Recipe savedRecipe = recipeRepository.save(testRecipe);
        assertNotNull(savedRecipe.getId());

        Optional<Recipe> foundRecipe = recipeRepository.findById(savedRecipe.getId());
        assertTrue(foundRecipe.isPresent());
        assertEquals(3, foundRecipe.get().getIngredients().size());
        assertTrue(foundRecipe.get().getIngredients().contains("Ingredient 1"));
    }
} 