using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress]
        public string Email {get;set;}

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password {get;set;}
    }
}