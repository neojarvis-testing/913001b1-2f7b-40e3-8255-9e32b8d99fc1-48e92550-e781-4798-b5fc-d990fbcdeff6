
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent implements OnInit {
 username : string = '';
  constructor(private router: Router,private service : AuthService) { }
 
  ngOnInit(): void {

   this.username = this.service.getUsername();
  }

  openLogoutPopup(): void {
    this.showLogoutConfirm = true;
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }

  confirmLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}