package com.financeapp.backend.Controller;

import com.financeapp.backend.Model.Transaction;
import com.financeapp.backend.Service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction , Principal principal){
        return ResponseEntity.ok(transactionService.addTransaction(transaction, principal.getName()));

    }
    @GetMapping
    public ResponseEntity<List<Transaction>> getAll(Principal principal){
        return ResponseEntity.ok(transactionService.getallTransaction(principal.getName()));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id , Principal principal){
        transactionService.deleteTransaction(id,principal.getName());
        return ResponseEntity.noContent().build();
    }
}
