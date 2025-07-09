package com.example.RateMyRecipe;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.example.RateMyRecipe.Model.User;

public class UserModelTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User("testuser", "test@example.com", "password123");
        user.setId(1L);
    }

    @Test
    void testUserCreation() {
        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
        assertEquals(1L, user.getId());
    }

    @Test
    void testUserUpdate() {
        user.setUsername("updateduser");
        user.setEmail("updated@example.com");
        user.setPassword("newpassword");

        assertEquals("updateduser", user.getUsername());
        assertEquals("updated@example.com", user.getEmail());
        assertEquals("newpassword", user.getPassword());
    }

    @Test
    void testUserBlocking() {
        // Test dass User standardmäßig nicht blockiert ist
        assertFalse(user.isBlocked());

        // Test dass User blockiert werden kann
        LocalDateTime futureBlock = LocalDateTime.now().plusHours(1);
        user.setBlockExpiresAt(futureBlock);
        assertTrue(user.isBlocked());

        // Test dass Blockierung abläuft
        LocalDateTime pastBlock = LocalDateTime.now().minusHours(1);
        user.setBlockExpiresAt(pastBlock);
        assertFalse(user.isBlocked());

        // Test dass null Blockierung bedeutet nicht blockiert
        user.setBlockExpiresAt(null);
        assertFalse(user.isBlocked());
    }

    @Test
    void testUserRoles() {
        // Test dass User standardmäßig leere Rollen hat
        assertNotNull(user.getRoles());
        assertEquals(0, user.getRoles().size());

        // Hier könnten wir Rollen hinzufügen und testen
        // wenn das Role-Model verfügbar ist
    }

    @Test
    void testUserValidation() {
        // Test dass alle erforderlichen Felder gesetzt sind
        assertNotNull(user.getUsername());
        assertNotNull(user.getEmail());
        assertNotNull(user.getPassword());
        assertNotNull(user.getId());
    }

    @Test
    void testUserConstructor() {
        User newUser = new User("newuser", "new@example.com", "newpass");
        
        assertEquals("newuser", newUser.getUsername());
        assertEquals("new@example.com", newUser.getEmail());
        assertEquals("newpass", newUser.getPassword());
    }
} 