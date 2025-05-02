import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs'; 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://8080-aaaecbbaabdabcdaaadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io'; // Replace with actual API URL
  private tokenKey = 'authToken'; // Set local storage key properly
  private role = '';
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

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
    this.loggedIn$.next(true); // Set logged-in state to true
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
    const role = this.getUserRole(); // Retrieve the user's role

    switch (role) {
      case 'Manager':
        console.log(role); // For debugging
        this.router.navigate(['/manager/home']); // Navigate to the manager's home page
        break;

      case 'Customer':
        console.log(role); // For debugging
        this.router.navigate(['/customer/home']); // Navigate to the customer's home page
        break;

      default:
        this.router.navigate(['/login']); // Default to login page
    }
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userRole');
    this.loggedIn$.next(false); // Reset logged-in state
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable(); // Expose logged-in state as an observable
  }

}
