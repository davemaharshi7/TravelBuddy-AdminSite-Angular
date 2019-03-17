import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

class Guide{
  Guide_name:string;
  Language:string;
  Ratings:string;
  Gender:string;
  Current_city:String;
  Available:string;
}
class Plan{
  Duration:string;
  Plan_name:string;
  Plan_places:string;
  Price:string;
}
class PlanId extends Plan{
  Id:string;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  
  guideId:string;
  guideName:string;
  plans:Observable<PlanId[]>

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
    });
    var obj = this.db.collection("Guides").doc<Guide>(this.guideId).valueChanges();
    obj.subscribe(a => this.guideName = a.Guide_name)
    this.plans = this.db.collection("Guides").doc(this.guideId).collection<Plan>("Plans").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Plan;
        const Id = a.payload.doc.id;
        return { Id, ...data };
      }))
    );
  }
  delete(event, gid: string, pid: string) {
    
    if (confirm("Are you sure to delete ")) {
      // console.log("Implement delete functionality here");
      this.db.collection("Guides").doc(gid).collection("Plans").doc(pid).delete();
      // console.log("Deleted!!"+gid+"Plans"+pid);
      this.toastr.success("Deleted Place!")
    }
  }
  submit(form:NgForm)
  {
    var data = form.value;
    data.Price = +data.Price
    console.log(data);
    this.db.collection("Guides").doc(this.guideId).collection("Plans").add(data);
    console.log("Place Added");
    form.resetForm();
    this.toastr.success("Plan Added successfully","TravelBuddy");
  }
}
