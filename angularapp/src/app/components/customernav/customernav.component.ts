import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customernav',
  templateUrl: './customernav.component.html',
  styleUrls: ['./customernav.component.css']
})
export class CustomernavComponent implements OnInit {

  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {
    // Optionally check for valid login or role here
    // const role = localStorage.getItem('role');
    // const role = this.service.getUserRole();
    // console.log(role);
    // if (role !== 'Customer') {
    //   this.router.navigate(['/login']);
    // }
    // else{
    //   console.log("not match")
    // }
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
