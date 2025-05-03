import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  //https://8080-adbeaecaedadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api/Transaction
  public apiUrl = 'https://8080-ffcdceafdeadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/api/transaction`, { headers: this.getAuthHeaders() });
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/transaction`, transaction, { headers: this.getAuthHeaders() });
  }

  updateTransaction(transaction: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/transaction/manager/${transaction.transactionId}`, transaction, { headers: this.getAuthHeaders() });
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/api/transaction/customer/${userId}`, { headers: this.getAuthHeaders() });
  }
}
