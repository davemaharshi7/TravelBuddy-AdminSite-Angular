import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router,private toastr:ToastrService) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  email:any
    async login(email: string, password: string) {
      
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(()=>setTimeout(()=>this.toastr.error("ERROR, Wrong Password or Email"))).then(()=>this.email = this.afAuth.user) 
      // console.log(email);

      if(email === 'preetgandhi99@gmail.com')
      {
        this.router.navigate(['/home']);
        window.location.reload();

      }
      else{
        this.logout();
        setTimeout(() => this.toastr.error("You are Not Admin!!"))
      }      
    }
    
    async register(email: string, password: string) {
      var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      this.sendEmailVerification();
    }
    
    async sendEmailVerification() {
      await this.afAuth.auth.currentUser.sendEmailVerification()
      this.router.navigate(['admin/verify-email']);
    }
    
    async sendPasswordResetEmail(passwordResetEmail: string) {
      return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
    }
    
    async logout(){
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    }
    
    get isLoggedIn(): boolean {
      const  user  =  JSON.parse(localStorage.getItem('user'));
      return  user  !==  null;
    }
}
