import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction.model';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-managerviewalltransactions',
  templateUrl: './managerviewalltransactions.component.html',
  styleUrls: ['./managerviewalltransactions.component.css']
})
export class ManagerviewalltransactionsComponent implements OnInit {
  transactions: any[] = [];
  selectedAccount: Account | null = null; // To store selected account details
  errorMessage: string = '';
  showPopup: boolean = false; // Controls popup visibility
  filteredTransactions: Transaction[] = []; 
  filterStatus: string = 'All'; 
  isLoading = false;
  

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(): void {
    this.isLoading = true; // Show loading spinner

    this.transactionService.getAllTransactions().subscribe({
        next: (data) => {
            this.transactions = data;
            this.filteredTransactions = data;
            this.isLoading = false; // Hide loading spinner after fetching
        },
        error: (err) => {
            console.error('Error fetching transactions:', err);
            this.isLoading = false; // Hide spinner on error
        }
    });
}

  filterTransactions(): void { 
    console.log("Filtering transactions by:", this.filterStatus); 
    if (this.filterStatus === 'All') {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter(transaction => 
        transaction.status.toLowerCase() === this.filterStatus.toLowerCase() 
      );
    }
  }

  showAccountDetails(account: Account): void {
    this.selectedAccount = account;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedAccount = null;
  }

  proceedTransaction(transaction: any): void {
    console.log(transaction)
    transaction.status = 'Approved';
    this.transactionService.updateTransaction(transaction).subscribe({
      next: () => this.getAllTransactions(),
      error: (err) => console.error('Error processing transaction:', err)
    });
  }

  rejectTransaction(transaction: Transaction): void {
    transaction.Status = 'Rejected';
    this.transactionService.updateTransaction(transaction).subscribe({
      next: () => this.getAllTransactions(),
      error: (err) => console.error('Error rejecting transaction:', err)
    });
  }
  
}
