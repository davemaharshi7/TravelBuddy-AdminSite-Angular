import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
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
  selector: 'app-update-guide',
  templateUrl: './update-guide.component.html',
  styleUrls: ['./update-guide.component.css']
})
export class UpdateGuideComponent implements OnInit {

  public guideId:string;
  items:Observable<Guide>;

  constructor(private route : ActivatedRoute,private db: AngularFirestore,
    private router:Router,private auth:AuthService,private toastr:ToastrService)
  {
    this.route.paramMap
    .subscribe(params =>{
      this.guideId = params.get('guideId');
      console.log(this.guideId);
    })
  }
  

  ngOnInit() {
    //console.log("LLL"+this.docID);
    if(!this.auth.isLoggedIn)
    {
      this.router.navigate(['login']);
      setTimeout(() =>this.toastr.error("Please Login First!!")) 

    }

    this.items = this.db.collection("Guides").doc<Guide>(this.guideId).valueChanges();
    // console.log(this.items);s
   
  }

  submitUpdate(form:NgForm)
  {
    let dat = form.value;
    if(dat.Available == "true")
    {
      dat.Available = true;
    } 
    else{
      dat.Available = false;
    }
    dat.Gender = +dat.Gender
    dat.Ratings = +dat.Ratings
    console.log(dat);
    this.db.collection("Guides").doc(this.guideId).update(dat);
    form.resetForm();
    console.log("Data send Successfully:");
    this.toastr.success("Successfully Submitted","TravelBuddy");
    this.router.navigate(['/city']);

  }
  
}
