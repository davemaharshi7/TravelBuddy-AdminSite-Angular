import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // email:string;
  // pass:string;
  ngOnInit(){
    if(this.auth.isLoggedIn)
    {
      this.router.navigate(['/home']);
     setTimeout(()=>this.toastr.show("Already Logged In")); 

    }
  }
  private sub: any;
   constructor(private auth : AuthService,private router : Router,private toastr : ToastrService) {
  //    this.sub =this.af.authState.subscribe(auth => { 
  //    if (auth != null) {
  //     this.authenticated = true;
  //    }
  //   }
  // )
}
 submit(form:NgForm) {
   var data = form.value;
   //console.log("Now DATA :"+data.email);
   var email = data.email;
   var pass = data.pass; 
   this.auth.login(email,pass);
 }

// logOut() {
//  this.af.auth.signOut();
//  this.authenticated = false;
// }
// ngOnDestroy() {
//   this.sub.unsubscribe();
// }
}
