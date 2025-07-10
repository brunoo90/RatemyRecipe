package com.example.RateMyRecipe.Controller;

import java.io.IOException;
import java.util.Arrays;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.repositories.RecipeRepository;
import com.example.RateMyRecipe.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

/**
 * REST-Controller für Rezept-bezogene Operationen.
 * 
 * <p>Dieser Controller stellt alle CRUD-Operationen für Rezepte bereit und implementiert
 * zusätzliche Funktionen wie Suche, Kategoriefilterung und Top-Bewertungen. Alle Endpunkte
 * sind unter dem Pfad "/api/recipes" verfügbar.</p>
 * 
 * <p>Der Controller implementiert rollenbasierte Sicherheit und stellt sicher, dass
 * Benutzer nur ihre eigenen Rezepte bearbeiten können (außer Admins).</p>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024
 * @see Recipe
 * @see User
 */
@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RecipeController {

    /**
     * Repository für Rezept-Datenbankoperationen.
     */
    @Autowired
    private RecipeRepository recipeRepository;

    /**
     * Repository für Benutzer-Datenbankoperationen.
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Ruft alle verfügbaren Rezepte ab.
     * 
     * <p>Dieser Endpunkt ist öffentlich zugänglich und gibt eine Liste aller
     * Rezepte in der Datenbank zurück.</p>
     * 
     * @return ResponseEntity mit einer Liste aller Rezepte
     */
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }

    /**
     * Ruft ein spezifisches Rezept anhand seiner ID ab.
     * 
     * <p>Dieser Endpunkt ist öffentlich zugänglich. Wenn das Rezept nicht gefunden wird,
     * wird ein 404-Status zurückgegeben.</p>
     * 
     * @param id Die eindeutige ID des Rezepts
     * @return ResponseEntity mit dem Rezept oder 404 wenn nicht gefunden
     */
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Ruft alle Rezepte einer bestimmten Kategorie ab.
     * 
     * <p>Die Suche ist case-insensitive und gibt alle Rezepte zurück,
     * die der angegebenen Kategorie entsprechen.</p>
     * 
     * @param category Die Kategorie, nach der gefiltert werden soll
     * @return ResponseEntity mit einer Liste der gefilterten Rezepte
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Recipe>> getRecipesByCategory(@PathVariable String category) {
        List<Recipe> recipes = recipeRepository.findByCategoryIgnoreCase(category);
        return ResponseEntity.ok(recipes);
    }

    /**
     * Durchsucht Rezepte nach Titel oder Beschreibung.
     * 
     * <p>Die Suche ist case-insensitive und durchsucht sowohl den Titel
     * als auch die Beschreibung der Rezepte.</p>
     * 
     * @param query Der Suchbegriff
     * @return ResponseEntity mit einer Liste der gefundenen Rezepte
     */
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String query) {
        List<Recipe> recipes = recipeRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
        return ResponseEntity.ok(recipes);
    }

    /**
     * Erstellt ein neues Rezept.
     * 
     * <p>Dieser Endpunkt erfordert eine Benutzeranmeldung (USER oder ADMIN Rolle).
     * Das erstellte Rezept wird automatisch dem aktuellen Benutzer als Autor zugewiesen.</p>
     * 
     * @param recipe Das zu erstellende Rezept (ohne ID und Autor)
     * @return ResponseEntity mit dem erstellten Rezept oder 400 bei Fehlern
     */
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createRecipe(@Valid @RequestBody Recipe recipe) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<User> user = userRepository.findById(userDetails.getId());
        if (user.isPresent()) {
            recipe.setAuthor(user.get());
            Recipe savedRecipe = recipeRepository.save(recipe);
            return ResponseEntity.ok(savedRecipe);
        }
        return ResponseEntity.badRequest().body("Fehler: Benutzer nicht gefunden.");
    }

    /**
     * Erstellt ein neues Rezept mit Bild-Upload (Multipart).
     *
     * <p>Dieser Endpunkt akzeptiert Multipart/FormData und verarbeitet optionale Bilddateien.</p>
     *
     * @param title Titel des Rezepts
     * @param description Beschreibung
     * @param ingredients Zutaten (als JSON-Array-String)
     * @param instructions Zubereitung
     * @param image Bilddatei (optional)
     * @return ResponseEntity mit dem erstellten Rezept oder Fehler
     */
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(value = "/multipart", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createRecipeMultipart(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("ingredients") String ingredientsJson,
            @RequestPart("instructions") String instructions,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        // Pflichtfeld-Validierung
        if (title == null || title.isBlank()) return ResponseEntity.badRequest().body("Titel ist ein Pflichtfeld.");
        if (description == null || description.isBlank()) return ResponseEntity.badRequest().body("Beschreibung ist ein Pflichtfeld.");
        if (instructions == null || instructions.isBlank()) return ResponseEntity.badRequest().body("Zubereitung ist ein Pflichtfeld.");
        if (ingredientsJson == null || ingredientsJson.isBlank()) return ResponseEntity.badRequest().body("Mindestens eine Zutat angeben.");
        try {
            ObjectMapper mapper = new ObjectMapper();
            String[] ingredientsArr = mapper.readValue(ingredientsJson, String[].class);
            if (ingredientsArr.length == 0) return ResponseEntity.badRequest().body("Mindestens eine Zutat angeben.");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Optional<User> user = userRepository.findById(userDetails.getId());
            if (user.isEmpty()) return ResponseEntity.badRequest().body("Fehler: Benutzer nicht gefunden.");
            Recipe recipe = new Recipe();
            recipe.setTitle(title);
            recipe.setDescription(description);
            recipe.setInstructions(instructions);
            recipe.setIngredients(Arrays.asList(ingredientsArr));
            recipe.setAuthor(user.get());
            // Bild-Upload: Hier ggf. Bild speichern und URL setzen
            if (image != null && !image.isEmpty()) {
                // TODO: Bild speichern und URL setzen
                recipe.setImageUrl("/images/" + image.getOriginalFilename());
            }
            Recipe savedRecipe = recipeRepository.save(recipe);
            return ResponseEntity.ok(savedRecipe);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Fehler beim Verarbeiten der Zutaten.");
        }
    }

    /**
     * Aktualisiert ein bestehendes Rezept.
     * 
     * <p>Dieser Endpunkt erfordert eine Benutzeranmeldung. Nur der Autor des Rezepts
     * oder ein Admin kann das Rezept bearbeiten. Bei unbefugtem Zugriff wird
     * ein 403-Status zurückgegeben.</p>
     * 
     * @param id Die ID des zu aktualisierenden Rezepts
     * @param recipeDetails Die neuen Rezeptdaten
     * @return ResponseEntity mit dem aktualisierten Rezept, 403 bei unbefugtem Zugriff oder 404 wenn nicht gefunden
     */
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

    /**
     * Löscht ein Rezept.
     * 
     * <p>Dieser Endpunkt erfordert eine Benutzeranmeldung. Nur der Autor des Rezepts
     * oder ein Admin kann das Rezept löschen. Bei unbefugtem Zugriff wird
     * ein 403-Status zurückgegeben.</p>
     * 
     * @param id Die ID des zu löschenden Rezepts
     * @return ResponseEntity mit 200 bei erfolgreichem Löschen, 403 bei unbefugtem Zugriff oder 404 wenn nicht gefunden
     */
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

    /**
     * Ruft alle verfügbaren Kategorien ab.
     * 
     * <p>Dieser Endpunkt ist öffentlich zugänglich und gibt eine Liste aller
     * in der Datenbank verwendeten Kategorien zurück.</p>
     * 
     * @return ResponseEntity mit einer Liste aller Kategorien
     */
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = recipeRepository.findDistinctCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * Ruft die am besten bewerteten Rezepte ab.
     * 
     * <p>Dieser Endpunkt ist öffentlich zugänglich und gibt eine Liste der
     * Rezepte mit den höchsten Durchschnittsbewertungen zurück.</p>
     * 
     * @param limit Die maximale Anzahl der zurückgegebenen Rezepte (Standard: 10)
     * @return ResponseEntity mit einer Liste der top-bewerteten Rezepte
     */
    @GetMapping("/top-rated")
    public ResponseEntity<List<Recipe>> getTopRatedRecipes(@RequestParam(defaultValue = "10") int limit) {
        List<Recipe> recipes = recipeRepository.findTopRatedRecipes(limit);
        return ResponseEntity.ok(recipes);
    }
}
