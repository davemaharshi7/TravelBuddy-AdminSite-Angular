import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { City } from '../City';
import { CityId } from 'src/CityId';
import { NgForm } from '@angular/forms';
class Guide{
  Guide_name:string;
  Language:string;
  Ratings:string;
  Gender:string;
  Current_city:String;
  Available:string;
}

class GuideId extends Guide{
  Id : string;
}

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  constructor(private db: AngularFirestore,private route : ActivatedRoute,private storage : AngularFireStorage,private toastr:ToastrService,private auth:AuthService,private router: Router) { }

  guides:Observable<Guide[]>
  cityId:string;
  CityName:string;
  // nothing:boolean = false;

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
      setTimeout(() => this.toastr.error("Please Login First!!"));

    }
    this.route.paramMap
      .subscribe(params => {
        this.cityId = params.get('cityId');
        // console.log(this.cityId);
      });
    // this.db.collection('Guides', ref => ref.where('Current_city', '==', this.cityId)).valueChanges().subscribe(
    //   data =>{ this.guides = data;
    //     // console.log(this.guides);
    //     if(this.guides.length <1)
    //     {
    //       this.nothing = true;
    //     }
    //   })
     this.guides=  this.db.collection('Guides', ref => ref.where('Current_city', '==', this.cityId)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Guide;
          const Id = a.payload.doc.id;
          // console.log("Id = "+Id);
  
          return { Id, ...data };
        }))
      );
      
    this.db.collection("Cities").doc<City>(this.cityId).valueChanges().subscribe(
      d => this.CityName = d.CityName.toString()
    )
    
  }
  submit(formA:NgForm)
  {
    let data = formA.value;
    data.Current_city = this.cityId
    if(data.Available == "true")
    {
      data.Available = true;
    } 
    else{
      data.Available = false;
    }
    data.Gender = +data.Gender
    data.Ratings = +data.Ratings

    console.log(data);
    this.db.collection("Guides").add(data);
    this.toastr.success("Successfully Added New Guide","TravelBuddy");
    formA.resetForm();
    // window.location.reload()
    // tshis.router.navigate(['/guides',this.cityId]);
  }
  delete(event,id:string)
  {
    // alert() 
  if(confirm("Are you sure to delete ")) {
    console.log("Implement delete functionality here");
    this.db.collection("Guides").doc(id).delete();
    console.log("Deleted!!"+id);
    this.toastr.error("Successfully Deleted","TravelBuddy");

  }
}
}
