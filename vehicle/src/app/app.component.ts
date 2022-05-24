import { Component } from '@angular/core';
import { SharedserviceService } from './service/sharedservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vehicle';
  sideBarOpen=true;
  constructor(public show:SharedserviceService) { }
 
}
