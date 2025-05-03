import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
// import { Transaction } from 'src/app/models/transaction.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customermytransactions',
  templateUrl: './customermytransactions.component.html',
  styleUrls: ['./customermytransactions.component.css']
})
export class CustomermytransactionsComponent implements OnInit{
  transactions: any[] = []; // Stores all transactions
  filteredTransactions: any[] = []; // Filtered transactions for display
  filterStatus: string = ''; // Selected filter status
  userId: number | null = null; // Holds logged-in user's ID
  showAccountModal: boolean = false;
  selectedAccountDetails: any = null;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the logged-in user's ID from AuthService
    this.userId = +this.authService.getUserId();
    if (this.userId) {
      this.fetchTransactionsByUser(); // Fetch transactions for the user
    }
  }

  fetchTransactionsByUser(): void {
    if (this.userId) {
      this.transactionService.getTransactionsByUserId(this.userId).subscribe({
        next: (transactions: any[]) => {
          this.transactions = transactions;
          this.filteredTransactions = transactions; // Default view
        },
        error: (err) => {
          console.error('Error fetching transactions:', err);
        }
      });
    }
  }

  filterTransactions(): void {
    this.filteredTransactions = this.filterStatus
      ? this.transactions.filter(t => t.status === this.filterStatus)
      : this.transactions;
  }

  showAccountDetails(transaction: any): void {
    this.selectedAccountDetails = transaction.account;
    this.showAccountModal = true;
  }

  closeAccountModal(): void {
    this.showAccountModal = false;
  }
}
