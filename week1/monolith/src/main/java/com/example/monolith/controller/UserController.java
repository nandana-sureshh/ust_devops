package com.example.monolith.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.monolith.service.UserService;
import com.example.monolith.model.User;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }
}