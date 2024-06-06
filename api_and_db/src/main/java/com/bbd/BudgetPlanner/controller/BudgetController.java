package com.bbd.BudgetPlanner.controller;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.FieldError;
//import org.springframework.web.bind.annotation.CrossOrigin;

import com.bbd.BudgetPlanner.models.*;
import com.bbd.BudgetPlanner.repository.*;

import jakarta.validation.Valid;

@RestController
public class BudgetController {

    private final BudgetRepository budgetRepo;
    private final UserRepository userRepo;

    public BudgetController(BudgetRepository budgetRepo, UserRepository userRepo) {
        this.budgetRepo = budgetRepo;
        this.userRepo = userRepo;
    }

    //@CrossOrigin(origins = "http://bbdplanner.s3-website-eu-west-1.amazonaws.com")
    @GetMapping("/api/usersbudgets")
    ResponseEntity<?> getAllUsersBudgets() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");

        Optional<Users> u = userRepo.findByEmail(email);
        if (u.isPresent()) {
            List<Budget> b = budgetRepo.findByUser(u.get());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(b);
        }
        String errorMessage = "User not found with id: " + u.get().getId();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(createEntity("message", errorMessage));
    }

    //@CrossOrigin(origins = "http://bbdplanner.s3-website-eu-west-1.amazonaws.com")
    @GetMapping("/api/usersbudget/{id}")
    ResponseEntity<?> getBudget(@PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");
        Optional<Users> u = userRepo.findByEmail(email);

        Optional<Budget> b = budgetRepo.findById(id);

        if (b.isPresent()) {
            Budget budget = b.get();

            if (!budget.getUser().getId().equals(u.get().getId())) {
                String errorMessage = "Budget with id: " + id + " does not belong to the authenticated user";
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(createEntity("message", errorMessage));
            }

            Budget entity = b.get();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(entity);
        }
        String errorMessage = "Budget not found with id: " + id;
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(createEntity("message", errorMessage));
    }

    //@CrossOrigin(origins = "http://bbdplanner.s3-website-eu-west-1.amazonaws.com")
    @GetMapping("/api/budgetbyname/{name}")
    public ResponseEntity<?> getBudgetByName(@PathVariable String name) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");
        Optional<Users> u = userRepo.findByEmail(email);

        Optional<Budget> b = budgetRepo.findByName(name);

        if (b.isPresent()) {

            Budget budget = b.get();

            if (!budget.getUser().getId().equals(u.get().getId())) {
                String errorMessage = "Budget with name: " + name + " does not belong to the authenticated user";
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(createEntity("message", errorMessage));
            }

            Budget entity = b.get();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(entity);
        }
        String errorMessage = "Budget not found with name: " + name;
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(createEntity("message", errorMessage));
    }

    //@CrossOrigin(origins = "http://bbdplanner.s3-website-eu-west-1.amazonaws.com")
    @PostMapping("/api/budget")
    ResponseEntity<?> createBudget(@Valid @RequestBody Budget budgetRequest) {
        {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String email = jwt.getClaimAsString("username");

            Budget budget = new Budget(budgetRequest.getName(), budgetRequest.getAmount());

            Optional<Users> user = userRepo.findByEmail(email);

            if (user.isPresent()) {
                budget.setUser(user.get());
                Budget b = budgetRepo.save(budget);
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(b);
            }

            String errorMessage = "Number of budget name characters have been exceeded";
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(createEntity("message", errorMessage));
        }
    }

    public HashMap<String, String> createEntity(String x, String y) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put(x, y);
        return map;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
