 
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
    return !this.authService.isLoggedIn();
  }
<<<<<<< HEAD
  
=======
 
>>>>>>> 53623fe6063c9f349297b4956d9fe1242243da0d
}
 