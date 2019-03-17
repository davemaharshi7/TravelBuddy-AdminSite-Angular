import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

class User{
  user_email:string;
  user_name:string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  ngOnInit(){
    if(!this.au.isLoggedIn)
    {
      this.router.navigate(['/login']);
      setTimeout(()=>this.t.error("Please Login First!!"));

    }
    
  }
  users: Observable<User[]>; 

  items: Observable<any[]>;
  constructor(private db: AngularFirestore, public au : AuthService,public  router:  Router,private t:ToastrService) {
    

    this.users = this.db.collection("Users").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const Id = a.payload.doc.id;
        return { Id, ...data };
      }))
    );
  }

  // submit(formC:NgForm)
  // {
  //   let data = formC.value;
  //   console.log(data.CityName);
  //   this.db.collection("Cities").add(data);
  //   this.t.success("Successfully Submitted","TravelBuddy");
  //   formC.resetForm();
  //   // this.router.navigate(['city']);
  // }

  delete(event,id:string)
  {
    // alert() 
  if(confirm("Are you sure to delete ")) {
    // console.log("Implement delete functionality here");
    this.db.collection("Users").doc(id).delete();
    console.log("Deleted!!"+id);
  }
    
  }

}
