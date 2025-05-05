import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
  feedbacks: any[] = []; // Array to store feedbacks
  showProfileModal = false; // Flag to control profile modal visibility
  selectedUser: any = null; // Stores selected user details
  isLoading = false;

  constructor(private feedbackservice: FeedbackService) {}

  ngOnInit() {
    this.loadFeedbacks(); // Load feedbacks on component initialization
  }

  // Load all feedbacks directly
  // loadFeedbacks() {
  //   this.feedbackservice.getFeedbacks().subscribe(data => {
  //     this.feedbacks = data;
  //     console.log(this.feedbacks);
  //   });
  // }
  loadFeedbacks() {
    this.isLoading = true;

    this.feedbackservice.getFeedbacks().subscribe({
        next: (data) => {
            this.feedbacks = data;

            // Delay UI update slightly to ensure change detection
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
        },
        error: (err) => {
            console.error('Error fetching feedbacks:', err);
            this.isLoading = false;
        }
    });
}



  // Show profile from feedback object instead of service
  showProfile(feedback: any) {
    console.log(feedback.user);
    this.selectedUser = feedback.user; // Get user details from feedback
    console.log(this.selectedUser);
    this.showProfileModal = true;
  }

  // Close profile modal
  closeProfileModal() {
    this.showProfileModal = false;
  }
}
