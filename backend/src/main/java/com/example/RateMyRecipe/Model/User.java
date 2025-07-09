package com.example.RateMyRecipe.Model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long Id;
    @NotBlank
    private  String username;
    @NotBlank
    private  String password;
    @NotBlank
    private  String email;
 
    public User(String name, String email, String password) {
        this.username = name;
        this.email = email;
        this.password = password;

}

    @ManyToMany(fetch= jakarta.persistence.FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

    @Column(nullable = true)
    private java.time.LocalDateTime blockExpiresAt;

    public boolean isBlocked() {
    if (blockExpiresAt == null) return false;
    return java.time.LocalDateTime.now().isBefore(blockExpiresAt);
}

    public void setBlockExpiresAt(java.time.LocalDateTime blockExpiresAt) {
    this.blockExpiresAt = blockExpiresAt;
}
}
