package com.example.RateMyRecipe;

import com.example.RateMyRecipe.Controller.RecipeController;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit-Tests für den RecipeController
 * 
 * Diese Tests überprüfen die Funktionalität der Rezept-API-Endpunkte
 * und stellen sicher, dass alle CRUD-Operationen korrekt funktionieren.
 * 
 * @author Bruno
 * @version 1.0
 */
@SpringBootTest
@AutoConfigureWebMvc
public class RecipeControllerTest {

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private RecipeRepository recipeRepository;

    @MockBean
    private UserRepository userRepository;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private Recipe testRecipe;
    private User testUser;

    /**
     * Setup-Methode, die vor jedem Test ausgeführt wird
     * Initialisiert MockMvc, ObjectMapper und Test-Daten
     */
    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
        
        objectMapper = new ObjectMapper();

        // Test-User erstellen
        testUser = new User();
        testUser.setId(1L);
        testUser.setFirstName("Test");
        testUser.setLastName("User");
        testUser.setEmail("test@example.com");

        // Test-Rezept erstellen
        testRecipe = new Recipe();
        testRecipe.setId(1L);
        testRecipe.setTitle("Test Rezept");
        testRecipe.setDescription("Ein Test-Rezept für Unit-Tests");
        testRecipe.setIngredients(Arrays.asList("Zutat 1", "Zutat 2"));
        testRecipe.setInstructions("Schritt 1\nSchritt 2");
        testRecipe.setCookTime(30);
        testRecipe.setServings(4);
        testRecipe.setDifficulty("MITTEL");
        testRecipe.setCategory("HAUPTGERICHT");
        testRecipe.setUser(testUser);
    }

    /**
     * Test: Alle Rezepte abrufen
     * Überprüft, ob der GET /api/recipes Endpunkt korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testGetAllRecipes() throws Exception {
        // Given
        List<Recipe> recipes = Arrays.asList(testRecipe);
        when(recipeRepository.findAll()).thenReturn(recipes);

        // When & Then
        mockMvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Rezept"))
                .andExpect(jsonPath("$[0].description").value("Ein Test-Rezept für Unit-Tests"))
                .andExpect(jsonPath("$[0].cookTime").value(30))
                .andExpect(jsonPath("$[0].servings").value(4));
    }

    /**
     * Test: Einzelnes Rezept abrufen
     * Überprüft, ob der GET /api/recipes/{id} Endpunkt korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testGetRecipeById() throws Exception {
        // Given
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));

        // When & Then
        mockMvc.perform(get("/api/recipes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Rezept"))
                .andExpect(jsonPath("$.description").value("Ein Test-Rezept für Unit-Tests"));
    }

    /**
     * Test: Rezept nicht gefunden
     * Überprüft, ob der korrekte HTTP-Status bei nicht existierenden Rezepten zurückgegeben wird
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testGetRecipeByIdNotFound() throws Exception {
        // Given
        when(recipeRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/api/recipes/999"))
                .andExpect(status().isNotFound());
    }

    /**
     * Test: Neues Rezept erstellen
     * Überprüft, ob der POST /api/recipes Endpunkt korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testCreateRecipe() throws Exception {
        // Given
        Recipe newRecipe = new Recipe();
        newRecipe.setTitle("Neues Rezept");
        newRecipe.setDescription("Ein neues Test-Rezept");
        newRecipe.setIngredients(Arrays.asList("Neue Zutat"));
        newRecipe.setInstructions("Neuer Schritt");
        newRecipe.setCookTime(45);
        newRecipe.setServings(2);
        newRecipe.setDifficulty("EINFACH");
        newRecipe.setCategory("FRÜHSTÜCK");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(newRecipe);

        // When & Then
        mockMvc.perform(post("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newRecipe)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Neues Rezept"))
                .andExpect(jsonPath("$.description").value("Ein neues Test-Rezept"));
    }

    /**
     * Test: Rezept aktualisieren
     * Überprüft, ob der PUT /api/recipes/{id} Endpunkt korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testUpdateRecipe() throws Exception {
        // Given
        Recipe updatedRecipe = new Recipe();
        updatedRecipe.setTitle("Aktualisiertes Rezept");
        updatedRecipe.setDescription("Ein aktualisiertes Test-Rezept");
        updatedRecipe.setCookTime(60);
        updatedRecipe.setServings(6);

        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(updatedRecipe);

        // When & Then
        mockMvc.perform(put("/api/recipes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedRecipe)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Aktualisiertes Rezept"))
                .andExpect(jsonPath("$.description").value("Ein aktualisiertes Test-Rezept"));
    }

    /**
     * Test: Rezept löschen
     * Überprüft, ob der DELETE /api/recipes/{id} Endpunkt korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testDeleteRecipe() throws Exception {
        // Given
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(testRecipe));

        // When & Then
        mockMvc.perform(delete("/api/recipes/1"))
                .andExpect(status().isNoContent());
    }

    /**
     * Test: Rezepte nach Kategorie filtern
     * Überprüft, ob die Kategorie-Filterung korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testGetRecipesByCategory() throws Exception {
        // Given
        List<Recipe> hauptgerichte = Arrays.asList(testRecipe);
        when(recipeRepository.findByCategory("HAUPTGERICHT")).thenReturn(hauptgerichte);

        // When & Then
        mockMvc.perform(get("/api/recipes/category/HAUPTGERICHT"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].category").value("HAUPTGERICHT"));
    }

    /**
     * Test: Rezepte nach Benutzer filtern
     * Überprüft, ob die Benutzer-Filterung korrekt funktioniert
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testGetRecipesByUser() throws Exception {
        // Given
        List<Recipe> userRecipes = Arrays.asList(testRecipe);
        when(recipeRepository.findByAuthorId(1L)).thenReturn(userRecipes);

        // When & Then
        mockMvc.perform(get("/api/recipes/user/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].user.id").value(1));
    }

    /**
     * Test: Validierung bei Rezept-Erstellung
     * Überprüft, ob Validierungsfehler korrekt behandelt werden
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testCreateRecipeValidationError() throws Exception {
        // Given
        Recipe invalidRecipe = new Recipe();
        // Titel fehlt - sollte Validierungsfehler verursachen

        // When & Then
        mockMvc.perform(post("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRecipe)))
                .andExpect(status().isBadRequest());
    }

    /**
     * Test: Unauthorized-Zugriff auf geschützte Endpunkte
     * Überprüft, ob nicht-authentifizierte Zugriffe korrekt abgelehnt werden
     */
    @Test
    void testUnauthorizedAccess() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/recipes"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(post("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isUnauthorized());
    }

    /**
     * Test: Performance bei vielen Rezepten
     * Überprüft, ob die API auch bei vielen Rezepten performant bleibt
     */
    @Test
    @WithMockUser(username = "test@example.com")
    void testPerformanceWithManyRecipes() throws Exception {
        // Given
        List<Recipe> manyRecipes = Arrays.asList(
                testRecipe, testRecipe, testRecipe, testRecipe, testRecipe
        );
        when(recipeRepository.findAll()).thenReturn(manyRecipes);

        // When & Then
        long startTime = System.currentTimeMillis();
        
        mockMvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(5));

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        
        // Performance-Check: Response sollte unter 1 Sekunde sein
        assert duration < 1000 : "API-Response zu langsam: " + duration + "ms";
    }
} 