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
  store:any=[];
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.fuelform=this.formbuilder.group({
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      quantity:['',Validators.required],
      fillingdate:['',Validators.required],
      cost:['',Validators.required],
      _id:[''],
      _rev:[''],
    })
    this.getuser();

  }

  showOrHide(){
    this.fuelform.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  adduser(formvalue:NgForm){
      console.log(formvalue);
      this.api.addFuelData(formvalue).subscribe(res=>{
      console.log("hello");
      alert("Your data was posted successfully!");
      this.fuelform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.getuser();
    },rej=>{
      alert("opps! Can not post data"+rej);
    });
  }
  getuser(){
    this.api.getFuleData().subscribe(res=>{
      console.log(res);
      console.log("response is comming");
      this.alluser=res;
      this.alluser=this.alluser.rows;
      console.log(this.alluser);
      for (const key in this.alluser) {
            if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
              const element = this.alluser[key];
              console.log(element.id);
              this.api.getAllFuelData(element.id).subscribe(res=>{
                console.log(res);
                this.store.push(res);
                console.log("data is came");
              },rej=>{
                console.log("error"+rej);
              })
            
            }
          }
    },rej=>{
        alert("opps! Somthing went wrong"+rej);
    })
  }
  
  delete(data:any,data1:any){
    console.log("delete called"+data._id);
    console.log("delete called"+data1._rev);

    this.api.deleteFuelData(data._id,data1._rev).subscribe(res=>{
      console.log("delete response get");
      console.log(res);
      alert("your data has deleted, please refresh the page");
      this.store=[];
      this.getuser();
    },rej=>{
      alert("oops can not delete"+rej);
    })

  }
  
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
  }

  update(formvalue:NgForm){
    console.log(formvalue);
    this.api.updateFuelData(formvalue).subscribe(res=>{
      console.log("update success");
      console.log(res);
      alert("Your data was updated successfully!");
      this.fuelform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.getuser();
    },rej=>{
      console.log("can not update.....");
    })

  }


}
