import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { ToastrModule } from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { CityServiceService } from './city-service.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { UpdateCityComponent } from './update-city/update-city.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { UpdatePlaceComponent } from './update-place/update-place.component';
import { GuideComponent } from './guide/guide.component';
import { UpdateGuideComponent } from './update-guide/update-guide.component';
import { PlansComponent } from './plans/plans.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    LoginComponent,
    UpdateCityComponent,
    NavbarComponent,
    HomeComponent,
    PlacesComponent,
    UpdatePlaceComponent,
    GuideComponent,
    UpdateGuideComponent,
    PlansComponent,
    UpdatePlanComponent,
    UsersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    BrowserModule, 
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AppRoutingModule,FormsModule,
    ToastrModule.forRoot(),
    FormsModule


  ],
  providers: [CityServiceService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
