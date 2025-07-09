package com.example.RateMyRecipe.repositories;

import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.RateMyRecipe.Model.ERole;
import com.example.RateMyRecipe.Model.Role;
 
 
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
 
    Optional<Role> findByName(ERole name);
    
}
 