using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{
    [Index(nameof(UserId))]            //Index on UserId for faster lookups
 
    public class Account
    {
        [Key]
        public int AccountId {get;set;}

        [Required]
        [ForeignKey("User")]
        [Range(1, int.MaxValue, ErrorMessage= "UserId must be greater than 0.")]
        public int UserId {get;set;}  // user id is the foreign key  

        [Required(ErrorMessage = "Accountholder name is required.")]
        [StringLength(100, ErrorMessage = "Accountholder cannot exceed 100 characters.")]
        public string AccountHolderName{get;set;}

        [Required(ErrorMessage = "AccountType is required.")]
        [StringLength(50, ErrorMessage = "AccountType cannot exceed 50 characters.")]
        public string AccountType {get;set;}

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Balance cannot be negative.")]
        public decimal Balance {get;set;}


        [StringLength(50, ErrorMessage = "Status cannot exceed 50 characters.")]
        public string? Status {get;set;}  //it is optional

        [Required (ErrorMessage = "ProoOfIdentity is required.")]
        [StringLength(255, ErrorMessage = "ProofOfIdentity cannot exceed 255 characters.")] 
        public string ProofOfIdentity {get;set;} 

        public DateTime? DateCreated {get;set;}  // it is also optional

        public DateTime? LastUpdated {get;set;}   // it is also optional

        public User? User {get;set;} // holds the data of the user that account belongs
    }
}