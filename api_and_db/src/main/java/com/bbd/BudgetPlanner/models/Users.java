package com.bbd.BudgetPlanner.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "Email is mandatory")
    @Column(name = "email") 
    private String email;

    @Column(name = "createdat")
    private Timestamp createdat;

    Users() {
    }

    public Users(String email) {
        this.email = email;
        this.createdat = new Timestamp(System.currentTimeMillis());
    }
}
