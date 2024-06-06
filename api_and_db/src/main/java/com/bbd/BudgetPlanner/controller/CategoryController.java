package com.bbd.BudgetPlanner.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.bbd.BudgetPlanner.models.Category;
import com.bbd.BudgetPlanner.repository.CategoryRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;

@RestController
public class CategoryController {

    private final CategoryRepository repo;

    public CategoryController(CategoryRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/api/categories")
    public ResponseEntity<?> allCategories() {
        List<Category> categories = repo.findAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categories);
    }

    @GetMapping("/api/category/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {
        Optional<Category> c = repo.findById(id);
        if (c.isPresent()) {
            Category cat = c.get();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(cat);
        }
        String errorMessage = "Category not found with id: " + id;
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(createEntity("message", errorMessage));
    }

    @PostMapping("/api/category")
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody Category category) {
        Category entity = repo.save(category);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(entity);
    }

    public HashMap<String, String> createEntity(String x, String y) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put(x, y);
        return map;
    }
}
