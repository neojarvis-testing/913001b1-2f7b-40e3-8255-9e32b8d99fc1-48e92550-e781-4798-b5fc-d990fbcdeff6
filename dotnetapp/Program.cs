using System;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()

    .Enrich.FromLogContext()
    .WriteTo.File(logFilePath, rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add Serilog to logging
builder.Logging.ClearProviders();
builder.Logging.AddSerilog();

    .WriteTo.File(Path.Combine(Directory.GetCurrentDirectory(), "Logs", "app.log"), rollingInterval: RollingInterval.Day)
    .CreateLogger();

// Add Serilog to the hosting pipeline
builder.Host.UseSerilog();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("myconnection")));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<AccountService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable Serilog request logging middleware
app.UseSerilogRequestLogging();

app.UseHttpsRedirection();


app.UseAuthentication();

app.UseAuthorization();
app.MapControllers();

app.Run();
