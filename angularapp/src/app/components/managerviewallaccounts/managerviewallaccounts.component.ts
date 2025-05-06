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
  isLoading = false;
  // selectedFile: File | null = null;
  // fileError: string = '';
  // apiUrl = environment.apiUrl;
 
  constructor(private accountService: AccountService,private http: HttpClient,) { }
 
  ngOnInit(): void {
    this.getAllAccounts();
  }
 
  getAllAccounts(): void {
    this.isLoading = true; // Show loading spinner
 
    this.accountService.getAllAccounts().subscribe({
        next: (data) => {
            this.accounts = data;
            this.filteredAccounts = data;
            this.isLoading = false; // Hide loading spinner after fetching
        },
        error: (err) => {
            console.error('Error fetching accounts:', err);
            this.isLoading = false; // Hide spinner on error
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
    console.log(proof);
   
    console.log(this.accounts);
   
    this.selectedProof = proof;
    this.showPopup = true;
  }
 
  closePopup(): void {
    this.showPopup = false;
    this.selectedProof = null;
  }
 
  toggleAccountStatus(account: any): void {
    console.log(account);
 
    if (!account.accountId) {
        console.error("Error: AccountId is missing!");
        return;
    }
 
    const newStatus = account.status === 'Active' ? 'InActive' : 'Active'; // Ensure property name matches backend
    account.status = newStatus; // Update UI immediately
 
    this.accountService.updateAccount(account.accountId, { ...account, status: newStatus }).subscribe({
        next: () => {
            console.log(`Account ID ${account.accountId} status updated to ${newStatus} in the database.`);
        },
        error: (err) => {
            console.error('Error updating account status:', err);
        }
    });
}
 
 
}
 
 
 
 
 
  // If the proofOfIdentity starts with /assets/, remove that prefix
    // before sending to the backend
    // if (updatedAccount.proofOfIdentity && updatedAccount.proofOfIdentity.startsWith('/assets/uploads/')) {
    //   const filename = updatedAccount.proofOfIdentity.split('/').pop();
    //   updatedAccount.proofOfIdentity = filename;
    // }
 