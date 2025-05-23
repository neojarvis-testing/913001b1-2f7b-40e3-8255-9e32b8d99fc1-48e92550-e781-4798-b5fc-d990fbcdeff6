using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using dotnetapp.Data;
using dotnetapp.Models;


namespace dotnetapp.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly ApplicationDbContext _context;
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks
            .Include(f => f.User)
            .ToListAsync();
        }
        
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks
            .Where(f => f.UserId == userId)
            .ToListAsync();
        }
        
        public async Task<bool> AddFeedback(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            return await _context.SaveChangesAsync() > 0;
        }
        
        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback == null)
            {
                return false;
            }
            
            _context.Feedbacks.Remove(feedback);
            return await _context.SaveChangesAsync() > 0;
        }


    }
}