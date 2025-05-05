 
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';
 
  constructor(public authService: AuthService, public router: Router) {} // ✅ AuthService injected
 
  shouldShowNavbar(): boolean {
<<<<<<< HEAD
    return !this.authService.isLoggedIn();
  }
<<<<<<< HEAD
  
=======
 
>>>>>>> 53623fe6063c9f349297b4956d9fe1242243da0d
=======
    const currentPath = window.location.pathname;
    return (
      currentPath === '/' ||
      currentPath.includes('/login') ||
      currentPath.includes('/register')
    );
  }  
>>>>>>> 0d0a7e433143e2263f9c50b183d7c88a1bcaf771
}
 
 
 