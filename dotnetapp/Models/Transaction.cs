using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Models
{
    [Index(nameof(AccountId), Name= "IX_Transaction_AccountId")]  // Create a index on AccountId for faster quering
    public class Transaction
    {
        [Key]
        public int TransactionId {get;set;}

        [Required(ErrorMessage = "AccountId is required.")]  //foreign key must not be empty
        [ForeignKey("Account")]
        public int AccountId {get;set;}    

        [Required(ErrorMessage = "Transaction date is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]  // Display and edit formate for the date
        public DateTime TransactionDate {get;set;}

        [Required(ErrorMessage = "Transaction type is required.")]
        [StringLength(50, ErrorMessage = "Transaction type cannot exceed 50 characters.")]
        public string TransactionType {get;set;}

        [Required(ErrorMessage = "Amount is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public decimal Amount {get;set;}

        [StringLength(50, ErrorMessage = "Status cannot exceed 50 characters.")]
        public string? Status {get;set;}   //Made nullable fro optionality

        [StringLength(255, ErrorMessage="Description cannot exceed 255 characters.")]
        public string? Description {get;set;}   //Made nullable for optionality

        public Account? Account {get;set;}  // Navgation property to the related Account
    }
}