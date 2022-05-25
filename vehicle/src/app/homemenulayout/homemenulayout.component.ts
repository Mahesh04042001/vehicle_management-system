import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../check/service.service';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-homemenulayout',
  templateUrl: './homemenulayout.component.html',
  styleUrls: ['./homemenulayout.component.css']
})
export class HomemenulayoutComponent implements OnInit {

  constructor(public api:ApiService,private share:SharedserviceService,private route:Router,private ser:ServiceService) { }

  ngOnInit(): void {
  
  }
  logout(){
    this.ser.showTag=false;
    localStorage.removeItem('currentUser');
    this.route.navigate(['/login']);
  }


}
