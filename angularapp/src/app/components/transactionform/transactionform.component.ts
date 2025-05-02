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
  requiresApproval: boolean = false; // Flag to check if manager approval is needed

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
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
        next: (account: any) => {
          this.balance = account.balance; 
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
    this.requiresApproval = false;

    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    if (this.amount > 10000) {
      this.successMessage = 'Transaction requires managerial approval.';
      this.requiresApproval = true;
      if (this.action === 'Deposit') {
        this.action = "Deposit";
      this.logTransaction(this.action, 'Processing');

      }
      if (this.action === 'Withdrawal') {
        this.action = "Withdrawal";
        console.log(this.action);
      this.logTransaction(this.action, 'Processing');
      }
      
      
    }

    let newBalance = this.balance;
    //Deposit or Withdrawal
    if (this.action === 'Deposit') {
      this.action = "Deposit";
      newBalance += this.amount;
      this.successMessage = `Deposited ₹${this.amount} successfully!`;
    } else if (this.action === 'Withdrawal') {
      this.action='Withdrawal';
      if (this.amount > this.balance) {
        this.errorMessage = 'Insufficient balance for withdrawal.';
        ;
      }
      newBalance -= this.amount;
      this.successMessage = `Withdrawn ₹${this.amount} successfully!`;
    }

    this.updateAccountBalance(newBalance, () => this.logTransaction(this.action, 'Completed'));
  }

  updateAccountBalance(newBalance: number, callback: () => void): void {
    if (this.accountId) {
      this.accountService.getAccountById(this.accountId).subscribe({
        next: (account: any) => {
          if (!account) {
            this.errorMessage = 'Error fetching account details.';
            return;
          }

          // Construct a fully valid account object based on backend requirements
          const updatedAccount: any = {
            accountId: account.accountId, 
            userId: account.userId,
            accountHolderName: account.accountHolderName,
            accountType: account.accountType,
            balance: newBalance,
            status: account.status,
            proofOfIdentity: account.proofOfIdentity,
            dateCreated: account.dateCreated,
            lastUpdated: new Date(),
            user: account.user
          };

          this.accountService.updateAccount(account.accountId, updatedAccount).subscribe({
            next: () => {
              console.log('Account balance updated successfully in the database!');
              this.balance = newBalance;
              callback(); 
            },
            error: () => this.errorMessage = 'Error updating account balance.'
          });
        },
        error: () => this.errorMessage = 'Error fetching account details.'
      });
    }
  }

  logTransaction(action: string, status: string): void {
    if (this.accountId) {
      this.accountService.getAccountById(this.accountId).subscribe({
        next: (account: any) => {
          if (!account) {
            this.errorMessage = 'Error fetching account details.';
            return;
          }

          const transaction: any = {
       
            accountId: this.accountId,
            transactionType: action,
            amount: this.amount,
            status: status,
            transactionDate: new Date().toISOString(),
            description: `Transaction of ₹${this.amount} - ${action}`
            
          };

          this.transactionService.addTransaction(transaction).subscribe({
            next: () => this.router.navigate(['customer/mytransactions'])
            // console.log('Transaction logged successfully!')
            ,
            error: () => this.errorMessage = 'Error logging transaction.'
          });
        },
        error: () => this.errorMessage = 'Error fetching account details.'
      });
    }
  }

  cancelTransaction(): void {
    this.router.navigate(['customer/view-account']);
  }
}
