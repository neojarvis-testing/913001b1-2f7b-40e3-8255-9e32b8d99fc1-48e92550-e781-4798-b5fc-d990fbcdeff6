import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  isFormValid = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registrationForm.valueChanges.subscribe(() => {
      this.isFormValid = this.registrationForm.valid;
    });
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: () => {
          alert('Registration Successful');
          // Navigate to login page
          window.location.href = '/login';
        },
        error: (err) => {
          if (err.status === 409) { // Conflict status for existing user
            alert('User already exists');
          } else {
            console.error(err);
          }
        }
      });
    }
  }
}
