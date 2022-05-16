import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
  providers:[SharedserviceService]
})
export class AddDriverComponent implements OnInit {
  driverform!:FormGroup;
  alluser!:any;
  store:any=[];
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.driverform=this.formbuilder.group({
      drivername:['',Validators.required],
      mobile:['',Validators.required],
      licencenumber:['',Validators.required],
      licenceenddate:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      _id:[''],
      _rev:[''],
    })
    this.getuser();
  }

  showOrHide(){
    this.driverform.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  adduser(formvalue:NgForm){
      console.log(formvalue);
      this.api.addDriverData(formvalue).subscribe(res=>{
      console.log("hello");
      alert("Your data was posted successfully!");
      this.driverform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.getuser();
    },rej=>{
      alert("opps! Can not post data"+rej);
    });
  }
  getuser(){
    this.api.getDriverData().subscribe(res=>{
      console.log(res);
      console.log("response is comming");
      this.alluser=res;
      this.alluser=this.alluser.rows;
      console.log(this.alluser);
      for (const key in this.alluser) {
            if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
              const element = this.alluser[key];
              console.log(element.id);
              this.api.getAllDriverData(element.id).subscribe(res=>{
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

    this.api.deleteDriverData(data._id,data1._rev).subscribe(res=>{
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
    this.driverform.controls['drivername'].setValue(row.drivername);
    this.driverform.controls['mobile'].setValue(row.mobile);
    this.driverform.controls['licencenumber'].setValue(row.licencenumber);
    this.driverform.controls['licenceenddate'].setValue(row.licenceenddate);
    this.driverform.controls['city'].setValue(row.city);
    this.driverform.controls['state'].setValue(row.state);
    this.driverform.controls['_id'].setValue(row._id);
    this.driverform.controls['_rev'].setValue(row._rev);
  }

  update(formvalue:NgForm){
    console.log(formvalue);
    this.api.updateDriverData(formvalue).subscribe(res=>{
      console.log("update success");
      console.log(res);
      alert("Your data was updated successfully!");
      this.driverform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.getuser();
    },rej=>{
      console.log("can not update.....");
    })

  }

}
