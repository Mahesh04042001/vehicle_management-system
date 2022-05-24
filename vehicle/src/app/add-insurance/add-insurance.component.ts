import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css'],
  providers:[SharedserviceService]
})
export class AddInsuranceComponent implements OnInit {

  insuranceform!:FormGroup;
  alluser!:any;
  store:any=[];
  store2:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  storeDrobdownObj:any=[];
  storeFieldObj:any;
  storeResObj:any;
  entryCheck:any=0;
  storeInsureData:any;
  storeVehicleData:any;
  createObj:any;
  Vehiclecheck:any=0;
  arr:any=[];
  storeInsuranceObj:any;
  storeAllInsuranceObj:any;
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.insuranceform=this.formbuilder.group({
      vinNumber:['',Validators.required],
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      company:['',Validators.required],
      startdate:['',Validators.required],
      enddate:['',Validators.required],
      cost:['',Validators.required],
      _id:[''],
      _rev:[''],
      unique:['']
    })
    this.get();
    this.setValueInDropdown();
  }



  //To show add and hide update button
  showOrHide(){
    this.insuranceform.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  //set values in drobdown

  setField(val:any){
    this.entryCheck=0;
    console.log("Hi"+val);
    this.api.getAllVehicleData(val.target.value).subscribe(res=>{
      console.log(res);
      this.storeFieldObj=res;
      this.insuranceform.controls['vehiclenumber'].setValue(this.storeFieldObj.vehiclenumber);
      this.insuranceform.controls['vehicletype'].setValue(this.storeFieldObj.vehicletype);
      this.api.getInsuranceData().subscribe(res=>{
        this.storeInsuranceObj=res;
        this.storeInsuranceObj=this.storeInsuranceObj.rows;
        console.log(this.storeInsuranceObj);
        for (const key in this.storeInsuranceObj) {
            const element = this.storeInsuranceObj[key];
            this.api.getAllInsuranceData(element.id).subscribe(res=>{
              this.storeAllInsuranceObj=res;
              if(this.storeAllInsuranceObj.unique==val.target.value){
                this.entryCheck=1;
                this.showAdd=false;
              }
            })
        }
      })
    })
    setTimeout(() => {
      if(this.entryCheck==1){
        alert("vehicle number and type already exist try another one");
      }
    }, 500);
  }

  setValueInDropdown(){
    this.api.getVehicleData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllVehicleData(element.id).subscribe(res=>{
            console.log(res);
            this.storeDrobdownObj.push(res);
            },rej=>{
              console.log("error"+rej);
          })
        }
      }
    },rej=>{
      alert("opps! Somthing went wrong"+rej);
    })
  }

  //To add insurance setails

  add(formvalue:any){
    this.showAdd=false;
    this.api.getVehicleData().subscribe(res=>{
      console.log(res);
      console.log("response is comming");
      this.alluser=res;
      this.alluser=this.alluser.rows;
      console.log(this.alluser);
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          console.log(element.id);
          this.api.getAllVehicleData(element.id).subscribe(res=>{
            console.log(res);
            this.storeResObj=res;
            if(this.storeResObj.vehiclenumber==formvalue.vehiclenumber && this.storeResObj.vehicletype==formvalue.vehicletype){
              console.log(this.storeResObj._id);
              this.Vehiclecheck=1;
              var obj={
                company:formvalue.company,
                startdate:formvalue.startdate,
                enddate:formvalue.enddate,
                cost:formvalue.cost,
                unique:this.storeResObj._id,
              };
              this.api.addInsuranceData(obj).subscribe(res=>{
                console.log("hello"+res);
                alert("Your data was posted successfully!");
                this.insuranceform.reset();
                let cancel=document.getElementById("cancel");
                cancel?.click();
              },rej=>{
                alert("opps! Can not post data"+rej);
              });
            }else{
            }
          },rej=>{
            console.log("error"+rej);
          })
        }
      }
    },rej=>{
        alert("opps! Somthing went wrong"+rej);
    })
    setTimeout(():any=>{
      if(this.Vehiclecheck==1){
        this.store=[];
        this.get();
      }else{
        alert("Pleae register your vehicle in Add new vehicle from!");
        this.insuranceform.reset();
        let cancel=document.getElementById("cancel");
        cancel?.click();
      }
    },500);
  }


  //to get the all forms details

  get(){
    this.arr=[];
    this.api.getInsuranceData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllInsuranceData(element.id).subscribe(res => {
            this.storeInsureData = res;
            console.log(this.storeInsureData);    
            this.arr.push(this.storeInsureData);
          })
        }
      }
      setTimeout(()=>{
        console.log("timout");
        console.log(this.arr);
        for (const key in this.arr) {
          if (Object.prototype.hasOwnProperty.call(this.arr, key)) {
            const element = this.arr[key];
            this.api.getAllVehicleData(element.unique).subscribe(res => {
              this.storeVehicleData = res;
              this.createObj = {
                vehiclenumber: this.storeVehicleData.vehiclenumber,
                vehicletype: this.storeVehicleData.vehicletype,
                company:element.company,
                startdate: element.startdate,
                enddate:element.enddate,
                cost: element.cost,
                unique: element.unique,
                _id: element._id,
                _rev: element._rev
              };
              console.log(this.createObj);
              this.store.push(this.createObj);
            });
          }
        }
      },500);
    },rej=>{
      console.log("error",rej);
    })
  }

  //to delete the particular table field
  delete(data:any,data1:any){
    console.log("delete called"+data._id);
    console.log("delete called"+data1._rev);
    this.api.deleteInsuranceData(data._id,data1._rev).subscribe(res=>{
      console.log("delete response get");
      console.log(res);
      alert("your data has deleted, please refresh the page");
      this.store=[];
      this.get();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }
  

  //To set the values in form
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.insuranceform.controls['vehiclenumber'].setValue(row.vehiclenumber);
    this.insuranceform.controls['vehicletype'].setValue(row.vehicletype);
    this.insuranceform.controls['company'].setValue(row.company);
    this.insuranceform.controls['startdate'].setValue(row.startdate);
    this.insuranceform.controls['enddate'].setValue(row.enddate);
    this.insuranceform.controls['cost'].setValue(row.cost);
    this.insuranceform.controls['_id'].setValue(row._id);
    this.insuranceform.controls['_rev'].setValue(row._rev);
    this.insuranceform.controls['unique'].setValue(row.unique);
  }


  // To update the existing values
  update(formvalue:NgForm){
    console.log(formvalue);
    this.api.updateInsuranceData(formvalue).subscribe(res=>{
      console.log("update success");
      console.log(res);
      alert("Your data was updated successfully!");
      this.insuranceform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.get();
    },rej=>{
      console.log("can not update.....");
    })
  }
}
