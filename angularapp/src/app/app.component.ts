import { Component } from '@angular/core';
import { AuthGuard } from './components/authguard/auth.guard';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false; // Default to false (logged out)
  title = "angularapp";

  constructor(private authGuard: AuthGuard, private router: Router) {}
 
  ngOnInit() {
    this.isLoggedIn = this.authGuard.isAuthenticated(); // Check login status
  }
 
  onLogout() {
    localStorage.removeItem('authToken'); // Clear authentication token
    this.isLoggedIn = false; // Update state
    this.router.navigate(['/']); // Navigate to the navbar as default view
  }
}
 
 