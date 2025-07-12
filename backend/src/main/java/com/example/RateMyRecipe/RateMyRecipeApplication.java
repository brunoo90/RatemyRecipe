package com.example.RateMyRecipe;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
 
import com.example.RateMyRecipe.Model.ERole;
import com.example.RateMyRecipe.Model.Role;
import com.example.RateMyRecipe.repositories.RoleRepository;
 
@SpringBootApplication
@EnableMethodSecurity
public class RateMyRecipeApplication implements CommandLineRunner {
 
    @Autowired
    private RoleRepository roleRepository;
 
    public static void main(String[] args) {
        SpringApplication.run(RateMyRecipeApplication.class, args);
    }
 
    @Override
    public void run(String... args) throws Exception{
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
    }
 
}
