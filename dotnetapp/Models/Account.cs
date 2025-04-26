using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class Account
    {
        [Key]
        public int AccountId {get;set;}

        [Required]
        [ForeignKey("User")]
        public int UserId {get;set;}  // user id is the foreign key  

        [Required(ErrorMessage = "Accountholder name is required.")]
        public string AccountHolderName{get;set;}

        [Required(ErrorMessage = "AccountType is required.")]
        public string AccountType {get;set;}

        [Required]
        public decimal Balance {get;set;}

        public string? Status {get;set;}  //it is optional

        [Required (ErrorMessage = "Proof is required.")] 
        public string ProofOfIdentity {get;set;} 

        public DateTime? DateCreated {get;set;}  // it is also optional

        public DateTime? LastUpdated {get;set;}   // it is also optional

        public User? User {get;set;} // holds the data of the user that account belongs
    }
}