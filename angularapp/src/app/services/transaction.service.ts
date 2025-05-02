import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // https://8080-bebececaaeeaadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api/Transaction/1234
<<<<<<< HEAD
  public apiUrl = 'https://8080-ffcdceafdeadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api/Transaction';
=======
  public apiUrl = "https://8080-aaaecbbaabdabcdaaadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api/Transaction"
>>>>>>> 8203d229d70cef770c89074aa4a0f36a1dc6d038

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<any>(this.apiUrl, transaction, { headers: this.getAuthHeaders() });
  }

  updateTransaction(transaction: Transaction): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/manager/${transaction.TransactionId}`, transaction, { headers: this.getAuthHeaders() });
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/customer/${userId}`, { headers: this.getAuthHeaders() });
  }
}
