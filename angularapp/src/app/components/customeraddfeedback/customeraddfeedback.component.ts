// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { Feedback } from 'src/app/models/feedback.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-customeraddfeedback',
//   templateUrl: './customeraddfeedback.component.html',
//   styleUrls: ['./customeraddfeedback.component.css']
// })
// export class CustomerAddFeedbackComponent {
//   feedbackForm: FormGroup;
//   showSuccessMessage = false;

//   constructor(
//     private fb: FormBuilder,
//     private feedbackService: FeedbackService,
//     private authService: AuthService
//   ) {
//     this.feedbackForm = this.fb.group({
//       comments: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.feedbackForm.valid) {
//       const userId = +this.authService.getUserId();
//       if (!userId) {
//         alert("User ID is missing. Please log in again.");
//         return;
//       }

//       const feedback: Feedback = {
//         userId = +this.authService.getUserId(),
//         comments: this.feedbackForm.value.comments,
//         dateProvided: new Date()
//       };

//       this.feedbackService.sendFeedback(feedback).subscribe(() => {
//         this.showSuccessMessage = true;
//         this.feedbackForm.reset();
//       },
//         (error) => {
//           console.error("Error submitting feedback:", error);
//           alert("Failed to submit feedback.");
//         }
//       );
//     }
//   }
// }





import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customeraddfeedback',
  templateUrl: './customeraddfeedback.component.html',
  styleUrls: ['./customeraddfeedback.component.css']
})
export class CustomeraddfeedbackComponent {
  feedbackForm: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private authservice : AuthService,
    private router : Router
  ) {
    this.feedbackForm = this.fb.group({
      comments: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedback: Feedback = {
        UserId : +this.authservice.getUserId(), // Replace with the actual user ID
        Comments: this.feedbackForm.value.comments,
        DateProvided: new Date()
      };

      this.feedbackService.sendFeedback(feedback).subscribe(() => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.feedbackForm.reset();
          // this.router.navigate(['customer-view-feedback']);
        },
        () => {
          this.router.navigate(['view-feedback'])
          // this.showErrorMessage = true;
          // this.showSuccessMessage = false;
        }
      );
    }
  }
}
