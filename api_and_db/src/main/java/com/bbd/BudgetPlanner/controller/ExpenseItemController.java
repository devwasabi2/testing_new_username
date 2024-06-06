package com.bbd.BudgetPlanner.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bbd.BudgetPlanner.models.*;
import com.bbd.BudgetPlanner.repository.*;

import jakarta.validation.Valid;

record ExpenseItemDTO() {

}

@RestController
public class ExpenseItemController {

    private final ExpenseItemRepository exRepo;
    private final BudgetRepository budgetRepo;
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepo;
    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    public ExpenseItemController(ExpenseItemRepository exRepo, BudgetRepository budgetRepo,
            CategoryRepository categoryRepo, UserRepository userRepo) {
        this.exRepo = exRepo;
        this.budgetRepo = budgetRepo;
        this.categoryRepo = categoryRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/api/expenseitem")
    ResponseEntity<?> createExpenseItem(@Valid @RequestBody ExpenseItemRequest expenseItemRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");
        Optional<Users> u = userRepo.findByEmail(email);

        Optional<Budget> b = budgetRepo.findById(expenseItemRequest.getBudgetId());
        Optional<Category> c = categoryRepo.findById(expenseItemRequest.getCategoryId());
        if (c.isPresent() && b.isPresent()) {

            if (!b.get().getUser().equals(u.get())) {
                String errorMessage = "Budget item with name: " + b.get().getName()
                        + " does not belong to the authenticated user";
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(createEntity("message", errorMessage));
            }
            ExpenseItem ex = new ExpenseItem(expenseItemRequest.getName(), expenseItemRequest.getPrice());
            ex.setBudget(b.get());
            ex.setCategory(c.get());
            ExpenseItem item = exRepo.save(ex);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(item);
        }

        if (!b.isPresent()) {
            String errorMessage = "Budget not found with ID: " + expenseItemRequest.getBudgetId();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(createEntity("message", errorMessage));
        }

        if (!c.isPresent()) {
            String errorMessage = "Category not found with ID: " + expenseItemRequest.getCategoryId();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(createEntity("message", errorMessage));
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(expenseItemRequest);
    }

    @GetMapping("/api/getitems")
    ResponseEntity<?> getExpenseItems(@RequestParam Long budgetid) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");
        Optional<Users> u = userRepo.findByEmail(email);

        Optional<Budget> budget = budgetRepo.findById(budgetid);

        if (budget.isPresent()) {
            if (!budget.get().getUser().equals(u.get())) {
                String errorMessage = "Budget with name: " + budget.get().getName()
                        + " does not belong to the authenticated user";
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(createEntity("message", errorMessage));
            }

            List<ExpenseItem> ex = exRepo.findByBudget(budget.get());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(ex);
        }
        String errorMessage = "Budget id is invalid";
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(createEntity("message", errorMessage));
    }

    @DeleteMapping("/api/deleteitem")
    ResponseEntity<?> deleteItem(@RequestParam Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaimAsString("username");
        Optional<Users> u = userRepo.findByEmail(email);

        Optional<ExpenseItem> ex = exRepo.findById(id);
        if (ex.isPresent()) {
            if (!ex.get().getBudget().getUser().equals(u.get())) {
                String errorMessage = "Expense item with id: " + id
                        + " does not belong to the authenticated user";
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(createEntity("message", errorMessage));
            }
            ex.ifPresent(
                (e) -> {
                e.setBudget(null);
                e.setCategory(null);
                e.setCreatedat(null);
                });
            exRepo.deleteById(id);
            if (exRepo.existsById(id)) {
                String errorMessage = "Expense item exists but cannot be deleted";
                return ResponseEntity
                        .status(HttpStatus.NOT_ACCEPTABLE)
                        .body(createEntity("message", errorMessage));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(createEntity("message", "Expense item deleted"));
        }
        String errorMessage = "Expense item of id " + id + " does not exist";
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
