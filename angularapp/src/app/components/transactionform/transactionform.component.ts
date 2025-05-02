// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AccountService } from 'src/app/services/account.service';
// import { Account } from 'src/app/models/account.model';
// import { TransactionService } from 'src/app/services/transaction.service';
// import { Transaction } from 'src/app/models/transaction.model';

// @Component({
//   selector: 'app-transactionform',
//   templateUrl: './transactionform.component.html',
//   styleUrls: ['./transactionform.component.css']
// })
// export class TransactionformComponent implements OnInit {
//   action: string = ''; // Deposit or Withdraw
//   accountId: number | null = null; // Account ID from URL
//   amount: number = 0; // User input amount
//   balance: number = 0; // Current balance
//   errorMessage: string = ''; // Error messages
//   successMessage: string = ''; // Success messages
//   requiresApproval: boolean = false; // Flag to check if manager approval is needed

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private accountService: AccountService,
//     private transactionService: TransactionService
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.action = params['action']; 
//       this.accountId = +params['accountId']; 
//       if (this.accountId) {
//         this.fetchAccountBalance(); 
//       }
//     });
//   }

//   fetchAccountBalance(): void {
//     if (this.accountId) {
//       this.accountService.getAccountById(this.accountId).subscribe({
//         next: (account: Account) => {
//           this.balance = account.Balance; 
//         },
//         error: () => {
//           this.errorMessage = 'Error fetching account balance.';
//         }
//       });
//     }
//   }

//   submitTransaction(): void {
//     this.errorMessage = '';
//     this.successMessage = '';
//     this.requiresApproval = false;

//     if (this.amount <= 0) {
//       this.errorMessage = 'Please enter a valid amount.';
//       return;
//     }

//     if (this.amount > 10000) {
//       this.successMessage = 'Transaction requires managerial approval.';
//       this.requiresApproval = true;
//       this.logTransaction(this.action, 'Pending Approval');
//       return;
//     }

//     if (this.action === 'deposit') {
//       this.balance += this.amount;
//       this.successMessage = `Deposited ₹${this.amount} successfully!`;
//     } else if (this.action === 'withdraw') {
//       if (this.amount > this.balance) {
//         this.errorMessage = 'Insufficient balance for withdrawal.';
//         return;
//       }
//       this.balance -= this.amount;
//       this.successMessage = `Withdrawn ₹${this.amount} successfully!`;
//     }

//     this.updateAccountBalance(() => this.logTransaction(this.action, 'Completed'));
//   }

//   updateAccountBalance(callback: () => void): void {
//     if (this.accountId) {
//       this.accountService.getAccountById(this.accountId).subscribe({
//         next: (account: Account) => {
//           const updatedAccount: Account = {
//             ...account,
//             Balance: this.balance
//           };

//           this.accountService.updateAccount(updatedAccount).subscribe({
//             next: () => {
//               console.log('Account balance updated successfully!');
//               callback(); // Log transaction after balance update
//             },
//             error: () => this.errorMessage = 'Error updating account balance.'
//           });
//         },
//         error: () => this.errorMessage = 'Error fetching account details.'
//       });
//     }
//   }

//   logTransaction(transactionType: string, status: string): void {
//     if (this.accountId) {
//       const newTransaction: Transaction = {
//         TransactionId: 0,
//         AccountId: this.accountId,
//         TransactionDate: new Date(),
//         TransactionType: transactionType,
//         Amount: this.amount,
//         Status: status, // "Completed" or "Pending Approval"
//         Description: `${transactionType} of ₹${this.amount}`
//       };

//       this.transactionService.addTransaction(newTransaction).subscribe({
//         next: () => console.log('Transaction logged successfully!'),
//         error: () => this.errorMessage = 'Error logging transaction.'
//       });
//     }
//   }

//   cancelTransaction(): void {
//     this.router.navigate(['/customer/view-account']);
//   }
// }


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
  ) { }

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
    this.requiresApproval = false;

    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    if (this.amount > 10000) {
      this.successMessage = 'Transaction requires managerial approval.';
      this.requiresApproval = true;
      this.logTransaction(this.action, 'Pending Approval');
      return;
    }

    let newBalance = this.balance;

    if (this.action === 'deposit') {
      newBalance += this.amount;
      this.successMessage = `Deposited ₹${this.amount} successfully!`;
    } else if (this.action === 'withdraw') {
      if (this.amount > this.balance) {
        this.errorMessage = 'Insufficient balance for withdrawal.';
        return;
      }
      newBalance -= this.amount;
      this.successMessage = `Withdrawn ₹${this.amount} successfully!`;
    }

    this.updateAccountBalance(newBalance, () => this.logTransaction(this.action, 'Completed'));
  }

  accountDetails: Account;

  updateAccountBalance(newBalance: number, callback: () => void): void {


    this.accountService.getAccountByUserId(this.accountId).subscribe(data => {
      this.accountDetails = data[0];
    });

    if (this.accountId) {
      const updatedAccount = { ...this.accountDetails, Balance: newBalance };

      this.accountService.updateAccount(this.accountId, updatedAccount).subscribe({
        next: () => {
          console.log('Account balance updated successfully in the database!');
          this.balance = newBalance;
          callback();
        },
        error: () => this.errorMessage = 'Error updating account balance.'
      });
    }
  }

  logTransaction(action: string, status: string): void {
    if (this.accountId) {
      const transaction: Transaction = {
        TransactionId: 0,
        AccountId: this.accountId,
        TransactionType: action,
        Amount: this.amount,
        Status: status,
        TransactionDate: new Date()
      };

      this.transactionService.addTransaction(transaction).subscribe({
        next: () => console.log('Transaction logged successfully'),
        error: () => this.errorMessage = 'Error logging transaction.'
      });
    }
  }

  cancelTransaction(): void {
    this.router.navigate(['customer/view-account']);
  }
}

