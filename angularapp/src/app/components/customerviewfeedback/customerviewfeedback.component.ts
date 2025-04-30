import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-customer-view-feedback',
  templateUrl: './customerviewfeedback.component.html',
  styleUrls: ['./customerviewfeedback.component.css']
})  
export class CustomerviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  showDeletePopup = false;
  feedbackToDelete: string | null = null;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    const userId = 'currentUserId';                                                    // Replace with actual user ID
    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe((feedbacks) => {
      this.feedbacks = feedbacks;
    });
  }

  confirmDelete(feedbackId: string) {
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
