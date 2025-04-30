import { Component } from '@angular/core';
 
@Component({
  selector: 'app-managerviewallaccounts',
  templateUrl: './managerviewallaccounts.component.html',
  styleUrls: ['./managerviewallaccounts.component.css']
})
export class ManagerviewallaccountsComponent {
  accounts = [
    { id: 1, name: 'D A', type: 'Savings', balance: 1000, status: 'Inactive', proof: 'assets/proof1.png' },
    { id: 2, name: 'MRH', type: 'Current', balance: 12000, status: 'Inactive', proof: 'assets/proof2.png' },
    { id: 3, name: 'Customer', type: 'Savings', balance: 1500, status: 'Active', proof: 'assets/proof3.png' }
  ];
 
  searchText: string = '';
  filterStatus: string = 'All';
  selectedProof: string | null = null;
 
  get filteredAccounts() {
    return this.accounts.filter(account => {
const matchName = account.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchStatus = this.filterStatus === 'All' || account.status === this.filterStatus;
      return matchName && matchStatus;
    });
  }
 
  showProof(proofUrl: string) {
    this.selectedProof = proofUrl;
  }
 
  closeProof() {
    this.selectedProof = null;
  }
 
  toggleStatus(account: any) {
    account.status = account.status === 'Active' ? 'Inactive' : 'Active';
  }
}