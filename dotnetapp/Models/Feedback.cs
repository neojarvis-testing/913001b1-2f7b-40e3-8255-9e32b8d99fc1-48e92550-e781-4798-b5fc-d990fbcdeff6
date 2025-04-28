using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Models
{
     [Index(nameof(UserId) )]            //Index on UserId for faster lookups
    public class Feedback
    {
        [Key]
        public int FeedbackId {get;set;}    //Primary Key for feedback

        [Required]
        [ForeignKey("User")]

        public int UserId {get;set;}       // References the user who gave the feedback 


        [Required(ErrorMessage = "Comments are required.")]
        [StringLength(500, ErrorMessage = "Comments cannot exceed 500 characters.")]
        [Display(Name = "Feedback Comments")]   //makes froms and validation error messages look more professional
        public string Comments{get;set;}    // Text of the feedback

        [Required(ErrorMessage = "Date is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateProvided {get;set;}    // Date when feedback was submitted

        public User? User {get;set;}   //Navigation property to User entity
    }
}