package com.example.RateMyRecipe.Model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity-Klasse für Benutzer in der RateMyRecipe-Anwendung.
 * 
 * <p>Diese Klasse repräsentiert einen registrierten Benutzer mit Authentifizierungsdaten,
 * Rollen und Blockierungsfunktionalität. Jeder Benutzer kann Rezepte erstellen, bewerten
 * und zu Favoriten hinzufügen.</p>
 * 
 * <p>Die Klasse verwendet JPA-Annotationen für die Persistierung und Lombok für
 * automatische Getter/Setter-Generierung. Zusätzlich implementiert sie eine
 * Blockierungsfunktion für moderierte Benutzer.</p>
 * 
 * @author RateMyRecipe Team
 * @version 1.0
 * @since 2024
 */
@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class User {

    /**
     * Eindeutige ID des Benutzers, automatisch generiert.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Eindeutiger Benutzername für die Anmeldung.
     * Darf nicht leer sein.
     */
    @NotBlank
    private String username;

    /**
     * Verschlüsseltes Passwort des Benutzers.
     * Darf nicht leer sein.
     */
    @NotBlank
    private String password;

    /**
     * E-Mail-Adresse des Benutzers.
     * Darf nicht leer sein.
     */
    @NotBlank
    private String email;

    /**
     * Set von Rollen, die dem Benutzer zugewiesen sind.
     * Lazy Loading für bessere Performance.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

    /**
     * Zeitpunkt, bis zu dem der Benutzer blockiert ist.
     * Null bedeutet, dass der Benutzer nicht blockiert ist.
     */
    @Column(nullable = true)
    private LocalDateTime blockExpiresAt;

    /**
     * Konstruktor mit grundlegenden Benutzerdaten.
     * 
     * @param username Der Benutzername
     * @param email Die E-Mail-Adresse
     * @param password Das Passwort
     */
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * Prüft, ob der Benutzer aktuell blockiert ist.
     * 
     * <p>Ein Benutzer ist blockiert, wenn blockExpiresAt nicht null ist und
     * der aktuelle Zeitpunkt vor dem Ablaufzeitpunkt liegt.</p>
     * 
     * @return true, wenn der Benutzer blockiert ist, sonst false
     */
    public boolean isBlocked() {
        if (blockExpiresAt == null) {
            return false;
        }
        return LocalDateTime.now().isBefore(blockExpiresAt);
    }

    /**
     * Setzt den Blockierungszeitpunkt für den Benutzer.
     * 
     * @param blockExpiresAt Der Zeitpunkt, bis zu dem der Benutzer blockiert sein soll
     */
    public void setBlockExpiresAt(LocalDateTime blockExpiresAt) {
        this.blockExpiresAt = blockExpiresAt;
    }

    /**
     * Gibt eine String-Repräsentation des Benutzers zurück.
     * 
     * @return String-Repräsentation mit ID, Username und Blockierungsstatus
     */
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", isBlocked=" + isBlocked() +
                '}';
    }
}
