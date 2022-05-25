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
  storeInsureData:any;
  storeInsuranceObj:any;
  storeAllInsuranceObj:any;
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.insuranceform=this.formbuilder.group({
      vinNumber:[''],
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
    this.share.showAdd=true;
    this.share.showUpdate=false;
    this.share.setFieldShow=true;
  }
  
  //set values in drobdown

  setField(val:any){
    this.share.entryCheck=0;
    this.api.getAllVehicleData(val.target.value).subscribe(res=>{
      this.share.storeFieldObj=res;
      this.insuranceform.controls['vehiclenumber'].setValue(this.share.storeFieldObj.vehiclenumber);
      this.insuranceform.controls['vehicletype'].setValue(this.share.storeFieldObj.vehicletype);
      this.api.getInsuranceData().subscribe(res=>{
        this.storeInsuranceObj=res;
        this.storeInsuranceObj=this.storeInsuranceObj.rows;
        for (const key of this.storeInsuranceObj) {
          this.api.getAllInsuranceData(key.id).subscribe(res=>{
            this.storeAllInsuranceObj=res;
            if(this.storeAllInsuranceObj.unique==val.target.value){
              this.share.entryCheck=1;
              this.share.showAdd=false;
            }
          })
        }
      })
    })
    setTimeout(() => {
      if(this.share.entryCheck==1){
        alert("vehicle number and type already exist try another one");
      }
    }, 500);
  }

  setValueInDropdown(){
    this.api.getVehicleData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllVehicleData(key.id).subscribe(res=>{
          console.log(res);
          this.share.storeDrobdownObj.push(res);
          },rej=>{
            console.log("error"+rej);
        })
      }
    },rej=>{
      alert("opps! Somthing went wrong"+rej);
    })
  }

  //To add insurance setails

  add(formvalue:any){
    this.share.showAdd=false;
    this.api.getVehicleData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllVehicleData(key.id).subscribe(res=>{
          this.share.storeResObj=res;
          if(this.share.storeResObj.vehiclenumber==formvalue.vehiclenumber && this.share.storeResObj.vehicletype==formvalue.vehicletype){
            this.share.Vehiclecheck=1;
            var obj={
              company:formvalue.company,
              startdate:formvalue.startdate,
              enddate:formvalue.enddate,
              cost:formvalue.cost,
              unique:this.share.storeResObj._id,
            };
            this.api.addInsuranceData(obj).subscribe(res=>{
              alert("Your data was posted successfully!");
              this.insuranceform.reset();
              let cancel=document.getElementById("cancel");
              cancel?.click();
            },rej=>{
              alert("opps! Can not post data"+rej);
            });
          }
        },rej=>{
          console.log("error"+rej);
        })
      }
    },rej=>{
        alert("opps! Somthing went wrong"+rej);
    })
    setTimeout(():any=>{
      if(this.share.Vehiclecheck==1){
        this.share.store=[];
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
    this.share.arr=[];
    this.api.getInsuranceData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllInsuranceData(key.id).subscribe(res => {
          this.storeInsureData = res;
          this.share.arr.push(this.storeInsureData);
        })
      }
      setTimeout(()=>{
        for (const key of this.share.arr) {
          this.api.getAllVehicleData(key.unique).subscribe(res => {
            this.share.storeVehicleData = res;
            this.share.createObj = {
              vehiclenumber: this.share.storeVehicleData.vehiclenumber,
              vehicletype: this.share.storeVehicleData.vehicletype,
              company:key.company,
              startdate: key.startdate,
              enddate:key.enddate,
              cost: key.cost,
              unique: key.unique,
              _id: key._id,
              _rev: key._rev
            };
            this.share.store.push(this.share.createObj);
          });
        }
      },500);
    },rej=>{
      console.log("error",rej);
    })
  }

  //to delete the particular table field
  delete(data:any,data1:any){
    this.api.deleteInsuranceData(data._id,data1._rev).subscribe(res=>{
      alert("your data has deleted, please refresh the page");
      this.share.store=[];
      this.get();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }
  

  //To set the values in form
  onEdit(row:any){
    this.share.showAdd=false;
    this.share.showUpdate=true;
    this.share.setFieldShow=false;
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
    this.api.updateInsuranceData(formvalue).subscribe(res=>{
      alert("Your data was updated successfully!");
      this.insuranceform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.share.store=[];
      this.get();
    },rej=>{
      console.log("can not update.....",rej);
    })
  }
}
