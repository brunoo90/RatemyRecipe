package com.example.RateMyRecipe.Controller;
 
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RateMyRecipe.Model.ERole;
import com.example.RateMyRecipe.Model.Role;
import com.example.RateMyRecipe.Model.User;
import com.example.RateMyRecipe.Security.JwtUtils;
import com.example.RateMyRecipe.Security.UserDetailsImpl;
import com.example.RateMyRecipe.dto.JwtResponse;
import com.example.RateMyRecipe.dto.LoginRequest;
import com.example.RateMyRecipe.dto.MessageResponse;
import com.example.RateMyRecipe.dto.SignupRequest;
import com.example.RateMyRecipe.repositories.RoleRepository;
import com.example.RateMyRecipe.repositories.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
 
 
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
 
    @Autowired
    AuthenticationManager authenticationManager;
 
    @Autowired
    UserRepository userRepository;
 
    @Autowired
    RoleRepository roleRepository;
 
    @Autowired
    PasswordEncoder encoder;
 
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
 
    @Autowired
    JwtUtils jwtUtils;
 
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),
                            request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateToken(request.getUsername());
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles));
        } catch (Exception e) {
            logger.error("Cannot authenticate user: {}", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username or password incorrect!"));
        }
    }
 
    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // create new user account
        User user = new User(
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail());

        // handle roles for the new user
        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            roles.add(roleRepository.findByName(ERole.ROLE_USER).get());
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
                        break;
                    default:
                        roles.add(roleRepository.findByName(ERole.ROLE_USER).get());
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        // Automatisch einloggen und JWT zurückgeben
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(signUpRequest.getUsername());
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> userRoles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userRoles));
    }
}
 
 