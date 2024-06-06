package com.bbd.BudgetPlanner.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "budgets")
public class Budget {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name = "userid")
    private Users user; // foreign key

    @Size(max = 100, message = "Budget name must be less than or equal to 100 characters")
    @Column(name = "name")
    private String name;

    @Min(value = 0, message = "Amount must be greater than or equal to 0")
    @Max(value = 99999999, message = "Amount must be less than or equal to 99999999")
    @Column(name = "amount")
    private Double amount;

    @Column(name = "createdat")
    private Timestamp createdat;

    public Budget() {
    }

    public Budget(String name, Double amount) {
        this.name = name;
        this.amount = amount;
        this.createdat = new Timestamp(System.currentTimeMillis());

    }
}
