

import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://8080-adbeaecaedadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api';
  private tokenKey = 'authToken';
  private role = '';
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Optional() @Inject(Router) private router?: Router // Make Router optional
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.role = this.getUserRole();
    localStorage.setItem('userRole', this.role);
    this.loggedIn$.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload['UserId'];
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        //http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name

      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  navigateBasedOnRole(): void {
    if (!this.router) return; // Ensure Router exists before using it

    const role = this.getUserRole();
    switch (role) {
      case 'Manager':
        this.router.navigate(['/manager/home']);
        break;
      case 'Customer':
        this.router.navigate(['/customer/home']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userRole');
    this.loggedIn$.next(false);
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
  isManager(): boolean {
    return this.getUserRole() === 'Manager';
  }
 
  isCustomer(): boolean {
    return this.getUserRole() === 'Customer';
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        console.log("Decoded Payload:", payload); // Debugging Output
        return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null; // Ensure proper key access
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }
 
}

