// import { Component, OnInit } from '@angular/core';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { Feedback } from 'src/app/models/feedback.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-customer-view-feedback',
//   templateUrl: './customerviewfeedback.component.html',
//   styleUrls: ['./customerviewfeedback.component.css']
// })  
// export class CustomerviewfeedbackComponent implements OnInit {
//   feedbacks: any[] = [];
//   showDeletePopup = false;
//   feedbackToDelete: number | null = null;

//   constructor(private feedbackService: FeedbackService,private authserice : AuthService) { }

//   ngOnInit() {
//     this.loadFeedbacks();
//   }

//   loadFeedbacks() {
//     const userId = +this.authserice.getUserId();                                                    // Replace with actual user ID
//     this.feedbackService.getAllFeedbacksByUserId(userId).subscribe((feedbacks) => {
//       this.feedbacks = feedbacks;
//       console.log(feedbacks);
//     });
//   }

//   confirmDelete(feedbackId: number) {
//     this.feedbackToDelete = feedbackId;
//     this.showDeletePopup = true;
//   }

//   deleteFeedback() {
//     if (this.feedbackToDelete) {
//       this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe(() => {
//         this.loadFeedbacks();
//         this.closeDeletePopup();
//       });
//     }
//   }

//   closeDeletePopup() {
//     this.showDeletePopup = false;
//     this.feedbackToDelete = null;
//   }
// }



import { Component, OnDestroy, OnInit } from '@angular/core';
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
  userId: number = 0; // **Added a property to store the user ID**
  isLoading = false;

  constructor(private feedbackService: FeedbackService, private authService: AuthService) { } // **Fixed typo in 'authService'**

  ngOnInit() {
    this.userId = this.getValidatedUserId(); // **Ensuring valid user ID**
    this.loadFeedbacks();
  }

  getValidatedUserId(): number {
    const id = +this.authService.getUserId(); // **Ensuring numeric conversion**
    return isNaN(id) ? 0 : id; // **Validating the result**
  }

  // loadFeedbacks() {
  //   if (this.userId > 0) { // **Ensure valid user ID before making API call**

  //     this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe((feedbacks) => {
  //       this.feedbacks = feedbacks;
  //       console.log(feedbacks);
  //     });
  //   } else {
  //     console.warn('Invalid User ID');
  //   }
  // }

  loadFeedbacks() {
    if (this.userId > 0) {
        this.isLoading = true; // Show loading spinner

        this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe(
            (feedbacks) => {
                this.feedbacks = feedbacks;
                this.isLoading = false; // Hide loading spinner after fetching
            },
            (error) => {
                console.error("Error fetching feedback", error);
                this.isLoading = false; // Hide spinner on error
            }
        );
    } else {
        console.warn('Invalid User ID');
    }
}



  confirmDelete(feedbackId: number) {
    this.feedbackToDelete = feedbackId;
    this.showDeletePopup = true;
  }

  deleteFeedback() {
    if (this.feedbackToDelete) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe((data) => {
        console.log("Delete responce",data);
        this.loadFeedbacks();
        this.closeDeletePopup();
      },
      (error) => {
        this.loadFeedbacks();
        this.closeDeletePopup();
      }
      );
    }
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
    this.feedbackToDelete = null;
  }
}
