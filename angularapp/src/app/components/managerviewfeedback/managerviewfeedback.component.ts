import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-managerviewfeedback',
    templateUrl: './managerviewfeedback.component.html',
    styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
[x: string]: any;
    feedbacks = []; // Array to store feedbacks
    showProfileModal = false; // Flag to control profile modal visibility
    showLogoutModal = false; // Flag to control logout modal visibility
    userDetails: any; // Object to store user details
  userService: any;

    constructor(private feedbackservice: FeedbackService) {}

    ngOnInit() {
        this.loadFeedbacks(); // Load feedbacks on component initialization
    }

    // Method to load all feedbacks
    loadFeedbacks() {
        this.feedbackservice.getFeedbacks().subscribe(data => {
            this.feedbacks = data;
        });
    }

    // Method to show user profile in a modal
    showProfile(userId: number) {
        this.userService.getUserDetails(userId).subscribe(data => {
            this.userDetails = data;
            this.showProfileModal = true;
        });
    }

    // Method to close the profile modal
    closeProfileModal() {
        this.showProfileModal = false;
    }

    // Method to show the logout confirmation modal
    logout() {
        this.showLogoutModal = true;
    }

    // Method to confirm logout
    confirmLogout() {
        // Implement logout logic here
        this.showLogoutModal = false;
    }

    // Method to close the logout confirmation modal
    closeLogoutModal() {
        this.showLogoutModal = false;
    }
}
