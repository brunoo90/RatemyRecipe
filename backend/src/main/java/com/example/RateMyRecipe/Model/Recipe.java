package com.example.RateMyRecipe.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

/**
 * Entity-Klasse für Rezepte in der RateMyRecipe-Anwendung.
 * 
 * <p>Diese Klasse repräsentiert ein Rezept mit allen zugehörigen Informationen
 * wie Titel, Beschreibung, Zutaten, Anweisungen und Bewertungen. Jedes Rezept
 * ist einem Benutzer (Autor) zugeordnet und kann von anderen Benutzern bewertet
 * und zu Favoriten hinzugefügt werden.</p>
 * 
 * <p>Die Klasse verwendet JPA-Annotationen für die Persistierung in der Datenbank
 * und implementiert Beziehungen zu anderen Entitäten wie User, Rating und Favorite.</p>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024
 */
@Entity
public class Recipe {

    /**
     * Eindeutige ID des Rezepts, automatisch generiert.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Titel des Rezepts.
     */
    @NotBlank(message = "Titel darf nicht leer sein.")
    private String title;

    /**
     * Kurze Beschreibung des Rezepts.
     */
    @NotBlank(message = "Beschreibung darf nicht leer sein.")
    private String description;

    /**
     * URL zum Bild des Rezepts.
     */
    private String imageUrl;

    /**
     * Kategorie des Rezepts (z.B. "Hauptgericht", "Dessert", "Vorspeise").
     */
    private String category;

    /**
     * Durchschnittliche Bewertung des Rezepts (0.0 - 5.0).
     */
    private Double averageRating = 0.0;

    /**
     * Anzahl der Bewertungen für dieses Rezept.
     */
    private Integer ratingCount = 0;

    /**
     * Detaillierte Zubereitungsanweisungen für das Rezept.
     * Maximale Länge: 5000 Zeichen.
     */
    @NotBlank(message = "Zubereitung darf nicht leer sein.")
    @Size(max = 5000, message = "Zubereitung darf maximal 5000 Zeichen haben.")
    private String instructions;

    /**
     * Liste der Zutaten für das Rezept.
     */
    @ElementCollection
    @NotEmpty(message = "Es müssen mindestens eine Zutat angegeben werden.")
    private List<String> ingredients = new ArrayList<>();

    /**
     * Autor des Rezepts (Many-to-One Beziehung zu User).
     */
    @ManyToOne
    private User author;

    /**
     * Liste aller Bewertungen für dieses Rezept (One-to-Many Beziehung).
     * Cascade-Operationen werden automatisch auf alle Bewertungen angewendet.
     */
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings;

    /**
     * Liste aller Favoriten-Einträge für dieses Rezept (One-to-Many Beziehung).
     * Cascade-Operationen werden automatisch auf alle Favoriten angewendet.
     */
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites;

    // Ergänzung: Kochzeit, Portionen, Schwierigkeitsgrad
    private Integer cookTime;
    private Integer servings;
    private String difficulty;

    /**
     * Standard-Konstruktor für Recipe.
     */
    public Recipe() {
        // Standard-Konstruktor für JPA
    }

