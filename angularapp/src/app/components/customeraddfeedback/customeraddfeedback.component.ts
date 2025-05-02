import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';;
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customeraddfeedback',
  templateUrl: './customeraddfeedback.component.html',
  styleUrls: ['./customeraddfeedback.component.css']
})
export class CustomeraddfeedbackComponent {
  feedbackForm: FormGroup;
  showPopup = false; // Controls the popup visibility
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private authservice: AuthService
  ) {
    this.feedbackForm = this.fb.group({
      comments: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedback: any = {
        UserId: +this.authservice.getUserId(),
        Comments: this.feedbackForm.value.comments,
        DateProvided: new Date()
      };
      console.log(feedback)

      this.feedbackService.sendFeedback(feedback).subscribe(
        () => {
          this.showPopup = true; // Show success popup
          this.showErrorMessage = false;
          this.feedbackForm.reset();
        },
        () => {
          this.showErrorMessage = true;
          this.showPopup = false;
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false; // Close popup when clicking "OK"
  }
}
