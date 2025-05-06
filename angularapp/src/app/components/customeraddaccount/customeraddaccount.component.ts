import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account.model';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { rejects } from 'assert';

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
    private router: Router,
    private authService: AuthService // To fetch UserId from the token
  ) {}

  ngOnInit(): void {
    // Retrieve UserId from AuthService
    let userId = +this.authService.getUserId();

    // Check if the user already has an existing account
    this.accountService.getAccountByUserId(userId).subscribe({
      next: (accountExists) => {
        if (accountExists) {
          // If an account already exists, navigate to the view account component
          this.router.navigate(['customer/view-account']);
        }
      },
      error: (err) => {
        console.error('Error checking existing account:', err);
        this.errorMessage = 'Unable to verify existing account. Please try again.';
      }
    });

    // Initialize the form
    this.accountForm = this.formBuilder.group({
      accountHolderName: ['', Validators.required],
      userId: [{ value: userId, disabled: true }, Validators.required], // Disabled field with dynamic UserId
      accountType: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(1000)]],
      proofOfIdentity: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.handleBase64(file).then(
        (basestring) => {
          console.log(basestring);
          this.accountForm.patchValue({ proofOfIdentity: basestring });
          
        }
      )
      // this.accountForm.patchValue({ proofOfIdentity: file.name });
    }
  }

  handleBase64(file:File): Promise<string>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    } 
    )
  }

  createAccount(): void {
    if (this.accountForm.valid) {
        const accountData: any = {
            ...this.accountForm.getRawValue(), // Get all form values, including disabled fields
            userId: this.authService.getUserId(), // Ensure UserId is added to the data
            initialBalance: parseFloat(this.accountForm.get('initialBalance')?.value) // Parse to a float
        };

        console.log(accountData); // Verify the correct value is being sent

        this.accountService.createAccount(accountData).subscribe({
            next: (response) => {
                console.log(response);
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
    this.router.navigate(['customer/view-account']); // Navigate to the customerviewaccount page
  }

  navigateHome(): void {
    this.router.navigate(['/home']); // Adjust '/home' to your actual home page route
  }
}
