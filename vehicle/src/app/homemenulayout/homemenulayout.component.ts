import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-homemenulayout',
  templateUrl: './homemenulayout.component.html',
  styleUrls: ['./homemenulayout.component.css']
})
export class HomemenulayoutComponent implements OnInit {

  getbool:any=true;
  constructor(public api:ApiService) { }

  ngOnInit(): void {
  
  }
  // onGenerate(getbool:any){
  //   this.getbool=getbool;
  //   console.log(this.getbool);

  // }


}
