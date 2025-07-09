package com.example.RateMyRecipe.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByAuthor(User user);
    
    // Rezepte nach Kategorie filtern
    List<Recipe> findByCategoryIgnoreCase(String category);
    
    // Rezepte durchsuchen (Titel oder Beschreibung)
    List<Recipe> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
    
    // Alle verfügbaren Kategorien abrufen
    @Query("SELECT DISTINCT r.category FROM Recipe r WHERE r.category IS NOT NULL")
    List<String> findDistinctCategories();
    
    // Top bewertete Rezepte abrufen
    @Query("SELECT r FROM Recipe r ORDER BY r.averageRating DESC, r.ratingCount DESC")
    List<Recipe> findTopRatedRecipes(@Param("limit") int limit);
    
    // Rezepte nach Bewertung sortiert abrufen
    @Query("SELECT r FROM Recipe r ORDER BY r.averageRating DESC")
    List<Recipe> findAllOrderByAverageRatingDesc();
    
    // Rezepte nach Erstellungsdatum sortiert abrufen (neueste zuerst)
    @Query("SELECT r FROM Recipe r ORDER BY r.id DESC")
    List<Recipe> findAllOrderByCreatedDateDesc();
}
