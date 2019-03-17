import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {
  guideId:string;
  planId:string;
  guideName:string;
  items:Observable<any>;

  constructor(private db: AngularFirestore,private route : ActivatedRoute,private toastr:ToastrService,private auth:AuthService,private router: Router) { }

  ngOnInit() {
    if(!this.auth.isLoggedIn)
    {
      this.router.navigate(['login']);
     setTimeout(()=>this.toastr.error("Please Login First!!")); 

    }
    this.route.paramMap
    .subscribe(params => {
      this.guideId = params.get('guideId');
      console.log(this.guideId);
      this.planId = params.get('planId');
      console.log(this.planId);
    });
    this.items = this.db.collection("Guides").doc(this.guideId).collection("Plans").doc(this.planId).valueChanges();
  }

  submitUpdate(form:NgForm)
  {
    // console.log(this.downloadURL)
    var data = form.value;
    data.Price = +data.Price
    console.log(data);
    this.db.collection("Guides").doc(this.guideId).collection("Plans").doc(this.planId).update(data);
    console.log("Place Updated");
    form.resetForm();
    this.toastr.success("Place Updated successfully");
    this.router.navigate(['/guide',this.guideId,'plans']);
  }

}
