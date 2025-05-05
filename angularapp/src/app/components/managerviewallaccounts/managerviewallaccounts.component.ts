import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HttpClient } from '@angular/common/http';

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
  isLoading = false;

  constructor(private accountService: AccountService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.isLoading = true;

    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        // ✅ Ensure correct file path reference for proofOfIdentity
        this.accounts = data.map(account => {
          if (account.proofOfIdentity && !account.proofOfIdentity.startsWith('http')) {
            account.proofOfIdentity = `${window.location.origin}/uploads/${account.proofOfIdentity}`;
          }
          return account;
        });

        this.filteredAccounts = [...this.accounts];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
        this.isLoading = false;
      }
    });
  }

  showProof(proof: string | null): void {
    if (proof) {
      this.selectedProof = proof;
      this.showPopup = true;
    } else {
      console.error('Proof of identity not found.');
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedProof = null;
  }

  searchAccounts(): void {
    this.filteredAccounts = this.accounts.filter(account =>
      account.accountHolderName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterByStatus(): void {
    this.filteredAccounts = this.filterStatus === 'All'
      ? [...this.accounts]
      : this.accounts.filter(account => account.status === this.filterStatus);
  }

  toggleAccountStatus(account: any): void {
    if (!account.accountId) {
      console.error("Error: AccountId is missing!");
      return;
    }

    const newStatus = account.status === 'Active' ? 'InActive' : 'Active';
    account.status = newStatus; // Update UI immediately

    this.accountService.updateAccount(account.accountId, { status: newStatus }).subscribe({
      next: () => {
        console.log(`Account ID ${account.accountId} status updated to ${newStatus} in the database.`);
      },
      error: (err) => {
        console.error('Error updating account status:', err);
      }
    });
  }
}
