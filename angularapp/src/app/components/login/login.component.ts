import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // External template
  styleUrls: ['./login.component.css'], // External CSS
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    console.log(this.email, this.password);
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        this.authService.storeToken(response.token);
        this.authService.navigateBasedOnRole();
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid login credentials';
      }
    );
  }
}
