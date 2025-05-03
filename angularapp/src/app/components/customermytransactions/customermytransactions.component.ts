import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { Account } from '../../models/account.model';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-customermytransactions',
  templateUrl: './customermytransactions.component.html',
  styleUrls: ['./customermytransactions.component.css']
})
export class CustomermytransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedAccount: Account | null = null;
  userId: number = 0;
  filterType: string = 'all';
  searchTerm: string = '';
  showAccountModal: boolean = false;
  loading: boolean = true;
  error: string = '';
 
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    // Get the user ID from localStorage
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      this.userId = parseInt(userIdStr, 10);
      this.loadTransactions();
    } else {
      this.error = 'User ID not found. Please login again.';
      this.loading = false;
    }
  }
 
  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getTransactionsByUserId(this.userId).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        this.filteredTransactions = [...this.transactions];
        this.loading = false;
      },
      error => {
        this.error = 'Failed to load transactions. Please try again later.';
        this.loading = false;
        console.error('Error loading transactions:', error);
      }
    );
  }
 
  filterTransactions(): void {
    if (this.filterType === 'all') {
      this.filteredTransactions = [...this.transactions];
    } else {
      this.filteredTransactions = this.transactions.filter(
        transaction => transaction.TransactionType.toLowerCase() === this.filterType.toLowerCase()
      );
    }
 
    // Apply search filter if there's a search term
    if (this.searchTerm.trim()) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        transaction.Description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transaction.Status?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transaction.TransactionType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transaction.Amount.toString().includes(this.searchTerm)
      );
    }
  }
 
  onFilterChange(filterValue: string): void {
    this.filterType = filterValue;
    this.filterTransactions();
  }
 
  onSearch(): void {
    this.filterTransactions();
  }
 
  showAccount(transaction: Transaction): void {
    this.selectedAccount = transaction.Account || null;
    this.showAccountModal = true;
  }
 
  closeAccountModal(): void {
    this.showAccountModal = false;
    this.selectedAccount = null;
  }
 
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleString();
  }
 
  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'processing':
        return 'status-processing';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }
}