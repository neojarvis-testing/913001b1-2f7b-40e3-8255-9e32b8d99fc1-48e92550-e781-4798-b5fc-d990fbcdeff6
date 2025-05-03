import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';;
import { AuthService } from 'src/app/services/auth.service';
import { Feedback } from 'src/app/models/feedback.model';


@Component({
  selector: 'app-customeraddfeedback',
  templateUrl: './customeraddfeedback.component.html',
  styleUrls: ['./customeraddfeedback.component.css']
})
export class CustomeraddfeedbackComponent {
  feedbackForm: FormGroup;
  showPopup: boolean = false; // Controls the popup visibility
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
      const feedback: Feedback = {
        UserId: +this.authservice.getUserId(),
        Comments: this.feedbackForm.value.comments,
        DateProvided: new Date()
      };
      console.log(feedback)

      this.feedbackService.sendFeedback(feedback).subscribe(
        (data) => {
          console.log("feedback submitted", data);
          this.showPopup = true; // Show success popup  
          this.feedbackForm.reset();
        },
        (error) => {
          this.showErrorMessage = false;
          this.showPopup = true; // Show success popup  
          this.feedbackForm.reset();
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false; // Close popup when clicking "OK"
  }
}
