import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth : AuthService,private router:Router,private t : ToastrService) { }

  ngOnInit() {
    if(!this.auth.isLoggedIn)
    {
      this.router.navigate(['/login']);
     setTimeout(()=>this.t.error("Please Login First!!")); 
    }
  }

}
