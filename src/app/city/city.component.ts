import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
// import { NgForm } from '@angular/forms';
import { CityServiceService } from '../city-service.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { City } from '../City';
import { CityId } from 'src/CityId';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { auth } from 'firebase';

@Component({  
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  private cityCollection: AngularFirestoreCollection<City>;
  ngOnInit(){
    //Simple JSON data
    //this.items = this.db.collection('Cities').valueChanges();
    if(!this.au.isLoggedIn)
    {
      this.router.navigate(['/login']);
      setTimeout(()=>this.t.error("Please Login First!!"));

    }
    
  }
  citys: Observable<CityId[]>; 

  items: Observable<any[]>;
  constructor(private db: AngularFirestore, public au : AuthService,public  router:  Router,private t:ToastrService) {
   


    this.cityCollection = db.collection<City>('Cities');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.citys = this.cityCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as City;
        const Id = a.payload.doc.id;
        // console.log("Id = "+Id);

        return { Id, ...data };
      }))
    );
  }

  submit(formC:NgForm)
  {
    let data = formC.value;
    console.log(data.CityName);
    this.db.collection("Cities").add(data);
    this.t.success("Successfully Submitted","TravelBuddy");
    formC.resetForm();
    // this.router.navigate(['city']);
  }

  delete(event,id:string)
  {
    // alert() 
  if(confirm("Are you sure to delete ")) {
    console.log("Implement delete functionality here");
    this.db.collection("Cities").doc(id).delete();
    console.log("Deleted!!"+id);
  }
    
  }
}
