using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required.")]   // Validation to make email field mandatory.
        [EmailAddress (ErrorMessage = "Invalid email format.")] //Checks if input is a valid email address
        [StringLength(100, ErrorMessage ="Email cannot exceed 100 character.")]  // limit email length.
        public string Email {get;set;}

        [Required(ErrorMessage = "Password is required.")]  //validation to make password field mandatory.
        [DataType(DataType.Password)]   // Specifies that input type should be password
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters.")] //Enforce password length rules
        public string Password {get;set;}
    }
}