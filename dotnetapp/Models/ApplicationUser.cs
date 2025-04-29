using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(30, ErrorMessage = "Name cannot exceed 30 characters.")]
        [Display(Name = "Full Name")]
        public string? Name {get;set;}   // Stores the user's full name


    }
}