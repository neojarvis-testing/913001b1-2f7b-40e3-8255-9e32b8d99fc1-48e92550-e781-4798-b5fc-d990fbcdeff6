import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-customermytransactions',
  templateUrl: './customermytransactions.component.html',
  styleUrls: ['./customermytransactions.component.css']
})
export class CustomermytransactionsComponent implements OnInit {
  transactions: any[] = []; // List of all transactions
  filteredTransactions: any[] = []; // Filtered transactions
  filterStatus: string = ''; // Filter by status
  selectedAccountDetails: any = null; // Holds the selected account details
  showAccountModal: boolean = false; // Controls the custom modal visibility

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getTransactions(); // Fetch transactions when the component is initialized
  }

  getTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data; // Assign fetched transactions
        this.filteredTransactions = [...this.transactions]; // Initially display all transactions
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }

  filterTransactions(): void {
    if (this.filterStatus) {
      this.filteredTransactions = this.transactions.filter(
        (transaction) => transaction.status === this.filterStatus
      );
    } else {
      this.filteredTransactions = [...this.transactions];
    }
  }

  showAccountDetails(transaction: any): void {
    this.selectedAccountDetails = transaction; // Set the selected transaction
    this.showAccountModal = true; // Display the modal
  }

  closeAccountModal(): void {
    this.showAccountModal = false; // Hide the modal
    this.selectedAccountDetails = null; // Clear the selected account details
  }
}
