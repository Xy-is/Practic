package com.example.pract.api.controller;


//import com.example.pract.api.model.Role;
import com.example.pract.api.dto.auth.AuthRequest;
import com.example.pract.api.dto.auth.AuthResponse;
import com.example.pract.api.model.User;
import com.example.pract.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authenticationService;


    public AuthController(AuthService authenticationService) {
        this.authenticationService = authenticationService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }




}
