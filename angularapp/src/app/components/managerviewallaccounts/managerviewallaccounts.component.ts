import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-managerviewallaccounts',
  templateUrl: './managerviewallaccounts.component.html',
  styleUrls: ['./managerviewallaccounts.component.css']
})
export class ManagerviewallaccountsComponent implements OnInit {
  accounts: any[] = []; // All accounts fetched from API
  filteredAccounts: Account[] = []; // Filtered accounts for display
  searchText: string = ''; // Search input value
  filterStatus: string = 'All'; // Dropdown filter value
  selectedProof: string | null = null; // Selected proof of identity URL

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.fetchAllAccounts(); // Fetch accounts on component initialization
  }

  // Fetch all accounts from the endpoint
  fetchAllAccounts() {
    this.accountService.getAllAccounts().subscribe(
      (data: Account[]) => {
        this.accounts = data;
        console.log(this.accounts);
        this.applyFilters(); // Apply filters to show initial data
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  // Apply the filters based on search text and dropdown value
  applyFilters() {
    console.log("Applying filters...");
    console.log("Search Text:", this.searchText);
    console.log("Filter Status:", this.filterStatus);
  
    // Step 1: Handle Name Filtering
    const nameFilteredAccounts = this.accounts.filter(account => {
      const name = account.AccountHolderName || ''; // Ensure name is a string
      const matchName = this.searchText === '' || name.toLowerCase().includes(this.searchText.toLowerCase());
      if (!matchName) {
        console.log("Filtered out by name:", account.AccountHolderName);
      }
      return matchName;
    });
  
    console.log("Accounts after name filtering:", nameFilteredAccounts);
  
    // Step 2: Handle Status Filtering
    const statusFilteredAccounts = nameFilteredAccounts.filter(account => {
      const matchStatus = this.filterStatus === 'All' || account.status === this.filterStatus;
      if (!matchStatus) {
        console.log("Filtered out by status:", account.AccountHolderName, "with status:", account.Status);
      }
      return matchStatus;
    });
  
    console.log("Accounts after status filtering:", statusFilteredAccounts);
  
    // Step 3: Update the filteredAccounts property
    this.filteredAccounts = statusFilteredAccounts;
  
    console.log("Final filtered accounts:", this.filteredAccounts);
  }
  
  

  // Show proof of identity in the modal
  showProof(proofUrl: string) {
    this.selectedProof = proofUrl; // Set selected proof URL to display
  }

  // Close the proof modal
  closeProof() {
    this.selectedProof = null; // Reset selected proof URL
  }

  toggleStatus(account: Account) {
    const newStatus = account.Status === 'Active' ? 'Inactive' : 'Active';
    account.Status = newStatus; // Correct property name
  
    this.accountService.updateAccount(account).subscribe(
      () => {
        console.log(`Account status updated successfully to ${newStatus}`);
        this.applyFilters(); // Reapply filters to reflect updated data
      },
      (error) => {
        console.error('Error updating account status:', error);
      }
    );
  }
  
}