    /**
     * Konstruktor mit allen wichtigen Feldern.
     * 
     * @param title Der Titel des Rezepts
     * @param description Die Beschreibung des Rezepts
     * @param category Die Kategorie des Rezepts
     * @param instructions Die Zubereitungsanweisungen
     * @param author Der Autor des Rezepts
     */
    public Recipe(String title, String description, String category, String instructions, User author) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.instructions = instructions;
        this.author = author;
    }

    // Getter & Setter

    /**
     * Gibt die ID des Rezepts zurück.
     * 
     * @return Die eindeutige ID des Rezepts
     */
    public Long getId() { return id; }

    /**
     * Setzt die ID des Rezepts.
     * 
     * @param id Die neue ID
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Gibt den Titel des Rezepts zurück.
     * 
     * @return Der Titel des Rezepts
     */
    public String getTitle() { return title; }

    /**
     * Setzt den Titel des Rezepts.
     * 
     * @param title Der neue Titel
     */
    public void setTitle(String title) { this.title = title; }

    /**
     * Gibt die Beschreibung des Rezepts zurück.
     * 
     * @return Die Beschreibung des Rezepts
     */
    public String getDescription() { return description; }

    /**
     * Setzt die Beschreibung des Rezepts.
     * 
     * @param description Die neue Beschreibung
     */
    public void setDescription(String description) { this.description = description; }

    /**
     * Gibt die Bild-URL des Rezepts zurück.
     * 
     * @return Die URL zum Bild
     */
    public String getImageUrl() { return imageUrl; }

    /**
     * Setzt die Bild-URL des Rezepts.
     * 
     * @param imageUrl Die neue Bild-URL
     */
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    /**
     * Gibt die Kategorie des Rezepts zurück.
     * 
     * @return Die Kategorie des Rezepts
     */
    public String getCategory() { return category; }

    /**
     * Setzt die Kategorie des Rezepts.
     * 
     * @param category Die neue Kategorie
     */
    public void setCategory(String category) { this.category = category; }

    /**
     * Gibt die durchschnittliche Bewertung des Rezepts zurück.
     * 
     * @return Die durchschnittliche Bewertung (0.0 - 5.0)
     */
    public Double getAverageRating() { return averageRating; }

    /**
     * Setzt die durchschnittliche Bewertung des Rezepts.
     * 
     * @param averageRating Die neue durchschnittliche Bewertung
     */
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    /**
     * Gibt die Anzahl der Bewertungen zurück.
     * 
     * @return Die Anzahl der Bewertungen
     */
    public Integer getRatingCount() { return ratingCount; }

    /**
     * Setzt die Anzahl der Bewertungen.
     * 
     * @param ratingCount Die neue Anzahl der Bewertungen
     */
    public void setRatingCount(Integer ratingCount) { this.ratingCount = ratingCount; }

    /**
     * Gibt die Zubereitungsanweisungen zurück.
     * 
     * @return Die Zubereitungsanweisungen
     */
    public String getInstructions() { return instructions; }

    /**
     * Setzt die Zubereitungsanweisungen.
     * 
     * @param instructions Die neuen Zubereitungsanweisungen
     */
    public void setInstructions(String instructions) { this.instructions = instructions; }

    /**
     * Gibt die Liste der Zutaten zurück.
     * 
     * @return Die Liste der Zutaten
     */
    public List<String> getIngredients() { return ingredients; }

    /**
     * Setzt die Liste der Zutaten.
     * 
     * @param ingredients Die neue Liste der Zutaten
     */
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }

    /**
     * Gibt den Autor des Rezepts zurück.
     * 
     * @return Der Autor des Rezepts
     */
    public User getAuthor() { return author; }

    /**
     * Setzt den Autor des Rezepts.
     * 
     * @param author Der neue Autor
     */
    public void setAuthor(User author) { this.author = author; }

    /**
     * Gibt die Liste der Bewertungen zurück.
     * 
     * @return Die Liste der Bewertungen
     */
    public List<Rating> getRatings() { return ratings; }

    /**
     * Setzt die Liste der Bewertungen.
     * 
     * @param ratings Die neue Liste der Bewertungen
     */
    public void setRatings(List<Rating> ratings) { this.ratings = ratings; }

    /**
     * Gibt die Liste der Favoriten zurück.
     * 
     * @return Die Liste der Favoriten
     */
    public List<Favorite> getFavorites() { return favorites; }

    /**
     * Setzt die Liste der Favoriten.
     * 
     * @param favorites Die neue Liste der Favoriten
     */
    public void setFavorites(List<Favorite> favorites) { this.favorites = favorites; }

    /**
     * Aktualisiert die durchschnittliche Bewertung basierend auf allen vorhandenen Bewertungen.
     * 
     * <p>Diese Methode berechnet den Durchschnitt aller Sternebewertungen und aktualisiert
     * sowohl die durchschnittliche Bewertung als auch die Anzahl der Bewertungen.
     * Wenn keine Bewertungen vorhanden sind, werden beide Werte auf 0 gesetzt.</p>
     */
    public void updateAverageRating() {
        if (ratings != null && !ratings.isEmpty()) {
            double sum = ratings.stream().mapToDouble(Rating::getStars).sum();
            this.averageRating = sum / ratings.size();
            this.ratingCount = ratings.size();
        } else {
            this.averageRating = 0.0;
            this.ratingCount = 0;
        }
    }

    // Setter und Getter für cookTime
    public Integer getCookTime() { return cookTime; }
    public void setCookTime(Integer cookTime) { this.cookTime = cookTime; }
    // Setter und Getter für servings
    public Integer getServings() { return servings; }
    public void setServings(Integer servings) { this.servings = servings; }
    // Setter und Getter für difficulty
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    // Setter und Getter für user (Alias für author)
    public User getUser() { return author; }
    public void setUser(User user) { this.author = user; }

    /**
     * Gibt eine String-Repräsentation des Rezepts zurück.
     * 
     * @return String-Repräsentation mit Titel und Autor
     */
    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author=" + (author != null ? author.getUsername() : "null") +
                ", averageRating=" + averageRating +
                ", ratingCount=" + ratingCount +
                '}';
    }
}
