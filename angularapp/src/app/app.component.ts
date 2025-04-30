import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; // Ensure you have an AuthService to manage roles

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMainNavbar = true;

  constructor(private authService: AuthService) {
    this.checkUserRole();
  }

  checkUserRole() {
    const userRole = this.authService.getUserRole(); // Assuming this method returns 'customer' or 'manager'
    this.showMainNavbar = !(userRole === 'customer' || userRole === 'manager');
  }
}