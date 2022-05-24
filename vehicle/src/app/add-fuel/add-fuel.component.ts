import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css'],
  providers:[SharedserviceService]
})
export class AddFuelComponent implements OnInit {

  fuelform!:FormGroup;
  alluser!:any;
  storeded:any=[];
  storeDrobdownObj:any=[];
  storeFieldObj:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  storeResObj:any;
  entryCheck:any=0;
  storeFuelData:any;
  storeVehicleData:any;
  createObj:any;
  Vehiclecheck:any=0;
  arr:any=[];
  storeFuelObj:any;
  storeAllFuelObj:any;

  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.fuelform=this.formbuilder.group({
      vinNumber:['',Validators.required],
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      quantity:['',Validators.required],
      fillingdate:['',Validators.required],
      cost:['',Validators.required],
      _id:[''],
      _rev:[''],
      unique:['']
    })
    this.setValueInDropdown();
    this.get();
  }


  //To show add and hide update button
  showOrHide(){
    this.fuelform.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  
 
  // setField(val:any){
  //   console.log("Hi"+val);
  //   this.api.getAllVehicleData(val.target.value).subscribe(res=>{
  //     console.log(res);
  //     this.storeFieldObj=res;
  //     this.fuelform.controls['vehiclenumber'].setValue(this.storeFieldObj.vehiclenumber);
  //     this.fuelform.controls['vehicletype'].setValue(this.storeFieldObj.vehicletype);
  //   })
  // }

  setField(val:any){
    this.entryCheck=0;
    console.log("Hi"+val);
    this.api.getAllVehicleData(val.target.value).subscribe(res=>{
      console.log(res);
      this.storeFieldObj=res;
      this.fuelform.controls['vehiclenumber'].setValue(this.storeFieldObj.vehiclenumber);
      this.fuelform.controls['vehicletype'].setValue(this.storeFieldObj.vehicletype);
      this.api.getFuleData().subscribe(res=>{
        this.storeFuelObj=res;
        this.storeFuelObj=this.storeFuelObj.rows;
        console.log(this.storeFuelObj);
        for (const key in this.storeFuelObj) {
            const element = this.storeFuelObj[key];
            this.api.getAllFuelData(element.id).subscribe(res=>{
              this.storeAllFuelObj=res;
              if(this.storeAllFuelObj.unique==val.target.value){
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

  //to delete the particular table field
  delete(data:any){
    this.api.deleteFuelData(data._id,data._rev).subscribe(res=>{
      console.log("delete response get");
      console.log(res);
      alert("your data has deleted, please refresh the page");
      this.storeded=[];
      this.get();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }
  

  //setValue in form
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.fuelform.controls['vehiclenumber'].setValue(row.vehiclenumber);
    this.fuelform.controls['vehicletype'].setValue(row.vehicletype);
    this.fuelform.controls['quantity'].setValue(row.quantity);
    this.fuelform.controls['fillingdate'].setValue(row.fillingdate);
    this.fuelform.controls['cost'].setValue(row.cost);
    this.fuelform.controls['_id'].setValue(row._id);
    this.fuelform.controls['_rev'].setValue(row._rev);
    this.fuelform.controls['unique'].setValue(row.unique);
  }

  //update existing form value
  update(formvalue:any){
    console.log("update start");
    console.log(this.storeded);
    console.log(formvalue);
    console.log("update"+formvalue._id);
    this.api.updateFuelData(formvalue).subscribe(res=>{
      alert("Your data was updated successfully!");
      this.fuelform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      console.log("settimeout");
      console.log(this.storeded);
    },rej=>{
      console.log("can not update.....",rej);
    });
    this.storeded=[]
    this.get();
  }
  

  //Add new record
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
                quantity:formvalue.quantity,
                fillingdate:formvalue.fillingdate,
                cost:formvalue.cost,
                unique:this.storeResObj._id,
              };
              this.api.addFuelData(obj).subscribe(res=>{
                console.log("hello"+res);
                alert("Your data was posted successfully!");
                this.fuelform.reset();
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
        this.storeded=[];
        this.get();
        return 1;
      }else{
        alert("Pleae register your vehicle in Add new vehicle from!");
        this.fuelform.reset();
        let cancel=document.getElementById("cancel");
        cancel?.click();
      }
    },500);
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
  get(){
    this.arr=[];
    this.api.getFuleData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllFuelData(element.id).subscribe(res => {
            this.storeFuelData = res;
            console.log(this.storeFuelData);    
            this.arr.push(this.storeFuelData);
          })
        }
      }
      setTimeout(()=>{
        console.log("timout");
        console.log(this.arr);
        console.log("check storeded array");
        console.log(this.storeded);
        for (const key in this.arr) {
          if (Object.prototype.hasOwnProperty.call(this.arr, key)) {
            const element = this.arr[key];
            this.api.getAllVehicleData(element.unique).subscribe(res => {
              this.storeVehicleData = res;
              this.createObj = {
                vehiclenumber: this.storeVehicleData.vehiclenumber,
                vehicletype: this.storeVehicleData.vehicletype,
                quantity: element.quantity,
                fillingdate: element.fillingdate,
                cost: element.cost,
                unique: element.unique,
                _id: element._id,
                _rev: element._rev
              };
              console.log(this.createObj);
              this.storeded.push(this.createObj);
            });
          }
        }
      },500);
    },rej=>{
      console.log("error",rej);
    })
  }
}



