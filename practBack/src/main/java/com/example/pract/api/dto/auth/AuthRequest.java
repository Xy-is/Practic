package com.example.pract.api.dto.auth;

import lombok.Getter;
import lombok.Setter;

public class AuthRequest {
    @Getter
    @Setter
    private String username;
    @Getter
    @Setter
    private String password;

}
