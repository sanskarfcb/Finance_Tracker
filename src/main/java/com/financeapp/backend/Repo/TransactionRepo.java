package com.financeapp.backend.Repo;

import com.financeapp.backend.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepo extends JpaRepository<Transaction,Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserIdAndCategory(Long userId,String category);


}
