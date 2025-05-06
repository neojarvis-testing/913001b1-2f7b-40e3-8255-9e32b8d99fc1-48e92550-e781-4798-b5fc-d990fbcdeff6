using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject database context
        public TransactionService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieves all transactions, ensures transactions exist before returning
        public IEnumerable<Transaction> GetTransactions()
        {
            var transactions = _context.Transactions.Include(t => t.Account).ToList();
            if (transactions.Any()) return transactions;

            throw new Exception("No transactions found.");
        }

        // Retrieves transactions for a specific user
        public IEnumerable<Transaction> GetTransactionsByUserId(int userId)
        {
            var userTransactions = _context.Transactions.Include(t => t.Account)
                .Where(t => t.Account.UserId == userId).ToList();

            if (userTransactions.Any()) return userTransactions;

            throw new Exception($"No transactions found for user ID {userId}.");
        }

        // Retrieves a transaction by its unique ID
        public Transaction GetTransactionById(int transactionId)
        {
            var transaction = _context.Transactions.Include(t => t.Account)
                .FirstOrDefault(t => t.TransactionId == transactionId);

            if (transaction != null) return transaction;

            throw new Exception($"Transaction with ID {transactionId} not found.");
        }

        // Creates a new transaction after validation
        public Transaction CreateTransaction(Transaction transaction)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountId == transaction.AccountId);
            if (account == null) throw new Exception("Account not found.");

            if (transaction.TransactionType == "Deposit" || transaction.TransactionType == "Withdrawal")
            {
                if (transaction.TransactionType == "Withdrawal" && account.Balance < transaction.Amount)
                {
                    throw new InsufficientBalanceException("Insufficient balance.");
                }

                // Assign status based on transaction amount
                transaction.Status = transaction.Amount > 10000 ? "Processing" : "Completed";
                transaction.TransactionDate = DateTime.UtcNow;

                if (transaction.TransactionType == "Deposit" && transaction.Amount == 1000.00m)
                {
                    transaction.Description = "Initial deposit.";
                }

                _context.Transactions.Add(transaction);
                _context.SaveChanges();

                if (transaction.Status == "Completed")
                {
                    ProcessTransaction(transaction);
                }

                return transaction;
            }

            throw new Exception("Invalid transaction type. Only Deposit or Withdrawal allowed.");
        }

        // Updates a transaction by manager with proper SQL transaction handling
        public Transaction UpdateTransactionByManager(int transactionId, Transaction updatedTransaction)
        {
            using (var transactionScope = _context.Database.BeginTransaction())
            {
                try
                {
                    var existingTransaction = _context.Transactions.Include(t => t.Account)
                        .FirstOrDefault(t => t.TransactionId == transactionId);

                    if (existingTransaction == null)
                        throw new Exception("Transaction not found.");

                    if (existingTransaction.Status == "Completed")
                        throw new Exception("Cannot update a completed transaction.");

                    // Update transaction details
                    existingTransaction.Amount = updatedTransaction.Amount;
                    existingTransaction.TransactionType = updatedTransaction.TransactionType;
                    existingTransaction.Description = updatedTransaction.Description;
                    existingTransaction.Status = updatedTransaction.Status;

                    if (existingTransaction.Status == "Approved")
                    {
                        ProcessTransaction(existingTransaction);
                    }
                    else if (existingTransaction.Status == "Rejected")
                    {
                        existingTransaction.Description = "Transaction rejected by manager.";
                    }

                    _context.Transactions.Update(existingTransaction);
                    _context.SaveChanges();
                    transactionScope.Commit(); // ✅ Ensures atomicity

                    return existingTransaction;
                }
                catch (Exception ex)
                {
                    transactionScope.Rollback(); // ❌ Prevents partial updates
                    throw new Exception($"Transaction failed: {ex.Message}");
                }
            }
        }

        // Processes transaction logic (updates account balance)
        private void ProcessTransaction(Transaction transaction)
        {
            using (var transactionScope = _context.Database.BeginTransaction())
            {
                try
                {
                    var account = transaction.Account ?? _context.Accounts
                        .FirstOrDefault(a => a.AccountId == transaction.AccountId);

                    if (account == null)
                        throw new Exception("Account not found for processing.");

                    if (transaction.TransactionType == "Deposit")
                    {
                        account.Balance += transaction.Amount;
                        transaction.Description = $"Deposited {transaction.Amount} successfully.";
                    }
                    else if (transaction.TransactionType == "Withdrawal")
                    {
                        if (account.Balance >= transaction.Amount)
                        {
                            account.Balance -= transaction.Amount;
                            transaction.Description = $"Withdrawn {transaction.Amount} successfully.";
                        }
                        else
                        {
                            throw new Exception("Insufficient balance.");
                        }
                    }

                    transaction.Status = "Completed";
                    _context.Accounts.Update(account);
                    _context.Transactions.Update(transaction);
                    _context.SaveChanges();

                    transactionScope.Commit(); // ✅ Commits changes atomically
                }
                catch (Exception ex)
                {
                    transactionScope.Rollback(); // ❌ Prevents partial updates
                    throw new Exception($"Processing failed: {ex.Message}");
                }
            }
        }
    }
}
