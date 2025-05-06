import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
 
  public apiUrl = "https://8080-fcfcacacacacadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io"

  constructor(private http: HttpClient) {

  }

  private getAuthHeaders():
    HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Create a new account
  createAccount(account: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/account`, account, { headers: this.getAuthHeaders() });
  }

  // Get account by ID
  getAccountById(accountId: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/api/account/${accountId}`, { headers: this.getAuthHeaders() });
  }

  // Get accounts by User ID
  getAccountByUserId(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/api/account/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  // Get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/api/account`, { headers: this.getAuthHeaders() });
  }

  // Update an account
  updateAccount(accountId: number, account: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/account/${accountId}`, account, { headers: this.getAuthHeaders() });
  }



   // Upload proof of identity
  // uploadProofOfIdentity(file: File): Observable<{imageUrl: string}> {
  //     const formData = new FormData();
  //     formData.append('file', file, file.name);
        
  //       const httpOptions = {
  //         headers: new HttpHeaders({
  //           'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //         })
  //       };
        
  //     return this.http.post<{imageUrl: string}>(`${this.apiUrl}/api/account/upload`, formData, httpOptions);
  //   }

  
}
