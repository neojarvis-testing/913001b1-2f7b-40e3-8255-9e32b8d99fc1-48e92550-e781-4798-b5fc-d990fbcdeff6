import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managerviewalltransactions',
  templateUrl: './managerviewalltransactions.component.html',
  styleUrls: ['./managerviewalltransactions.component.css']
})
export class ManagerviewalltransactionsComponent implements OnInit {
  filterStatus: string = 'All'; // Default filter status
  transactions: Transaction[] = []; // Store transactions from API
  selectedTransaction: Transaction | null = null; // For displaying detailed account info
  userId: number; // Store user ID from local storage

  constructor(private transactionService: TransactionService,private authserice : AuthService) {}

  ngOnInit(): void {
    this.userId = +this.authserice.getUserId(); // Retrieve userId from local storage
    this.loadTransactionsByUserId(); // Load transactions for the logged-in user
  }

  // Load transactions from the API
  loadTransactionsByUserId(): void {
    if (this.userId) {
      this.transactionService.getTransactionsByUserId(this.userId).subscribe(
        (data: Transaction[]) => {
          this.transactions = data; // Assign retrieved transactions
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  // Show account details of a specific transaction
  showAccountDetails(tx: Transaction): void {
    this.selectedTransaction = tx; // Account details are included in the transaction object
  }

  // Close the modal
  closePopup(): void {
    this.selectedTransaction = null;
  }

  // Proceed the transaction
  proceed(tx: Transaction): void {
    tx.Status = 'Completed';
    this.transactionService.updateTransaction(tx).subscribe(
      () => {
        alert('Transaction proceeded.');
        this.loadTransactionsByUserId(); // Refresh the transactions
      },
      (error) => {
        console.error('Error proceeding transaction:', error);
      }
    );
  }

  // Reject the transaction
  reject(tx: Transaction): void {
    tx.Status = 'Rejected';
    this.transactionService.updateTransaction(tx).subscribe(
      () => {
        alert('Transaction rejected.');
        this.loadTransactionsByUserId(); // Refresh the transactions
      },
      (error) => {
        console.error('Error rejecting transaction:', error);
      }
    );
  }

  // Filter transactions based on status
  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(tx =>
      this.filterStatus === 'All' || tx.Status === this.filterStatus
    );
  }
}
