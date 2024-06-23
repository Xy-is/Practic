package com.example.pract.api.service;

import com.example.pract.api.dto.EmployeeDto;
import com.example.pract.api.dto.auth.AuthRequest;
import com.example.pract.api.dto.auth.AuthResponse;
import com.example.pract.api.model.Employee;
import com.example.pract.api.model.Role;
import com.example.pract.api.model.User;
import com.example.pract.api.repo.UserRepo;
import com.example.pract.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.String.valueOf;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private JwtService jwtService;


    private final PasswordEncoder passwordEncoder;

    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public AuthResponse register(User request){
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return null;
        } else {
            // Пользователь с таким email не существует, можно продолжить регистрацию
            var user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(request.getRole());
            userRepository.save(user);
            String token = jwtService.generateToken(user, generateExtraClaims(user));
            return new AuthResponse(token);
        }
    }





    public AuthResponse login(AuthRequest authenticationRequest){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authenticationRequest.getEmail(), authenticationRequest.getPassword()
        );
        authenticationManager.authenticate(authToken);
        System.out.println(authenticationRequest);
        User user = userRepository.findByEmail(authenticationRequest.getEmail()).get();
        String jwt = jwtService.generateToken(user, generateExtraClaims(user));
        return new AuthResponse(jwt);
    }




    private Map<String, Object> generateExtraClaims(User user) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().name());
        return extraClaims;
    }

    public List<User> getAll() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public void delete(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
        }
    }

    public void update(Long id, String role) {
        Optional<User> findingUser = userRepository.findById(id);
        if (findingUser.isPresent()) {
            User existingUser = findingUser.get();
            existingUser.setRole(Role.valueOf(role));
            userRepository.save(existingUser);
        } else {
            System.out.println("Пользователь с ID " + id + " не найден.");
        }
    }
}
