import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://8080-bebececaaeeaadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io/api'; // Replace with actual API URL
  private tokenKey = 'authToken'; // Set local storage key properly
  private role = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.role = this.getUserRole();
    localStorage.setItem(this.role,this.role);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
        return payload['UserId']; // Access UserId using the custom key
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
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
        console.log('Decoded Payload:', payload); // Log to verify structure
        const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; // Access email
        const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Access role
        console.log('Email:', email);
        console.log('Role:', role);
        return role; // Return role
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  

  navigateBasedOnRole(): void {
    const role = this.getUserRole();
    
    switch (role) {
      // Console.log(role);
      case 'Manager':
        console.log(role);
        this.router.navigate(['/managernav']);
        break;
      case 'Customer':
        console.log(role);
        this.router.navigate(['/customernav']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
