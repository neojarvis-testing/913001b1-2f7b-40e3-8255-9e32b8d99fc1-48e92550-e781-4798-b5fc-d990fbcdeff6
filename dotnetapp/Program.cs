using System;
using System.IO;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Serilog;

 
var builder = WebApplication.CreateBuilder(args);
 
// Configure Serilog for logging to a file
var logsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Logs");
if (!Directory.Exists(logsDirectory))
{
    Directory.CreateDirectory(logsDirectory);
}
var logFilePath = Path.Combine(logsDirectory, "app.log");
 
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.File(logFilePath, rollingInterval: RollingInterval.Day)
    .CreateLogger();
 
builder.Host.UseSerilog();
 
// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
 
// Add Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("myconnection")));
 
// Register Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITransactionService, TransactionService>(); // Fixes missing interface
 
var app = builder.Build();
 
// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();
 
app.MapControllers();
 
app.Run();