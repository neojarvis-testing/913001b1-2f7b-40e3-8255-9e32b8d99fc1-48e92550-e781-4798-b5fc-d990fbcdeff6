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

  constructor(private accountService: AccountService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data.map(account => {
          // ✅ Ensure proof of identity path is properly formatted
          if (account.proofOfIdentity && !account.proofOfIdentity.startsWith('http')) {
            account.proofOfIdentity = `${window.location.origin}/uploads/${account.proofOfIdentity}`;
          }
          return account;
        });
  
        this.filteredAccounts = [...this.accounts]; // Preserve original data
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
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
    if (this.filterStatus === 'All') {
      this.filteredAccounts = this.accounts;
    } else {
      this.filteredAccounts = this.accounts.filter(account => account.status === this.filterStatus);
    }
  }



  toggleAccountStatus(account: any): void {
    console.log(account)
    if (!account.accountId) {
      console.error("Error: AccountId is missing!");
      return;
    }

    const newStatus = account.Status === 'Active' ? 'Inactive' : 'Active';
    const updatedAccount: any = { ...account, Status: newStatus };

     // If the proofOfIdentity starts with /assets/, remove that prefix
    // before sending to the backend
    // if (updatedAccount.proofOfIdentity && updatedAccount.proofOfIdentity.startsWith('/assets/uploads/')) {
    //   const filename = updatedAccount.proofOfIdentity.split('/').pop();
    //   updatedAccount.proofOfIdentity = filename;
    // }

    this.accountService.updateAccount(account.accountId, updatedAccount).subscribe({
      next: () => {
        account.Status = newStatus; // Update UI instantly
        console.log(`Account ID ${account.accountId} status updated to ${newStatus} in the database.`);
      },
      error: (err) => console.error('Error updating account status:', err)
    });
  }

}


// user_17002