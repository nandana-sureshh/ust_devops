package com.vitacare.userservice.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
    private String role; // Optional for login, required for registration
}
