import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service'; // Update with the correct service path
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-customerviewaccount',
  templateUrl: './customerviewaccount.component.html',
  styleUrls: ['./customerviewaccount.component.css']
})
export class CustomerviewaccountComponent implements OnInit {
  accounts: any[] = []; // Holds all accounts related to the customer
 
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.getCustomerAccounts(); // Fetch accounts on component initialization
  }
 
  getCustomerAccounts(): void {
    // Replace with the actual API call to fetch accounts
    const userId = 123; // Use the logged-in customer's ID
    this.accountService.getAccountByUserId(userId).subscribe({
      next: (data) => {
        this.accounts = data; // Assign fetched accounts
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      }
    });
  }
 
  onDeposit(accountId: number): void {
    // Navigate to transactionform component with deposit action
    this.router.navigate(['/transactionform'], { queryParams: { action: 'deposit', accountId } });
  }
 
  onWithdraw(accountId: number): void {
    // Navigate to transactionform component with withdrawal action
    this.router.navigate(['/transactionform'], { queryParams: { action: 'withdraw', accountId } });
  }
}