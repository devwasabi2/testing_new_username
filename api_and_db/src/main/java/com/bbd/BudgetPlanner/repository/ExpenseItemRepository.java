package com.bbd.BudgetPlanner.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bbd.BudgetPlanner.models.*;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseItemRepository extends JpaRepository<ExpenseItem, Long> {
    List<ExpenseItem> findByBudget(Budget budget);
}