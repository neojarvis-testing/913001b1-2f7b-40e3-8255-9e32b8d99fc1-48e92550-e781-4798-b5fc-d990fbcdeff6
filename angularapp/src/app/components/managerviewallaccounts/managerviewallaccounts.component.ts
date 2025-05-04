import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';


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
  // selectedFile: File | null = null;
  // fileError: string = '';
  // apiUrl = environment.apiUrl;

  constructor(private accountService: AccountService,private http: HttpClient,) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.filteredAccounts = data; 
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      }
    });
  }


  // for file 

  // getAllAccounts(): void {
  //   this.accountService.getAllAccounts().subscribe({
  //     next: (data) => {
  //       // Process the image paths if needed
  //       this.accounts = data.map(account => {
  //         if (account.ProofOfIdentity && !account.ProofOfIdentity.startsWith('http') && !account.ProofOfIdentity.startsWith('/assets')) {
  //           account.ProofOfIdentity = `${this.apiUrl}/assets/uploads/${account.ProofOfIdentity}`;
  //         }
  //         return account;
  //       });
  //       this.filteredAccounts = this.accounts;
  //     },
  //     error: (err) => {
  //       console.error("Error fetching accounts:", err);
  //     }
  //   });
  // }

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
