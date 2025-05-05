import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customerviewaccount',
  templateUrl: './customerviewaccount.component.html',
  styleUrls: ['./customerviewaccount.component.css']
})
export class CustomerviewaccountComponent implements OnInit {
  accounts: Account[] = []; // Holds all accounts related to the customer
  errorMessage: string = ''; // Holds any error messages
  loading: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService // Service to fetch the logged-in user's ID
  ) {}

  ngOnInit(): void {
    this.getCustomerAccounts(); // Fetch accounts on component initialization
  }

  getCustomerAccounts(): void {
    this.loading = true; // Start loading
  
    const userId = +this.authService.getUserId();
    if (!userId || isNaN(userId)) {
      this.errorMessage = 'Unable to fetch user information.';
      this.loading = false; // Stop loading on error
      return;
    }
  
    this.accountService.getAccountByUserId(userId).subscribe({
      next: (data: Account[]) => {
        if (data.length === 0) {
          this.errorMessage = 'No accounts found.'; // Instead of displaying a separate message
        } else {
          this.accounts = data;
        }
        this.loading = false; // Stop loading after response
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
        this.errorMessage = 'Error fetching accounts. Please try again later.';
        this.loading = false; // Stop loading on error
      }
    });
  }
  
  onDeposit(accountId: number): void {
    this.router.navigate(['/customer/transactionform'], { queryParams: { action: 'Deposit', accountId } });
  }

  onWithdraw(accountId: number): void {
    this.router.navigate(['/customer/transactionform'], { queryParams: { action: 'Withdrawal', accountId } });
  }
}
