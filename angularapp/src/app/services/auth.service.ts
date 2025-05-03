

import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://8080-fcfcacacacacadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api';
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

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}

