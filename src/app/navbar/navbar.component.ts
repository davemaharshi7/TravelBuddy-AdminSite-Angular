import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated:boolean;
  constructor(public auth : AuthService) {
    
   }

  ngOnInit() {
    if(this.auth.isLoggedIn)
    {
      this.authenticated = true;
    }
    else{
      this.authenticated = false;
    }
  }
  Logout()
  {
    this.auth.logout();
  }
}
