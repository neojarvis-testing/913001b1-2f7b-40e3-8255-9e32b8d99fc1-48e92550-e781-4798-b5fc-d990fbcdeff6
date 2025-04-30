import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-customernav',
  templateUrl: './customernav.component.html',
  styleUrls: ['./customernav.component.css']
})
export class CustomernavComponent implements OnInit {
 
  constructor(private router: Router) {}
 
  ngOnInit(): void {
    // Optionally check for valid login or role here
    const role = localStorage.getItem('role');
    if (role !== 'customer') {
      this.router.navigate(['/login']);
    }
  }
 
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
 