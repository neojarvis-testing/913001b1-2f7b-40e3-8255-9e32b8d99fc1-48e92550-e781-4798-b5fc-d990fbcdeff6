using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            try
            {
                Log.Information("Registration process started for email: {Email}", model.Email);

                // Validate role
                var validRoles = new[] { "Admin", "User" }; // only these roles are valid in the front end regestration part.
                if (!validRoles.Contains(role))
                {
                    Log.Warning("Invalid role specified: {Role}", role);
                    return (0, "Invalid role.");
                }

                // Check if email already exists
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (existingUser != null)
                {
                    Log.Warning("Email already registered: {Email}", model.Email);
                    return (0, "Email already registered.");
                }

                // Hash password
                model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
                model.UserRole = role;

                // Add user to database
                await _context.Users.AddAsync(model);
                await _context.SaveChangesAsync();

                Log.Information("Registration successful for email: {Email}", model.Email);
                return (1, "Registration successful.");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Registration failed for email: {Email}", model.Email);
                return (0, $"Registration failed: {ex.Message}");
            }
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            try
            {
                Log.Information("Login process started for email: {Email}", model.Email);

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    Log.Warning("Invalid email: {Email}", model.Email);
                    return (0, "Invalid email or password.");
                }

                if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                {
                    Log.Warning("Invalid password for email: {Email}", model.Email);
                    return (0, "Invalid email or password.");
                }

                // Generate token
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.UserRole)
                };

                var token = GenerateToken(claims);

                Log.Information("Login successful for email: {Email}", model.Email);
                return (1, token);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Login failed for email: {Email}", model.Email);
                return (0, $"Login failed: {ex.Message}");
            }
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                    signingCredentials: creds
                );

                Log.Information("Token generated successfully.");
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error generating token.");
                throw;
            }
        }
    }
}
