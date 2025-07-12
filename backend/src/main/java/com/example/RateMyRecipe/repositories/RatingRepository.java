package com.example.RateMyRecipe.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.RateMyRecipe.Model.Rating;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;

/**
 * Repository-Interface für die Verwaltung von Rezeptbewertungen.
 * 
 * <p>Dieses Repository erweitert JpaRepository und stellt Methoden zur
 * Datenbankoperationen für Rating-Entitäten bereit. Es ermöglicht das
 * Abrufen, Speichern und Löschen von Bewertungen sowie spezielle Abfragen
 * für benutzer- und rezeptbezogene Bewertungen.</p>
 * 
 * <p>Verfügbare Operationen:</p>
 * <ul>
 *   <li>Standard CRUD-Operationen (Create, Read, Update, Delete)</li>
 *   <li>Suche nach Bewertungen von spezifischen Benutzer-Rezept-Kombinationen</li>
 *   <li>Automatische Generierung von SQL-Queries durch Spring Data JPA</li>
 * </ul>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024-06-12
 */
public interface RatingRepository extends JpaRepository<Rating, Long> {
    
    /**
     * Findet eine Bewertung für eine spezifische Benutzer-Rezept-Kombination.
     * 
     * <p>Diese Methode sucht nach einer Bewertung, die von einem bestimmten
     * Benutzer für ein bestimmtes Rezept abgegeben wurde. Da jeder Benutzer
     * ein Rezept nur einmal bewerten kann, gibt es maximal eine Bewertung
     * pro Benutzer-Rezept-Kombination.</p>
     * 
     * @param user Der Benutzer, dessen Bewertung gesucht wird
     * @param recipe Das Rezept, für das die Bewertung gesucht wird
     * @return Optional mit der gefundenen Bewertung oder empty, falls keine Bewertung existiert
     * 
     * <p>Generierte SQL-Query:</p>
     * <pre>SELECT r FROM Rating r WHERE r.user = ?1 AND r.recipe = ?2</pre>
     */
    Optional<Rating> findByUserAndRecipe(User user, Recipe recipe);
}
