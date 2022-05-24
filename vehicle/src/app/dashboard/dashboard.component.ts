import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

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
  store:any;
  storeDriver:any;



  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getfuelExp();
    this.getinsuranceExp();
    this.getMaintanenceExp();
    setTimeout(() => {
      this.getAdmin();
      this.getDriver();
      this.getVehicle();
    }, 500);
    
    this.getTotal();
  }

  getAdmin(){
    this.api.getUserData().subscribe(res=>{
      this.store=res;
      this.store=this.store.rows;
      console.log(this.store.length);
      this.noOfAdmin=this.store.length;
    })
  }
  getDriver(){
    this.api.getDriverData().subscribe(res=>{
      this.store=res;
      this.store=this.store.rows;
      console.log(this.store.length);
      this.noOfDriver=this.store.length;
    })
  }
  getVehicle(){
    this.api.getVehicleData().subscribe(res=>{
      this.store=res;
      this.store=this.store.rows;
      console.log(this.store.length);
      this.noOfVehicle=this.store.length;
    })
  }
  getinsuranceExp(){
    this.api.getInsuranceData().subscribe(res=>{
      this.store=res;
      this.store=this.store.rows;
      console.log('hello');
      console.log(this.store);
      for (const key in this.store) {
          const element = this.store[key];
          console.log(element.id);
          this.api.getAllInsuranceData(element.id).subscribe(res=>{
            this.store=res;
            console.log(this.store.cost);
            this.insuranceExp+=this.store.cost;
            console.log(this.insuranceExp);
          })
      }
    })
  }
  getMaintanenceExp(){
    this.api.getMaintanenceData().subscribe(res=>{
      this.store=res;
      this.store=this.store.rows;
      console.log('hello');
      console.log(this.store);
      for (const key in this.store) {
          const element = this.store[key];
          console.log(element.id);
          this.api.getAllMaintanenceData(element.id).subscribe(res=>{
            this.store=res;
            console.log(this.store.cost);
            this.maintanenceExp+=this.store.cost;
            console.log(this.maintanenceExp);
          })
      }
    })
  }
  getfuelExp(){
    this.api.getFuleData().subscribe(res=>{
      this.store=res;
      this.store=this.store.rows;
      console.log('hello');
      console.log(this.store);
      for (const key in this.store) {
          const element = this.store[key];
          console.log(element.id);
          this.api.getAllFuelData(element.id).subscribe(res=>{
            this.store=res;
            console.log(this.store.cost);
            this.fuelExp+=this.store.cost;
            console.log(this.fuelExp);
          })
      }
    })
  }
  getTotal(){
    setTimeout(() => {
      this.totalExp=this.insuranceExp+this.maintanenceExp+this.fuelExp;
      console.log(this.totalExp);
    },1000);
    
  }

}
