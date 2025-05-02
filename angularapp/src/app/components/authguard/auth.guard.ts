import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  // Authentication check method within AuthGuard
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Returns true if a token exists
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.isAuthenticated()) {
      return true; // Allow access
    } else {
      return this.router.parseUrl('/'); // Navigate to navbar if not logged in
    }
  }
}
