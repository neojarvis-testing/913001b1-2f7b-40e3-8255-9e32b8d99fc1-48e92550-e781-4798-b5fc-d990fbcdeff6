import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


 
  public apiUrl = "https://8080-adbeaecaedadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io"

  constructor(private http:HttpClient) 
  { 

  }

  private getAuthHeaders():
   HttpHeaders
    {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({Authorization: `Bearer ${token}`});
  }

  createAccount(account : any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/account`,account, {headers: this.getAuthHeaders()});
  }


  getAccountById(accountId:number) : Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/api/account/${accountId}`, {headers: this.getAuthHeaders()});
  }

  getAccountByUserId(userId:number) : Observable<Account[]>
  {
    return this.http.get<Account[]>(`${this.apiUrl}/api/account/user/${userId}`, {headers: this.getAuthHeaders()});
  }

  getAllAccounts():Observable<Account[]>
  {
    return this.http.get<Account[]>(`${this.apiUrl}/api/account`, {headers:this.getAuthHeaders()});
  }

  updateAccount(account:Account) : Observable<any>
  {
    return this.http.put<any>(`${this.apiUrl}/api/account/${account.AccountId}`,account, {headers:this.getAuthHeaders()});
  }
}
