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
        public int UserId {get;set;}  //Primary Key for the user

        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [Required(ErrorMessage = "Email is required.")]
        public string Email {get;set;}

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password {get;set;}

        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, ErrorMessage = "Username cannot exceed 50 characters.")]
        public string Username {get;set;}

        [Required(ErrorMessage = "Mobile number is required.")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string MobileNumber {get;set;}

        [Required(ErrorMessage = "User role is required.")]
        [StringLength(20, ErrorMessage = "User role cannot exceed 20 characters.")]
        public string UserRole {get;set;}

    }
}