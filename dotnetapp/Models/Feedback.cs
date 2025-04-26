using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId {get;set;}

        [Required]
        [ForeignKey("User")]
        public string UserId {get;set;}

        [Required(ErrorMessage = "Comments are required.")]
        public string Comments{get;set;}

        [Required(ErrorMessage = "Date is required.")]
        public DateTime DateProvided {get;set;}

        public User? User {get;set;}
    }
}