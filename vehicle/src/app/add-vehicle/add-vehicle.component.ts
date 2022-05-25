import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  providers:[SharedserviceService]
})
export class AddVehicleComponent implements OnInit {

  vehicleform!:FormGroup;
  
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.vehicleform=this.formbuilder.group({
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      drivername:['',Validators.required],
      color:['',Validators.required],
      registerdate:['',Validators.required],
      chasisno:['',Validators.required],
      cost:['',Validators.required],
      _id:[''],
      _rev:[''],
    })
    this.get();
  }

  //This functioin is used when add
  showOrHide(){
    this.vehicleform.reset();
    this.share.showAdd=true;
    this.share.showUpdate=false;
  }
  
//Add function to add form value

  add(formvalue: any){
      this.api.addVehicleData(formvalue).subscribe(res=>{
        this.get();
        alert("Your data was posted successfully!");
        this.vehicleform.reset();
        let cancel=document.getElementById("cancel");
        cancel?.click();
      },rej=>{
        alert("opps! Can not post data"+rej);
      });
  }

//To get all data from database to show in table
  
  get(){
    this.api.getVehicleData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllVehicleData(key.id).subscribe(res=>{
          this.share.store.push(res);
        },rej=>{
        })
      }
    },rej=>{
        alert("opps! Somthing went wrong"+rej);
    })
  }

//To delete table row  

  delete(data:any){
    this.api.deleteVehicleData(data._id,data._rev).subscribe(res=>{
      alert("your data has deleted, please refresh the page");
      this.share.store=[];
      this.get();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }

//To eset values in table fields  

  onEdit(row:any){
    this.share.showAdd=false;
    this.share.showUpdate=true;
    this.vehicleform.controls['vehiclenumber'].setValue(row.vehiclenumber);
    this.vehicleform.controls['vehicletype'].setValue(row.vehicletype);
    this.vehicleform.controls['drivername'].setValue(row.drivername);
    this.vehicleform.controls['color'].setValue(row.color);
    this.vehicleform.controls['registerdate'].setValue(row.registerdate);
    this.vehicleform.controls['chasisno'].setValue(row.chasisno);
    this.vehicleform.controls['cost'].setValue(row.cost);
    this.vehicleform.controls['_id'].setValue(row._id);
    this.vehicleform.controls['_rev'].setValue(row._rev);
  }

//To update existing form values OR modified existing  
  update(formvalue:NgForm){
    this.api.updateVehicleData(formvalue).subscribe(res=>{
      alert("Your data was updated successfully!");
      this.vehicleform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.share.store=[];
      this.get();
      },rej=>{
      console.log("can not update.....",rej);
    })
  }

//Vehicle database check using Chasis number

  vehicleCheck(formvalue:any){
    this.share.showAdd=false;
    this.api.getVehicleData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllVehicleData(key.id).subscribe(res=>{
          this.share.storeValidation.push(res);
          for (const iterator of this.share.storeValidation) {
            if(iterator.chasisno==formvalue.chasisno || (iterator.vehiclenumber==formvalue.vehiclenumber && iterator.vehicletype==formvalue.vehicletype)){
              this.share.primaryCheck=1;
            }
          }
        })
      }
      setTimeout(()=>{
        if(this.share.primaryCheck==1){
          alert("your vehicle details already exist try new one!");
          this.share.store=[];
          this.get();
        }else{
          this.add(formvalue);
          this.share.store=[];
        }
      },1000);
    })
  }
}
