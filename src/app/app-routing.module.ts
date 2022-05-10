import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomemenulayoutComponent } from './homemenulayout/homemenulayout.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  // {
  //   path:'',component:HomemenulayoutComponent
  // },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'app',component:AppComponent
  },
  {
    path:'login',component:LogInComponent
  },
  {
    path:'login/app',component:AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
