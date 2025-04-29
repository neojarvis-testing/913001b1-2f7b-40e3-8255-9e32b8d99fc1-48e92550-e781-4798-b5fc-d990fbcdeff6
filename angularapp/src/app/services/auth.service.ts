import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://8080-bebececaaeeaadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api/login'; // Replace with actual API URL
  private tokenKey = 'authToken'; // Set local storage key properly

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    // console.log(email)
    return this.http.post(this.apiUrl, { email, password });
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Manually decode JWT payload
        return payload.role;
      } catch (error) {
        console.error('Invalid token format:', error);
        return null;
      }
    }
    return null;
  }

  navigateBasedOnRole(): void {
    const role = this.getUserRole();
    switch (role) {
      case 'Manager':
        this.router.navigate(['/customer']);
        break;
      case 'user':
        this.router.navigate(['/user']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}