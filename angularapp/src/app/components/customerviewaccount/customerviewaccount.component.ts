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

  constructor(
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService // Service to fetch the logged-in user's ID
  ) {}

  ngOnInit(): void {
    this.getCustomerAccounts(); // Fetch accounts on component initialization
  }

  getCustomerAccounts(): void {
    // Retrieve UserId from the AuthService
    const userId = +this.authService.getUserId(); // Convert string to number
    if (!userId || isNaN(userId)) {
      this.errorMessage = 'Unable to fetch user information.';
      return;
    }

    // Fetch accounts using AccountService
    this.accountService.getAccountByUserId(userId).subscribe({
      next: (data: Account[]) => {
        this.accounts = data; // Assign fetched accounts
        console.log('Fetched accounts:', this.accounts);
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
        this.errorMessage = 'Error fetching accounts. Please try again later.';
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
