import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';
import { LoginComponent } from './login/login.component';
import { UpdateCityComponent } from './update-city/update-city.component';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { UpdatePlaceComponent } from './update-place/update-place.component';
import { GuideComponent } from './guide/guide.component';
import { UpdateGuideComponent } from './update-guide/update-guide.component';
import { PlansComponent } from './plans/plans.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'city',component:CityComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UsersComponent},
  {path:'city/update/:id',component:UpdateCityComponent},
  {path:"home",component:HomeComponent},
  {path:"place/:cityId",component:PlacesComponent},
  {path:"place/:cityId/update/:placeId",component:UpdatePlaceComponent},
  {path:"guides/:cityId",component:GuideComponent},
  {path:"guides/update/:guideId",component:UpdateGuideComponent},
  {path:"guide/:guideId/plans",component:PlansComponent},
  {path:"guide/:guideId/plan/update/:planId",component:UpdatePlanComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
