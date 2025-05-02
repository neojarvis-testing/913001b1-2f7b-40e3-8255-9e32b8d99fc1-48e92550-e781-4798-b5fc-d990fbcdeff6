// import { Component } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
// import { FeedbackService } from 'src/app/services/feedback.service';

// @Component({
//   selector: 'app-customeraddfeedback',
//   templateUrl: './customeraddfeedback.component.html',
//   styleUrls: ['./customeraddfeedback.component.css']
// })
// export class CustomeraddfeedbackComponent {
//   feedbackMessage = '';
//   showSuccessPopup = false;
//   userId: string = localStorage.getItem('userId') || '';

//   constructor(private feedbackService: FeedbackService) { }

//   submitFeedback(): void {
//     if (!this.feedbackMessage.trim()) {
//       alert('Feedback is required.');
//       return;
//     }

//     const feedback: Feedback = { userId: this.userId, message: this.feedbackMessage };
//     this.feedbackService.sendFeedback(feedback).subscribe(() => {
//       this.showSuccessPopup = true;
//     });
//   }

//   closePopup(): void {
//     this.showSuccessPopup = false;
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
          this.router.navigate(['customer-view-feedback'])
          // this.showErrorMessage = true;
          // this.showSuccessMessage = false;
        }
      );
    }
  }
}
