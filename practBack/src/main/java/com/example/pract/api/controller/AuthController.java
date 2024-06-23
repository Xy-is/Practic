package com.example.pract.api.controller;


//import com.example.pract.api.model.Role;
import com.example.pract.api.dto.auth.AuthRequest;
import com.example.pract.api.dto.auth.AuthResponse;
import com.example.pract.api.model.User;
import com.example.pract.api.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authenticationService;


    public AuthController(AuthService authenticationService) {
        this.authenticationService = authenticationService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User request){
        System.out.println(request);
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/get")
    public ResponseEntity<List<User>> getEmployees(){
        List<User> users = authenticationService.getAll();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(users);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AuthResponse> delete(@PathVariable Long id){
        authenticationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody String role){
        authenticationService.update(id, role);
        return ResponseEntity.ok().build();
    }

}
