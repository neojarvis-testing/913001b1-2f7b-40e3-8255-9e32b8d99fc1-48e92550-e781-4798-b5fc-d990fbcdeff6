using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using dotnetapp.Models;
using dotnetapp.Services;
using Serilog;

namespace dotnetapp.Controllers
{
    ///api/account
    [ApiController]
    [Route("/api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        // private readonly IAccountService _accountService;

    // public AccountController(IAccountService accountService)
    // {
    //     _accountService = accountService;
    // }


        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public IActionResult GetAllAccounts()
        {
            var accounts = _accountService.GetAllAccounts();
            if (accounts == null || !accounts.Any())
                return NotFound("No accounts found.");

            return Ok(accounts);
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Manager,Customer")]
        public IActionResult GetAccountsByUserId(int userId)
        {
            var accounts = _accountService.GetAccountsByUserId(userId);
            if (accounts == null || !accounts.Any())
                return NotFound("No accounts found for the given user.");

            return Ok(accounts);
        }

        [HttpPost]
       [Authorize(Roles = "Manager,Customer")]
        public IActionResult CreateAccount([FromBody] Account account)
        {
            // Console.WriteLine(JsonConvert.SerializeObject(account));
            // Log.Information("Received Account Data: {@Account}", account);
            if (account.AccountType != "Savings" && account.AccountType != "Current")
                return BadRequest("Invalid account type. Must be 'Savings' or 'Current'.");

            var existingAccounts = _accountService.GetAccountsByUserId(account.UserId);
            if (existingAccounts.Any(a => a.AccountType == account.AccountType))
                return BadRequest("An account of this type already exists for the user.");

            var createdAccount = _accountService.CreateAccount(account);
            return CreatedAtAction(nameof(GetAccountById), new { id = createdAccount.AccountId }, createdAccount);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Customer")]
        public IActionResult GetAccountById(int id)
        {
            var account = _accountService.GetAccountById(id);
            if (account == null)
                return NotFound("Account not found.");

            return Ok(account);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Manager,Customer")]
        public IActionResult UpdateAccount(int id, [FromBody] Account account)
        {
            try
            {
                var updatedAccount = _accountService.UpdateAccount(id, account);
                return Ok(updatedAccount);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Account not found.");
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        public IActionResult DeleteAccount(int id)
        {
            var account = _accountService.GetAccountById(id);
            if (account == null)
                return NotFound("Account not found.");

            _accountService.DeleteAccount(id);
            return NoContent();
        }


        //for uploading a file 

        [HttpPost("upload")]
        [Authorize(Roles = "Manager, Customer")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");
 
            // Validate file type
            string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest("Only jpg, jpeg, and png files are allowed");
 
            try
            {
                // Create a unique filename to prevent overwriting
                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                
                // Calculate paths - adjust these paths according to your project structure
                string webRootPath = Directory.GetCurrentDirectory();
                string uploadPath = Path.Combine(webRootPath, "ClientApp", "src", "assets", "uploads");
                
                // Create directory if it doesn't exist
                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);
                    
                var filePath = Path.Combine(uploadPath, uniqueFileName);
                
                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                
                // Return the relative path that will be stored in the database
                // Just the filename - we'll construct the full path in the frontend
                
                Log.Information($"File uploaded successfully: {uniqueFileName}");
                
                return Ok(new { ImageUrl = $"/assets/uploads/{uniqueFileName}" });
            }
            catch (Exception ex)
            {
                Log.Error($"Error uploading file: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
    
}
