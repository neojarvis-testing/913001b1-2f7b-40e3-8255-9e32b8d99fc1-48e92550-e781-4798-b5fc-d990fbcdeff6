import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customernav',
  templateUrl: './customernav.component.html',
  styleUrls: ['./customernav.component.css']
})
export class CustomernavComponent implements OnInit {
   username : string ='';
  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {
    this.username = this.service.getUsername();
  }

  logout(): void {
    // Clear the local storage and navigate to login page
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Navigate to the Post Feedback page
  navigateToPostFeedback(): void {
    this.router.navigate(['/customer/customeraddfeedback']);
  }

  // Navigate to the My Feedbacks page
  navigateToMyFeedbacks(): void {
    this.router.navigate(['/customer/customerviewfeedback']);
  }
}
