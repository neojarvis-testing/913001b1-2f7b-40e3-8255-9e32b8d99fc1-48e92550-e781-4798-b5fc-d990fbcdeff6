import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-view-feedback',
  templateUrl: './customerviewfeedback.component.html',
  styleUrls: ['./customerviewfeedback.component.css']
})  
export class CustomerviewfeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  showDeletePopup = false;
  feedbackToDelete: number | null = null;

  constructor(private feedbackService: FeedbackService,private authserice : AuthService) { }

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    const userId = +this.authserice.getUserId();                                                    // Replace with actual user ID
    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe((feedbacks) => {
      this.feedbacks = feedbacks;
      console.log(feedbacks);
    });
  }

  confirmDelete(feedbackId: number) {
    this.feedbackToDelete = feedbackId;
    this.showDeletePopup = true;
  }

  deleteFeedback() {
    if (this.feedbackToDelete) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe(() => {
        this.loadFeedbacks();
        this.closeDeletePopup();
      });
    }
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
    this.feedbackToDelete = null;
  }
}
