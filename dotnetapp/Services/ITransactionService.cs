using System.Collections.Generic;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface ITransactionService
    {
        IEnumerable<Transaction> GetTransactions();
        Transaction GetTransactionById(int transactionId);
        Transaction CreateTransaction(Transaction transaction);
        Transaction UpdateTransactionByManager(int transactionId, Transaction updatedTransaction);
        IEnumerable<Transaction> GetTransactionsByUserId(int userId);
    }
}
