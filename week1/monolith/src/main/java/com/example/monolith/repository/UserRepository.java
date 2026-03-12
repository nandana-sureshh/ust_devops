package com.example.monolith.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.monolith.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}