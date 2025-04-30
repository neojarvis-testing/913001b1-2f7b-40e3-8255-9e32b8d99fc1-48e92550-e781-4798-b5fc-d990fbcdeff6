import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-customeraddaccount',
  templateUrl: './customeraddaccount.component.html',
  styleUrls: ['./customeraddaccount.component.css']
})
export class CustomeraddaccountComponent {
  account: Account = {
    AccountHolderName: '',
    UserId: 0,
    AccountType: '',
    Balance: 0,
    Status: '',
    ProofOfIdentity: '',
  };

  accountTypes = ['Savings', 'Current'];
  selectedFile: File | null = null;
  successMessage: string = '';
  showPopup: boolean = false; // Controls the popup visibility

  constructor(private accountService: AccountService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.account.ProofOfIdentity = this.selectedFile.name; // Assign the file name
    }
  }

  createAccount(form: any): void {
    // Ensure the form is valid and a file is selected before proceeding
    if (form.invalid || !this.selectedFile) {
      return;
    }

    this.accountService.createAccount(this.account).subscribe({
      next: (res) => {
        this.successMessage = 'Account created successfully!';
        this.showPopup = true; // Show popup on success
        console.log('Account creation response:', res);
      },
      error: (err) => {
        console.error('Account creation error:', err);
      }
    });
  }

  closePopup(): void {
    this.showPopup = false; // Hide the popup
    this.router.navigate(['/customerviewaccount']); // Redirect to customerviewaccount
  }

  closeForm(): void {
    this.router.navigate(['/']); // Navigate to a different route if needed
  }
}
