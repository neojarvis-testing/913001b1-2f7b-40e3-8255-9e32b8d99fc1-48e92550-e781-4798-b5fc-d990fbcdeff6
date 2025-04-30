import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customeraddfeedback',
  templateUrl: './customeraddfeedback.component.html',
  styleUrls: ['./customeraddfeedback.component.css']
})
export class CustomeraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;                                          // holds form structure
  submitted = false;                                                  // Tracks form submission state
  showSuccessPopup = false;                                             // Controls visibility of success popup

  // Inject FoirmBuilder and Router services
  constructor(private fb: FormBuilder,private router : Router) {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  // getter for easy access to form controls in the templates
  get f() {
    return this.feedbackForm.controls;
  }
 
  // Triggered when the form is submitted
  onSubmit(): void {
    this.submitted = true;
 
    if (this.feedbackForm.invalid) {
      return;
    }
 
    // Simulate API call success
    this.showSuccessPopup = true;
  }
 
  // call when user clicks ok
  onPopupClose(): void {
    this.showSuccessPopup = false;
    this.feedbackForm.reset();
    this.submitted = false;
    this.router.navigate(['/my-feedbacks']);              // Navigates to "My Feedbacks" page
  }

}



