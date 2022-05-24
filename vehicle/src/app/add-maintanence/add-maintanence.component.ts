import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-add-maintanence',
  templateUrl: './add-maintanence.component.html',
  styleUrls: ['./add-maintanence.component.css'],
  providers:[SharedserviceService]
})
export class AddMaintanenceComponent implements OnInit {
  maintanenceform!:FormGroup;
  alluser!:any;
  store:any=[];
  showAdd!:boolean;
  showUpdate!:boolean;
  storeDrobdownObj:any=[];
  storeFieldObj:any;
  storeResObj:any;
  entryCheck:any=0;
  storeMaintainData:any;
  storeVehicleData:any;
  createObj:any;
  Vehiclecheck:any=0;
  arr:any=[];
  storeMaintanenceObj:any;
  storeAllMaintObj:any;
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.maintanenceform=this.formbuilder.group({
      vinNumber:['',Validators.required],
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      date:['',Validators.required],
      cost:['',Validators.required],
      description:['',Validators.required],
      _id:[''],
      _rev:[''],
      unique:['']
    })
    this.get();
    this.setValueInDropdown();
  }


  //To show add and hide update button function
  showOrHide(){
    this.maintanenceform.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  // To set the drobdown list
  setField(val:any){
    this.entryCheck=0;
    console.log("Hi"+val);
    this.api.getAllVehicleData(val.target.value).subscribe(res=>{
      console.log(res);
      this.storeFieldObj=res;
      this.maintanenceform.controls['vehiclenumber'].setValue(this.storeFieldObj.vehiclenumber);
      this.maintanenceform.controls['vehicletype'].setValue(this.storeFieldObj.vehicletype);
      this.api.getMaintanenceData().subscribe(res=>{
        this.storeMaintanenceObj=res;
        this.storeMaintanenceObj=this.storeMaintanenceObj.rows;
        console.log(this.storeMaintanenceObj);
        for (const key in this.storeMaintanenceObj) {
            const element = this.storeMaintanenceObj[key];
            this.api.getAllMaintanenceData(element.id).subscribe(res=>{
              this.storeAllMaintObj=res;
              if(this.storeAllMaintObj.unique==val.target.value){
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

  //To add maintanence details

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
                date:formvalue.date,
                cost:formvalue.cost,
                description:formvalue.description,
                unique:this.storeResObj._id,
              };
              this.api.addMaintanenceData(obj).subscribe(res=>{
                console.log("hello"+res);
                alert("Your data was posted successfully!");
                this.maintanenceform.reset();
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
        this.maintanenceform.reset();
        let cancel=document.getElementById("cancel");
        cancel?.click();
      }
    },500);
  }
  
  // //to get all the maintanence details form database

  get(){
    this.arr=[];
    this.api.getMaintanenceData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllMaintanenceData(element.id).subscribe(res => {
            this.storeMaintainData = res;
            console.log(this.storeMaintainData);    
            this.arr.push(this.storeMaintainData);
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
                date: element.date,
                cost: element.cost,
                description: element.description,
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


  //To delete the particular details
  delete(data:any){
    this.api.deleteMaintanenceData(data._id,data._rev).subscribe(res=>{
      console.log("delete response get");
      console.log(res);
      alert("your data has deleted, please refresh the page");
      this.store=[];
      this.get();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }
  
  //To set the values in form fileds
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.maintanenceform.controls['vehiclenumber'].setValue(row.vehiclenumber);
    this.maintanenceform.controls['vehicletype'].setValue(row.vehicletype);
    this.maintanenceform.controls['date'].setValue(row.date);
    this.maintanenceform.controls['cost'].setValue(row.cost);
    this.maintanenceform.controls['_id'].setValue(row._id);
    this.maintanenceform.controls['_rev'].setValue(row._rev);
    this.maintanenceform.controls['unique'].setValue(row.unique);
  }

  //To update the existing values in database

  update(formvalue:NgForm){
    console.log(formvalue);
    this.api.updateMaintanenceData(formvalue).subscribe(res=>{
      console.log("update success");
      console.log(res);
      alert("Your data was updated successfully!");
      this.maintanenceform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.get();
    },rej=>{
      console.log("can not update.....");
    })
  }
}
