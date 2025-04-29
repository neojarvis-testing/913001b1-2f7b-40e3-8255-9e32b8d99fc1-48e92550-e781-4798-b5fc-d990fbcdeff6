using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;



namespace dotnetapp.Services
{
    public interface IFeedbackService
    {

        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId);
        Task<bool> AddFeedback(Feedback feedback);
        Task<bool> DeleteFeedback(int feedbackId);   
        

        // Retrieves all feedback records.
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
 
        //  Retrieves all feedback records for a specific user
        Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId);
 
        //Adds a new feedback entry to the database
        Task<bool> AddFeedback(Feedback feedback);
 
        // Delete a feedback entry by its unique identifier
        Task<bool> DeleteFeedback(int feedbackId);

    }
}
 