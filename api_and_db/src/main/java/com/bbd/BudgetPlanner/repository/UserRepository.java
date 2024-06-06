package com.bbd.BudgetPlanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbd.BudgetPlanner.models.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
}