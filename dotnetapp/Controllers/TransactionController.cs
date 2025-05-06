using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Services;
using dotnetapp.Models;
using Serilog;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public IActionResult GetTransactions()
        {
            try
            {
                var transactions = _transactionService.GetTransactions();
                Log.Information("Retrieved {TransactionCount} transactions successfully.", transactions.Count());
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error retrieving transactions.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Customer,Manager")]
        public IActionResult CreateTransaction([FromBody] Transaction transaction)
        {
            try
            {
                // Since `ITransactionService` does not provide account details, balance validation is removed
                var createdTransaction = _transactionService.CreateTransaction(transaction);
                
                Log.Information("Transaction created successfully: Type: {TransactionType}, Amount: {Amount}", createdTransaction.TransactionType, createdTransaction.Amount);
                return CreatedAtAction(nameof(GetTransactionById), new { id = createdTransaction.TransactionId }, createdTransaction);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error creating transaction.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("manager/{id}")]
        [Authorize(Roles = "Manager,Customer")]
        public IActionResult UpdateTransactionByManager(int id, [FromBody] Transaction updatedTransaction)
        {
            try
            {
                var transaction = _transactionService.UpdateTransactionByManager(id, updatedTransaction);
                Log.Information("Transaction updated successfully by Manager. TransactionId: {TransactionId}", id);
                return Ok(transaction);
            }
            catch (ArgumentException ex)
            {
                Log.Warning("Invalid transaction update attempt by Manager: {TransactionId}. Error: {ErrorMessage}", id, ex.Message);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error updating transaction: {TransactionId}", id);
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("customer/{userId}")]
        [Authorize(Roles = "Customer,Manager")]
        public IActionResult GetTransactionsByUserId(int userId)
        {
            try
            {
                var transactions = _transactionService.GetTransactionsByUserId(userId);
                Log.Information("Retrieved {TransactionCount} transactions for UserId: {UserId}.", transactions.Count(), userId);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error retrieving transactions for UserId: {UserId}", userId);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetTransactionById(int id)
        {
            try
            {
                var transaction = _transactionService.GetTransactionById(id);
                if (transaction == null)
                {
                    Log.Warning("Transaction not found: {TransactionId}", id);
                    return NotFound();
                }
                Log.Information("Retrieved transaction successfully: {TransactionId}", id);
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error retrieving transaction: {TransactionId}", id);
                return StatusCode(500, "Internal Server Error");
            }
        }

        
    }
}


