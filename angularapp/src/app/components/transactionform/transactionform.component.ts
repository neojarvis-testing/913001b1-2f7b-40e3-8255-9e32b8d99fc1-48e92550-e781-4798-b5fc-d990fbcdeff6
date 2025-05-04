import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrls: ['./transactionform.component.css']
})
export class TransactionformComponent implements OnInit {
  action: string = ''; 
  accountId: number | null = null; 
  amount: number = 0; 
  errorMessage: string = ''; 
  successMessage: string = ''; 
  requiresApproval: boolean = false; 
  isModalOpen: boolean = false; // Controls modal visibility

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action']; 
      this.accountId = +params['accountId']; 
    });
  }

  openModal(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    if (this.amount > 10000) {
      this.requiresApproval = true;
      this.isModalOpen = true; // Show modal inside UI
    } else {
      this.submitTransaction(); // If amount is below ₹10,000, submit directly
    }
  }

  closeModal(): void {
    this.isModalOpen = false; // Close the modal
  }

  confirmTransaction(): void {
    this.isModalOpen = false; // Close modal after confirmation
    this.submitTransaction(); // Proceed with transaction
  }

  submitTransaction(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const transactionStatus = this.requiresApproval ? 'Processing' : 'Completed';

    const transaction = {
      accountId: this.accountId,
      transactionType: this.action,
      amount: this.amount,
      status: transactionStatus,
      transactionDate: new Date().toISOString(),
      description: `Transaction of ₹${this.amount} - ${this.action}`
    };

    this.transactionService.addTransaction(transaction).subscribe({
      next: () => {
        this.successMessage = this.requiresApproval
          ? 'Transaction submitted for approval.'
          : 'Transaction completed successfully!';
        this.router.navigate(['customer/mytransactions']);
      },
      error: () => this.errorMessage = 'Error processing transaction.'
    });
  }

  cancelTransaction(): void {
    this.router.navigate(['customer/view-account']);
  }
}
