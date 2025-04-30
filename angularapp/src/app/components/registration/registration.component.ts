import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model'; // Make sure the path is correct

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  user: User = {
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  isFormValid = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      Username: [this.user.Username, Validators.required],
      Email: [this.user.Email, [Validators.required, Validators.email]],
      Password: [this.user.Password, [Validators.required, Validators.minLength(6)]],
      MobileNumber: [
        this.user.MobileNumber,
        [Validators.required, Validators.pattern('^[0-9]{10}$')]
      ],
      UserRole: [this.user.UserRole, Validators.required]
    });

    this.registrationForm.valueChanges.subscribe(() => {
      this.isFormValid = this.registrationForm.valid;
    });
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      this.user = this.registrationForm.value; // Update the model with form values
      this.authService.register(this.user).subscribe({
        next: () => {
          alert('Registration Successful');
          this.router.navigate(['/login']); // Navigate to login page
        },
        error: (err) => {
          if (err.status === 409) {
            alert('User already exists');
          } else {
            console.error(err);
          }
        }
      });
    }
  }
}
