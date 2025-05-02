import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-managerviewallaccounts',
  templateUrl: './managerviewallaccounts.component.html',
  styleUrls: ['./managerviewallaccounts.component.css']
})

export class ManagerviewallaccountsComponent implements OnInit {
  accounts: any[] = [];
  filteredAccounts: any[] = [];
  searchQuery: string = '';
  filterStatus: string = 'All';
  selectedProof: string | null = null;
  showPopup: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.filteredAccounts = data; // Initialize filtered data
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      }
    });
  }

  searchAccounts(): void {
    this.filteredAccounts = this.accounts.filter(account =>
      account.AccountHolderName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterByStatus(): void {
    if (this.filterStatus === 'All') {
      this.filteredAccounts = this.accounts;
    } else {
      this.filteredAccounts = this.accounts.filter(account => account.Status === this.filterStatus);
    }
  }

  showProof(proof: string): void {
    this.selectedProof = proof;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedProof = null;
  }

  toggleAccountStatus(account: any): void {
    console.log(account)
    if (!account.accountId) {
      console.error("Error: AccountId is missing!");
      return;
    }

    const newStatus = account.Status === 'Active' ? 'Inactive' : 'Active';
    const updatedAccount: any = { ...account, Status: newStatus };

    this.accountService.updateAccount(account.accountId, updatedAccount).subscribe({
      next: () => {
        account.Status = newStatus; // Update UI instantly
        console.log(`Account ID ${account.accountId} status updated to ${newStatus} in the database.`);
      },
      error: (err) => console.error('Error updating account status:', err)
    });
  }

}
