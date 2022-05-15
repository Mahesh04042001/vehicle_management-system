import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomemenulayoutComponent } from './homemenulayout/homemenulayout.component';
import { LogInComponent } from './log-in/log-in.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { AddMaintanenceComponent } from './add-maintanence/add-maintanence.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
const routes: Routes = [
  {path:'menu',component:HomemenulayoutComponent},
  {path:'home',component:HomeComponent},
  {path:'contactus',component:ContactUsComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'app',component:AppComponent},
  {path:'login',component:LogInComponent},
  {path:'login/app',component:AppComponent},
  {path:'adminpage',component:AdminpageComponent},
  {path:'adduser',component:AddUserComponent},
  {path:'adddriver',component:AddDriverComponent},
  {path:'addvehicle',component:AddVehicleComponent},
  {path:'addfuel',component:AddFuelComponent},
  {path:'addmaintain',component:AddMaintanenceComponent},
  {path:'addinsurance',component:AddInsuranceComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
