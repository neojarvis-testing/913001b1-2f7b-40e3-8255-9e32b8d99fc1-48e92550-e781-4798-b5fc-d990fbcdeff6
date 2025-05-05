
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
   showLogoutConfirm : boolean = false
  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {
    this.username = this.service.getUsername();
  }

  logout(): void {

    this.showLogoutConfirm = true;

  }

  confirmLogout(): void {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

  cancelLogout(): void {

    this.showLogoutConfirm = false;

  }

  navigateToPostFeedback(): void {

    this.router.navigate(['/customer/customeraddfeedback']);

  }

  navigateToMyFeedbacks(): void {

    this.router.navigate(['/customer/customerviewfeedback']);

  }

}

