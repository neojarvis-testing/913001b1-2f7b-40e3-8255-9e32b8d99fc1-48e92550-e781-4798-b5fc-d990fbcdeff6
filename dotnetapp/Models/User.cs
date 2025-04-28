using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class User
    {
        [Key]
        public int UserId {get;set;}

        [EmailAddress]
        [Required(ErrorMessage = "Email is required.")]
        public string Email {get;set;}

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password {get;set;}

        [Required(ErrorMessage = "Username is required.")]
        public string Username {get;set;}

        [Required(ErrorMessage = "Mobile number is required.")]
        public string MobileNumber {get;set;}

        [Required(ErrorMessage = "User role is required.")]
        public string UserRole {get;set;}
    }
}