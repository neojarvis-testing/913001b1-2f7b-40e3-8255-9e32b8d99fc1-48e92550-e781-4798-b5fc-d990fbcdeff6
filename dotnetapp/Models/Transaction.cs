using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId {get;set;}

        [Required]
        [ForeignKey("Account")]
        public int AccountId {get;set;}    

        [Required(ErrorMessage = "Transaction date is required.")]
        public DateTime TransactionDate {get;set;}

        [Required(ErrorMessage = "Transaction type is required.")]
        public string TransactionType {get;set;}

        [Required(ErrorMessage = "Amount is required.")]
        public decimal Amount {get;set;}

        public string? Status {get;set;}   //this is optional

        public string? Description {get;set;}   //this is optional

        public Account? Account {get;set;}
    }
}