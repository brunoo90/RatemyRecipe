package com.example.RateMyRecipe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.RateMyRecipe.Model.Favorite;
import com.example.RateMyRecipe.Model.Recipe;
import com.example.RateMyRecipe.Model.User;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    Optional<Favorite> findByUserAndRecipe(User user, Recipe recipe);
}
