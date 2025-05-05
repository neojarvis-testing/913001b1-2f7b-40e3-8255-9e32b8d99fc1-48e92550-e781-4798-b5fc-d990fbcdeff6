import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
<<<<<<< HEAD
 
=======

>>>>>>> 0a88c27b3f18b651baf45936730a69d3c2214ef8
@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrls: ['./transactionform.component.css']
})
export class TransactionformComponent implements OnInit {
<<<<<<< HEAD
  action: string = '';
  accountId: number | null = null;
  amount: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  requiresApproval: boolean = false;
  isModalOpen: boolean = false; // Controls approval modal visibility
  isSuccessModalOpen: boolean = false; // Controls success modal visibility
 
=======
  action: string = ''; 
  accountId: number | null = null; 
  amount: number = 0; 
  errorMessage: string = ''; 
  successMessage: string = ''; 
  requiresApproval: boolean = false; 
  isModalOpen: boolean = false; // Controls approval modal visibility
  isSuccessModalOpen: boolean = false; // Controls success modal visibility

>>>>>>> 0a88c27b3f18b651baf45936730a69d3c2214ef8
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
<<<<<<< HEAD
      this.action = params['action'];
      this.accountId = +params['accountId'];
    });
  }
 
=======
      this.action = params['action']; 
      this.accountId = +params['accountId']; 
    });
  }

>>>>>>> 0a88c27b3f18b651baf45936730a69d3c2214ef8
  openModal(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }
 
    if (this.amount > 10000) {
      this.requiresApproval = true;
      this.isModalOpen = true; // Show approval modal
    } else {
      this.submitTransaction(); // Proceed directly for small amounts
    }
<<<<<<< HEAD
  }
 
  closeModal(): void {
    this.isModalOpen = false; // Close approval modal
  }
 
  confirmTransaction(): void {
    this.isModalOpen = false; // Close approval modal
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
        this.isSuccessModalOpen = true; // Open success modal
      },
      error: () => this.errorMessage = 'Error processing transaction.'
    });
  }
 
  closeSuccessModal(): void {
    this.isSuccessModalOpen = false; // Close success modal
  }
 
=======
  }

  closeModal(): void {
    this.isModalOpen = false; // Close approval modal
  }

  confirmTransaction(): void {
    this.isModalOpen = false; // Close approval modal
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
        this.isSuccessModalOpen = true; // Open success modal
      },
      error: () => this.errorMessage = 'Error processing transaction.'
    });
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false; // Close success modal
  }

>>>>>>> 0a88c27b3f18b651baf45936730a69d3c2214ef8
  redirectToTransactions(): void {
    this.router.navigate(['customer/mytransactions']); // Navigate on confirmation
  }
 
  cancelTransaction(): void {
    this.router.navigate(['customer/view-account']); // Cancel and return to account view
  }
}
 
 