import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
                  //https://8080-ffcdceafdeadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api/Account
  public apiUrl = "https://8080-ffcdceafdeadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io"

  constructor(private http: HttpClient) {

  }

  private getAuthHeaders():
    HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  createAccount(account: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Account`, account, { headers: this.getAuthHeaders() });
  }


  getAccountById(accountId: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/api/Account/${accountId}`, { headers: this.getAuthHeaders() });
  }

  getAccountByUserId(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/api/Account/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/api/Account`, { headers: this.getAuthHeaders() });
  }

  updateAccount(accountId: number, account: Account): Observable<any> {
    
    return this.http.put<any>(`${this.apiUrl}/api/Account/${accountId}`, account, { headers: this.getAuthHeaders() });
  }
  
}

