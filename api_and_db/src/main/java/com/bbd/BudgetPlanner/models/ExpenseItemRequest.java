package com.bbd.BudgetPlanner.models;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ExpenseItemRequest {

    @NotNull(message = "Budget ID is required")
    private Long budgetId;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Expense item name must be less than or equal to 100 characters")
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be greater than or equal to 0")
    @DecimalMax(value = "99999999.0", message = "Price must be less than or equal to 99999999")
    private Double price;

}
