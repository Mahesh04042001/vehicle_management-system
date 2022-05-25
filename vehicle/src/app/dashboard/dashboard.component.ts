import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noOfVehicle: any=0;
  noOfAdmin: any=0;
  noOfDriver: any=0;
  insuranceExp: any=0;
  maintanenceExp: any=0;
  fuelExp: any=0;
  totalExp: any=0;
  storeDriver:any;



  constructor(private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.getfuelExp();
    this.getinsuranceExp();
    this.getMaintanenceExp();
    setTimeout(() => {
      this.getVehicle();
      this.getAdmin();
      this.getDriver();
    }, 1000);
    
    this.getTotal();
  }

  //get the Total number of admin

  getAdmin(){
    this.api.getUserData().subscribe(res=>{
      this.share.store=res;
      this.share.store=this.share.store.rows;
      this.noOfAdmin=this.share.store.length;
    })
  }

  //get the Total number of Driver

  getDriver(){
    this.api.getDriverData().subscribe(res=>{
      this.share.store=res;
      this.share.store=this.share.store.rows;
      this.noOfDriver=this.share.store.length;
    })
  }

  //get the Total number of vehicle

  getVehicle(){
    this.api.getVehicleData().subscribe(res=>{
      this.share.store=res;
      this.share.store=this.share.store.rows;
      this.noOfVehicle=this.share.store.length;
    })
  }

  //get the Total expenditure of insurance

  getinsuranceExp(){
    this.api.getInsuranceData().subscribe(res=>{
      this.share.store=res;
      this.share.store=this.share.store.rows;
      for (const key of this.share.store) {
        this.api.getAllInsuranceData(key.id).subscribe(res=>{
          this.share.store=res;
          this.insuranceExp+=this.share.store.cost;
        })
      }
    })
  }

  //get the Total expenditure of maintanence

  getMaintanenceExp(){
    this.api.getMaintanenceData().subscribe(res=>{
      this.share.store=res;
      this.share.store=this.share.store.rows;
      for (const key of this.share.store) {
        this.api.getAllMaintanenceData(key.id).subscribe(res=>{
          this.share.store=res;
          this.maintanenceExp+=this.share.store.cost;
        })
      }
    })
  }

  //get the Total expenditure of fuel

  getfuelExp(){
    this.api.getFuleData().subscribe(res=>{
      this.share.store=res;
      this.share.store=this.share.store.rows;
      for (const key of this.share.store) {
        this.api.getAllFuelData(key.id).subscribe(res=>{
          this.share.store=res;
          this.fuelExp+=this.share.store.cost;
        })
      }
    })
  }

  //get the Total expenditure of system

  getTotal(){
    setTimeout(() => {
      this.totalExp=this.insuranceExp+this.maintanenceExp+this.fuelExp;
    },1000);
    
  }

}
