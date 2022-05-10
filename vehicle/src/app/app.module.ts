import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogInComponent } from './log-in/log-in.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FirstmenuComponent } from './firstmenu/firstmenu.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { AddMaintanenceComponent } from './add-maintanence/add-maintanence.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { HomemenulayoutComponent } from './homemenulayout/homemenulayout.component';
import { HomemenurouteModule } from './homemenulayout/homemenuroute.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminpageComponent } from './adminpage/adminpage.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    LogInComponent,
    ContactUsComponent,
    FirstmenuComponent,
    AddUserComponent,
    AddDriverComponent,
    AddVehicleComponent,
    AddFuelComponent,
    AddMaintanenceComponent,
    AddInsuranceComponent,
    HomemenulayoutComponent,
    AdminpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomemenurouteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
