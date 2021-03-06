import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { LogInComponent } from './log-in/log-in.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { AddMaintanenceComponent } from './add-maintanence/add-maintanence.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { HomemenulayoutComponent } from './homemenulayout/homemenulayout.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { ReportCheckComponent } from './report-check/report-check.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutProductComponent,
    LogInComponent,
    ContactUsComponent,
    AddUserComponent,
    AddDriverComponent,
    AddVehicleComponent,
    AddFuelComponent,
    AddMaintanenceComponent,
    AddInsuranceComponent,
    HomemenulayoutComponent,
    AdminpageComponent,
    ReportCheckComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
