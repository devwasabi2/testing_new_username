package com.bbd.BudgetPlanner.models;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name = "expenseitems")
public class ExpenseItem {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL) // cascade all will save the data from the customer object in the Customer

    @Getter
    @Setter
    @JoinColumn(name = "budgetid")
    private Budget budget; // foreign key

    @ManyToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name = "categoryid")
    private Category category; // foreign key

    @Size(max = 100, message = "Expense item name must be less than or equal to 100 characters")
    @Column(name = "name")
    private String name; // date and time

    @Min(value = 0, message = "Amount must be greater than or equal to 0")
    @Max(value = 99999999, message = "Amount must be less than or equal to 99999999")
    @Column(name = "price")
    private Double price;

    @Column(name = "createdat")
    private Timestamp createdat;

    public ExpenseItem() {
    }

    public ExpenseItem(String name, Double price) {
        this.name = name;
        this.price = price;
        this.createdat = new Timestamp(System.currentTimeMillis());

    }

}