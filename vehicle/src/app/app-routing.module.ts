import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomemenulayoutComponent } from './homemenulayout/homemenulayout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { AddMaintanenceComponent } from './add-maintanence/add-maintanence.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { ReportCheckComponent } from './report-check/report-check.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthendicationGuard } from './authentication/authendication.guard';
import { LogInComponent } from './log-in/log-in.component';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'menu',canActivate:[AuthendicationGuard],component:HomemenulayoutComponent,
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'aboutus',component:AboutProductComponent},
      {path:'adminpage',component:AdminpageComponent},
      {path:'contactus',component:ContactUsComponent},
      {path:'aboutus',component:AboutProductComponent},
      {path:'adduser',component:AddUserComponent},
      {path:'adddriver',component:AddDriverComponent},
      {path:'addvehicle',component:AddVehicleComponent},
      {path:'addfuel',component:AddFuelComponent},
      {path:'addmaintain',component:AddMaintanenceComponent},
      {path:'addinsurance',component:AddInsuranceComponent},
      {path:'report',component:ReportCheckComponent},
      {path:'dash_board',component:DashboardComponent}
    ]
  },
  {path:'login',component:LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
