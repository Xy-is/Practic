package com.example.pract.api.repo;


import com.example.pract.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String UserName);
    Optional<User> findByEmail(String Email);
}