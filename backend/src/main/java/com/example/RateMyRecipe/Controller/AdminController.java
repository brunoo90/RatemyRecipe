package com.example.RateMyRecipe.Controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.repositories.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // User sperren (Admin-only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/block/{userId}")
    public ResponseEntity<?> blockUser(@PathVariable Long userId,
                                       @RequestParam int days) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setBlockExpiresAt(LocalDateTime.now().plusDays(days));
        userRepository.save(user);
        return ResponseEntity.ok("User blocked for " + days + " days");
    }

    // Optional: User entsperren
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/unblock/{userId}")
    public ResponseEntity<?> unblockUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setBlockExpiresAt(null);
        userRepository.save(user);
        return ResponseEntity.ok("User unblocked");
    }
}
