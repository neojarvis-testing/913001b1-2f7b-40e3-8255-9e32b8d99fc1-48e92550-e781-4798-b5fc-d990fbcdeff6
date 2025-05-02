import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrls: ['./transactionform.component.css']
})
export class TransactionformComponent implements OnInit {
  action: string = ''; // 'deposit' or 'withdraw'
  accountId: number | null = null; // Account ID for the transaction
  amount: number = 0; // Transaction amount
  balance: number = 0; // Current account balance
  errorMessage: string = ''; // Error message
  successMessage: string = ''; // Success message

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Get routing parameters
    this.route.queryParams.subscribe(params => {
      this.action = params['action']; // Get action ('deposit' or 'withdraw')
      this.accountId = +params['accountId']; // Get account ID
      this.fetchAccountBalance(); // Fetch balance for the given account
    });
  }

  fetchAccountBalance(): void {
    if (this.accountId) {
      this.accountService.getAccountById(this.accountId).subscribe({
        next: (account) => {
          this.balance = account.Balance; // Fetch and set the account balance
        },
        error: (err) => {
          console.error('Error fetching account details:', err);
        }
      });
    }
  }

  submitTransaction(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    // Transactions below ₹10,000 are processed directly
    if (this.amount < 10000) {
      if (this.action === 'deposit') {
        this.balance += this.amount;
        this.successMessage = `Deposited ₹${this.amount} successfully! Updated balance: ₹${this.balance}`;
      } else if (this.action === 'withdraw') {
        if (this.amount > this.balance) {
          this.errorMessage = 'Insufficient balance for withdrawal.';
        } else {
          this.balance -= this.amount;
          this.successMessage = `Withdrawn ₹${this.amount} successfully! Updated balance: ₹${this.balance}`;
        }
      }
    } else {
      // Transactions above ₹10,000 require manager approval
      this.successMessage = `Transaction above ₹10,000 requires managerial approval.`;
    }
  }

  cancelTransaction(): void {
    // Navigate back to the account view
    this.router.navigate(['/customerviewaccount']);
  }
}
