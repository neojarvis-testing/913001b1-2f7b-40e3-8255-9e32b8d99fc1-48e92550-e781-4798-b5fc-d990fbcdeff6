// import { Component } from '@angular/core';
// import { AuthService } from './services/auth.service'; // Ensure you have an AuthService to manage roles

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//  title : "angularapp"
// }

import { Component } from '@angular/core';
import { AuthGuard } from './components/authguard/auth.guard'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private authGuard: AuthGuard, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authGuard.isAuthenticated(); // Check login status
  }

  onLogout() {
    localStorage.removeItem('token'); // Clear authentication token
    this.isLoggedIn = false; // Update state
    this.router.navigate(['/']); // Navigate to the homepage instead of /login
  }
}
