import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrls: ['./transactionform.component.css']
})
export class TransactionformComponent implements OnInit {
  action: string = ''; // Deposit or Withdraw
  accountId: number | null = null; // Account ID from URL
  amount: number = 0; // User input amount
  balance: number = 0; // Current balance
  errorMessage: string = ''; // Error messages
  successMessage: string = ''; // Success messages

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService // Inject TransactionService
  ) {}

  ngOnInit(): void {
    // Get transaction type and account ID from URL parameters
    this.route.queryParams.subscribe(params => {
      this.action = params['action']; 
      this.accountId = +params['accountId']; 
      if (this.accountId) {
        this.fetchAccountBalance(); 
      }
    });
  }

  fetchAccountBalance(): void {
    if (this.accountId) {
      this.accountService.getAccountById(this.accountId).subscribe({
        next: (account: Account) => {
          this.balance = account.Balance; 
        },
        error: () => {
          this.errorMessage = 'Error fetching account balance.';
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

    if (this.amount > 10000) {
      this.successMessage = 'Transaction requires managerial approval.';
      return;
    }

    let transactionType = this.action === 'deposit' ? 'Deposit' : 'Withdraw';

    if (this.action === 'deposit') {
      this.balance += this.amount;
      this.successMessage = `Deposited ₹${this.amount} successfully!`;
    } else if (this.action === 'withdraw') {
      if (this.amount > this.balance) {
        this.errorMessage = 'Insufficient balance for withdrawal.';
        return;
      }
      this.balance -= this.amount;
      this.successMessage = `Withdrawn ₹${this.amount} successfully!`;
    }

    this.updateAccountBalance();
    this.logTransaction(transactionType);
  }

  logTransaction(transactionType: string): void {
    if (this.accountId) {
      const newTransaction: Transaction = {
        TransactionId: 0, // Assuming backend will auto-generate this
        AccountId: this.accountId,
        TransactionDate: new Date(),
        TransactionType: transactionType,
        Amount: this.amount,
        Status: 'Completed',
        Description: `${transactionType} of ₹${this.amount}`
      };

      this.transactionService.addTransaction(newTransaction).subscribe({
        next: () => console.log('Transaction logged successfully'),
        error: () => this.errorMessage = 'Error logging transaction.'
      });
    }
  }

  updateAccountBalance(): void {
    if (this.accountId) {
      this.accountService.getAccountById(this.accountId).subscribe({
        next: (account: Account) => {
          const updatedAccount: Account = {
            AccountId: account.AccountId,
            UserId: account.UserId,
            AccountHolderName: account.AccountHolderName,
            AccountType: account.AccountType,
            Balance: this.balance, 
            Status: account.Status,
            ProofOfIdentity: account.ProofOfIdentity
          };

          this.accountService.updateAccount(updatedAccount).subscribe({
            next: () => console.log('Account balance updated successfully!'),
            error: () => this.errorMessage = 'Error updating account balance.'
          });
        },
        error: () => this.errorMessage = 'Error fetching account details.'
      });
    }
  }

  cancelTransaction(): void {
    this.router.navigate(['/customer/view-account']); 
  }
}
