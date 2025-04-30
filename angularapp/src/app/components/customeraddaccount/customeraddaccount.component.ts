import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customeraddaccount',
  templateUrl: './customeraddaccount.component.html',
  styleUrls: ['./customeraddaccount.component.css']
})

export class CustomeraddaccountComponent implements OnInit {
  accountForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showPopup: boolean = false; // Controls visibility of the popup

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.accountForm = this.formBuilder.group({
      accountHolderName: ['', Validators.required],
      userId: ['0', Validators.required],
      accountType: ['', Validators.required],
      initialBalance: ['', [Validators.required, Validators.min(1000)]],
      proofOfIdentity: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.accountForm.patchValue({ proofOfIdentity: file.name });
    }
  }

  createAccount(): void {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.getRawValue(); // Retrieve form values including disabled fields
      this.accountService.createAccount(accountData).subscribe({
        next: (response) => {
          this.successMessage = 'Account created successfully!';
          this.showPopup = true; // Show success popup
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'An error occurred while creating the account.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  closePopup(): void {
    this.showPopup = false; // Hide popup
    this.router.navigate(['/customerviewaccount']); // Navigate to the customerviewaccount page
  }

  navigateHome(): void {
    this.router.navigate(['/home']); // Adjust '/home' to your actual home page route
  }
  
}
