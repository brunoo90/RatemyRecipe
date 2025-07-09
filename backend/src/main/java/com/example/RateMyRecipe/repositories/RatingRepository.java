package com.example.RateMyRecipe.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.RateMyRecipe.Model.Rating;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUserAndRecipe(User user, Recipe recipe);
}
