import { Component } from '@angular/core';
 
@Component({
  selector: 'app-managerviewalltransactions',
  templateUrl: './managerviewalltransactions.component.html',
  styleUrls: ['./managerviewalltransactions.component.css']
})
export class ManagerviewalltransactionsComponent {
  filterStatus: string = 'All';
 
  transactions = [
    { id: 1, accountId: 13, type: 'Deposit', amount: 500, status: 'Completed', date: '02/10/2024' },
    { id: 2, accountId: 13, type: 'Deposit', amount: 500, status: 'Completed', date: '02/10/2024' },
    { id: 3, accountId: 13, type: 'Withdraw', amount: 1500, status: 'Completed', date: '02/10/2024' },
    { id: 4, accountId: 13, type: 'Withdraw', amount: 4000, status: 'Completed', date: '02/10/2024' },
    { id: 5, accountId: 13, type: 'Withdraw', amount: 1000, status: 'Completed', date: '02/10/2024' },
    { id: 6, accountId: 13, type: 'Withdraw', amount: 2000, status: 'Rejected', date: '02/10/2024' },
    { id: 7, accountId: 14, type: 'Deposit', amount: 1000, status: 'Completed', date: '02/10/2024' },
    { id: 8, accountId: 14, type: 'Withdraw', amount: 1000, status: 'Completed', date: '02/10/2024' },
    { id: 9, accountId: 14, type: 'Deposit', amount: 3000, status: 'Processing', date: '03/10/2024' }
  ];
 
  selectedTransaction: any = null;
 
  get filteredTransactions() {
    return this.transactions.filter(tx =>
      this.filterStatus === 'All' || tx.status === this.filterStatus
    );
  }
 
  showAccountDetails(tx: any) {
    this.selectedTransaction = {
      accountId: tx.accountId,
      accountHolder: `Customer ${tx.accountId}`,
      accountNumber: `AC${tx.accountId}0099`
    };
  }
 
  closePopup() {
    this.selectedTransaction = null;
  }
 
  proceed(tx: any) {
    tx.status = 'Completed';
    alert('Transaction proceeded.');
  }
 
  reject(tx: any) {
    tx.status = 'Rejected';
    alert('Transaction rejected.');
  }
}