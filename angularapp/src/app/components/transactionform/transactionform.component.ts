// import { Component, Input } from '@angular/core';

 
// @Component({
//   selector: 'app-transactionform',
//   templateUrl: './transactionform.component.html',
//   styleUrls: ['./transactionform.component.css']
// })
// export class TransactionformComponent {

//   constructor() {
//   }
 
//   onSubmit() {
//   }
 
//   onCancel() {
//   }
// }
 

import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrls: ['./transactionform.component.css']
})
export class TransactionformComponent implements OnInit {
  // Initialize a Transaction object. In a real app, AccountId might come from the logged-in user’s account data.
  transaction: Transaction = {
    TransactionId: 0,
    AccountId: 1,
    TransactionDate: new Date(),
    TransactionType: '',
    Amount: 0,
    Status: '',
    Description: ''
  };

  formSubmitted: boolean = false;

  // Simulated account details for display based on the screenshots.
  accountInfo = {
    customerName: 'Customer#1',
    accountType: 'Savings',
    balance: 10000,
    status: 'Active'
  };

  // The current mode (deposit or withdrawal). Defaults to deposit.
  mode: 'deposit' | 'withdrawal' = 'deposit';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    // Set default mode as deposit.
    this.setMode('deposit');
  }
  
  // Change the mode and update transaction type accordingly.
  setMode(mode: 'deposit' | 'withdrawal'): void {
    this.mode = mode;
    this.transaction.TransactionType = mode === 'deposit' ? 'credit' : 'debit';
  }

  // Called when the form is submitted.
  onSubmit(form: any): void {
    this.formSubmitted = true;
    
    // Check required fields: amount (and ensure positive value)
    if (form.valid && this.transaction.Amount > 0) {
      // Additional business logic: e.g., for withdrawal, ensure the amount is within balance.
      if (this.mode === 'withdrawal' && this.transaction.Amount > this.accountInfo.balance) {
        alert("Withdrawal amount exceeds available balance");
        return;
      }
      
      // Set the transaction date to the current time.
      this.transaction.TransactionDate = new Date();
      
      // Call the service to add the transaction.
      this.transactionService.addTransaction(this.transaction).subscribe(
        (response) => {
          console.log('Transaction processed successfully:', response);
          alert(`Transaction processed successfully!`);
          
          // Update the account balance (for demo purposes).
          if (this.mode === 'deposit') {
            this.accountInfo.balance += this.transaction.Amount;
          } else {
            this.accountInfo.balance -= this.transaction.Amount;
          }
          
          // Reset the form.
          form.reset();
          this.formSubmitted = false;
          // Reinitialize the transaction object except for TransactionType.
          this.transaction = {
            TransactionId: 0,
            AccountId: 1,
            TransactionDate: new Date(),
            TransactionType: this.transaction.TransactionType,
            Amount: 0,
            Status: '',
            Description: ''
          };
        },
        (error) => {
          console.error('Error processing transaction:', error);
          alert('Failed to process transaction.');
        }
      );
    } else {
      alert("Please enter a valid amount.");
    }
  }

  // Called when the user cancels the transaction.
  onCancel(): void {
    // Reset the amount and optionally any other fields.
    this.transaction.Amount = 0;
    this.formSubmitted = false;
  }
}
