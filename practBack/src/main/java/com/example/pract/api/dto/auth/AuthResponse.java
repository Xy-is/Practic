package com.example.pract.api.dto.auth;

import lombok.Getter;
import lombok.Setter;

public class AuthResponse {
    @Getter @Setter
    private String jwt;

    public AuthResponse(String jwt) {
        this.jwt = jwt;
    }

}
