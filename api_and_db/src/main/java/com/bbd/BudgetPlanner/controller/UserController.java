package com.bbd.BudgetPlanner.controller;

import java.util.HashMap;
import java.util.Optional;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbd.BudgetPlanner.models.Users;
import com.bbd.BudgetPlanner.repository.UserRepository;

//import jakarta.validation.ConstraintViolationException;
import org.hibernate.exception.ConstraintViolationException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Timestamp;

@RestController
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    //@CrossOrigin(origins = "http://bbdplanner.s3-website-eu-west-1.amazonaws.com")
    @PostMapping("/api/user")
    public ResponseEntity<?> createUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");

        Users user = new Users(email);
        try {
            Users entity = repo.save(user);
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(entity);
        }
        catch (Exception ex) {
            if (ex.getCause() instanceof ConstraintViolationException) {
                ConstraintViolationException constraintEx = (ConstraintViolationException) ex.getCause();
                String constraintName = constraintEx.getConstraintName();
                if (constraintName != null && constraintName.startsWith("unique_email")) {
                    return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Duplicate entry. Please provide unique data.");
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createEntity("message", ex.getMessage()));
        }
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<?> getUser(@Valid @PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Optional<Users> user = repo.findById(id);
        if (user.isPresent()) {
            Users entity = user.get();
            if (email.equals(entity.getEmail())) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(entity);
            }
            String errorMessage = "User id " + id
            + " does not belong to the authenticated user";
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(createEntity("message", errorMessage));
        }
        String errorMessage = "User not found with id: " + id;
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(createEntity("message", errorMessage));
    }

    @GetMapping("/api/usersemail/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("username");

        if (!userEmail.equals(email)) {
            String errorMessage = "Email address " + email
                    + " does not belong to the authenticated user";
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(createEntity("message", errorMessage));
        }

        Optional<Users> user = repo.findByEmail(email);
        if (user.isPresent()) {
            Users entity = user.get();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(entity);
        }
        String errorMessage = "User not found with email: " + email;
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(createEntity("message", errorMessage));
    }

    public HashMap<String, String> createEntity(String x, String y) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put(x, y);
        return map;
    }
}
