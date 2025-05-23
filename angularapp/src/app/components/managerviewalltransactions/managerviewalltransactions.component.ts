import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Account } from 'src/app/models/account.model';
 
@Component({
  selector: 'app-managerviewalltransactions',
  templateUrl: './managerviewalltransactions.component.html',
  styleUrls: ['./managerviewalltransactions.component.css']
})
export class ManagerviewalltransactionsComponent implements OnInit {
  transactions: any[] = [];
  selectedAccount: any | null = null;
  errorMessage: string = '';
  showPopup: boolean = false;
  isModalOpen: boolean = false;
  selectedTransaction: any = null;
  // showPopup: boolean = false; // Controls popup visibility
  filteredTransactions: any[] = [];
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
 
  openModal(transaction: any): void {
    this.selectedTransaction = transaction;
    this.isModalOpen = true;
  }
 
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTransaction = null;
  }
 
  confirmTransaction(): void {
    if (!this.selectedTransaction) return;
 
    this.selectedTransaction.status = 'Approved';
    this.transactionService.updateTransaction(this.selectedTransaction).subscribe({
      next: () => {
        this.getAllTransactions();
        this.isModalOpen = false;
      },
      error: (err) => console.error('Error approving transaction:', err)
    });
  }
 
  rejectTransaction(transaction: any): void {
    transaction.status = 'Rejected';
    this.transactionService.updateTransaction(transaction).subscribe({
      next: () => this.getAllTransactions(),
      error: (err) => console.error('Error rejecting transaction:', err)
    });
  }
 
}