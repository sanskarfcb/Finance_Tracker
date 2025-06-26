package com.financeapp.backend.Service;

import com.financeapp.backend.Model.Transaction;
import com.financeapp.backend.Model.User;
import com.financeapp.backend.Repo.TransactionRepo;
import com.financeapp.backend.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final UserRepo userRepo;

    public Transaction addTransaction(Transaction transaction, String email) {
        System.out.println("📧 Email received in addTransaction(): " + email);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        transaction.setUser(user);
        if (transaction.getDate() == null) transaction.setDate(LocalDate.now());
        return transactionRepo.save(transaction);
    }

    public List<Transaction> getallTransaction(String email){
        User user = userRepo.findByEmail(email).orElseThrow();
        return transactionRepo.findByUserId(user.getId());
    }
    public void deleteTransaction(Long id , String email){
        Transaction trans = transactionRepo.findById(id).orElseThrow();
        if(!trans.getUser().getEmail().equals(email)){
            throw new RuntimeException("Unauthorized access");
        }
        transactionRepo.deleteById(id);
    }
}
