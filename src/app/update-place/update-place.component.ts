import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-place',
  templateUrl: './update-place.component.html',
  styleUrls: ['./update-place.component.css']
})
export class UpdatePlaceComponent implements OnInit {
  cityId:string;
  placeId:string;
  constructor(private route : ActivatedRoute,private toastr:ToastrService,private storage : AngularFireStorage, private db: AngularFirestore,private router:Router,private auth:AuthService) { }


  items:Observable<any>;
  ngOnInit() {
    if(!this.auth.isLoggedIn)
      {
        this.router.navigate(['login']);
        setTimeout(() => this.toastr.error("Please Login First!!"))
  
      }
    this.route.paramMap
    .subscribe(params => {
      this.cityId = params.get('cityId');
      console.log(this.cityId);
      this.placeId = params.get('placeId');
      console.log(this.placeId)
    });
    this.items = this.db.collection("Cities").doc(this.cityId).collection("Places").doc(this.placeId).valueChanges();
  }
  submit(form:NgForm)
  {
    // console.log(this.downloadURL)
    var data = form.value;
    delete data.file
    // data.placeImage =''+this.downloadURL;
    console.log(data);
    this.db.collection("Cities").doc(this.cityId).collection("Places").doc(this.placeId).update(data);
    console.log("Place Updated");
    form.resetForm();
    this.toastr.success("Place Updated successfully");
    this.router.navigate(['place',this.cityId]);
  }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
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
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success("Text Copied")

  }
}
