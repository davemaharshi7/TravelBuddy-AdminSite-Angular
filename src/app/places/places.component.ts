import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../City';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { async } from '@angular/core/testing';
import { AuthService } from '../auth.service';

class Place{
  placeName:string;
  placeDescription:string;
  placeImage:string;
  placeOpenTiming:string;
  reasonToVisit:string;
  placeCloseDays:string;
}

class PlaceId extends Place{
  Id : string;
}


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  items: Observable<any[]>;
  cityId:string;
  cityName:String;
  places: Observable<PlaceId[]>; 
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private db: AngularFirestore,private route : ActivatedRoute,private storage : AngularFireStorage,private toastr:ToastrService,private auth:AuthService,private router: Router) {

  }
  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file);
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )

   )
  .subscribe()
  }
  // private cityDoc :AngularFirestoreDocument<City>

  delete(event,cid:string,pid:string)
  {
    // alert() 
  if(confirm("Are you sure to delete ")) {
    console.log("Implement delete functionality here");
    this.db.collection("Cities").doc(cid).collection("Places").doc(pid).delete();
    console.log("Deleted!!");
    this.toastr.success("Deleted Place!")
  }
}

  ngOnInit() {
    if(!this.auth.isLoggedIn)
    {
      this.router.navigate(['login']);
     setTimeout(()=>this.toastr.error("Please Login First!!")); 

    }
    this.route.paramMap
    .subscribe(params => {
      this.cityId = params.get('cityId');
      console.log(this.cityId);
    });
     var obj = this.db.collection("Cities").doc<City>(this.cityId).valueChanges();
    obj.subscribe(a => this.cityName = a.CityName)
    this.places = this.db.collection("Cities").doc(this.cityId).collection<Place>("Places").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Place;
        const Id = a.payload.doc.id;
        return { Id, ...data };
      }))
    );
  }
  submit(form:NgForm)
  {
    console.log(this.downloadURL)
    var data = form.value;
    delete data.file
    // data.placeImage =''+this.downloadURL;
    console.log(data);
    this.db.collection("Cities").doc(this.cityId).collection("Places").add(data);
    console.log("Place Added");
    form.resetForm();
    this.toastr.success("Place Added successfully")
  }
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success("Text Copied")

  }
}
