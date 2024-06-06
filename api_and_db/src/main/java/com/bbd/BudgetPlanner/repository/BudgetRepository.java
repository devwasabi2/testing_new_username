package com.bbd.BudgetPlanner.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bbd.BudgetPlanner.models.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;



@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
   Optional<Budget> findByName(String name);
   List<Budget> findByUser(Users user);
}
