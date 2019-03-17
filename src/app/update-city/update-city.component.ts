import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { City } from '../City';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
// import * as $ from 'jquery';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.css']
})
export class UpdateCityComponent implements OnInit {
  
   //@Input('doc_id') docID:string;
    public id:string;
    items:Observable<City>;

    ngOnInit() {
      //console.log("LLL"+this.docID);
      if(!this.auth.isLoggedIn)
      {
        this.router.navigate(['login']);
        setTimeout(() =>this.toastr.error("Please Login First!!")) 
  
      }

      this.items = this.db.collection("Cities").doc<City>(this.id).valueChanges();
      // console.log(this.items);s
     
    }
    
    constructor(private route : ActivatedRoute,private db: AngularFirestore,
      private router:Router,private auth:AuthService,private toastr:ToastrService)
    {
      this.route.paramMap
      .subscribe(params =>{
        this.id = params.get('id');
        console.log(this.id);
      })
    }

    
  submitUpdate(form:NgForm)
  {
    let dat = form.value;
    // console.log("DDDD:"+dat.CityName);
    this.db.collection("Cities").doc(this.id).update(dat);
    form.resetForm();
    console.log("Data send Successfully:");
    this.router.navigate(['city']);
    // this.toastr.success("Successfully Submitted","TravelBuddy");
  }

}
