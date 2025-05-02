import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent implements OnInit {
 
  constructor(private router: Router,private service : AuthService) { }
 
  ngOnInit(): void {
    //const role = localStorage.getItem('role');
    const role = this.service.getUserRole();
    if (role !== 'Manager') {
      this.router.navigate(['/login']);
    }
  }
 
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}