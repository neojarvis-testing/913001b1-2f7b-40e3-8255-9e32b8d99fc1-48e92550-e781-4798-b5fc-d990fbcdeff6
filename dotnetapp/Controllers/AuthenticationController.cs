using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Serilog;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

       
        // /// Login endpoint for authentication.
        // /// Accepts login requests and returns a JWT token upon successful authentication.
        // /// </summary>
        // /// <param name="model">LoginModel containing email and password.</param>
        // /// <returns>JWT Token or an error message.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Log.Warning("Invalid login payload received.");
                    return BadRequest(new { Message = "Invalid payload. Please check your input." });
                }

                Log.Information("Login attempt for email: {Email}", model.Email);

                var (status, result) = await _authService.Login(model);
                if (status == 0)
                {
                    Log.Warning("Login failed for email: {Email}. Reason: {Result}", model.Email, result);
                    return Unauthorized(new { Message = result });
                }

                Log.Information("Login successful for email: {Email}. Token issued.", model.Email);
                return Ok(new { Token = result });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error during login for email: {Email}", model.Email);
                return StatusCode(500, new { Message = "An internal error occurred. Please try again later." });
            }
        }

        // / 
        // / Registration endpoint for new user accounts.
        // / Accepts registration requests and creates a new user account upon success.
        // / 
        // / <param name="model">User object containing registration details.</param>
        // / <returns>Success message or an error message.</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Log.Warning("Invalid registration payload received.");
                    return BadRequest(new { Message = "Invalid payload. Please check your input." });
                }

                Log.Information("Registration attempt for email: {Email}", model.Email);

                var (status, message) = await _authService.Registration(model, model.UserRole);
                if (status == 0)
                {
                    Log.Warning("Registration failed for email: {Email}. Reason: {Message}", model.Email, message);
                    return Conflict(new { Message = message });
                }

                Log.Information("Registration successful for email: {Email}", model.Email);
                return Ok(new { Message = message });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error during registration for email: {Email}", model.Email);
                return StatusCode(500, new { Message = "An internal error occurred. Please try again later." });
            }
        }
    }
}
