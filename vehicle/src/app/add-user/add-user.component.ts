import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers:[SharedserviceService]
})
export class AddUserComponent implements OnInit {
  hide=true;
  userform!:FormGroup;
  
  
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService,private route:Router) { }

  ngOnInit(): void {
    this.userform=this.formbuilder.group({
      name:['',Validators.required],
      username:['',Validators.required],
      pwd:['',Validators.required],
      mobile:['',Validators.required],
      dob:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      _id:[''],
      _rev:[''],
    });
    this.getuser();

  }

  //show add and hide update button using this function
  showOrHide(){
    this.userform.reset();
    this.share.showAdd=true;
    this.share.showUpdate=false;
  }
  
  //Add user details fun

  adduser(formvalue:any){
    this.api.addUser(formvalue).subscribe(res=>{
      alert("Your data was posted successfully!");
      this.userform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.share.store=[];
      this.getuser();
    },rej=>{
      alert("opps! Can not post data"+rej);
    });
  }

  //Get user details and show in table


  getuser(){
    this.api.getUserData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllUserData(key.id).subscribe(res=>{
          this.share.store.push(res);
        },rej=>{
          console.log("error",rej);
        })
      }
    },rej=>{
        alert("opps! Somthing went wrong"+rej);
    })
  }

  //To delete particular user
  
  delete(data:any){
    this.api.deleteUser(data._id,data._rev).subscribe(res=>{
      alert("your data has deleted, please refresh the page");
      this.share.store=[];
      this.getuser();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }
  

  //To set the values in the field

  onEdit(row:any){
    this.share.showAdd=false;
    this.share.showUpdate=true;
    this.userform.controls['name'].setValue(row.name);
    this.userform.controls['username'].setValue(row.username);
    this.userform.controls['pwd'].setValue(row.pwd);
    this.userform.controls['mobile'].setValue(row.mobile);
    this.userform.controls['dob'].setValue(row.dob);
    this.userform.controls['city'].setValue(row.city);
    this.userform.controls['state'].setValue(row.state);
    this.userform.controls['_id'].setValue(row._id);
    this.userform.controls['_rev'].setValue(row._rev);
  }


  // To update the exisisting one
  update(formvalue:NgForm){
    console.log(formvalue);
    this.api.updateUser(formvalue).subscribe(res=>{
      alert("Your data was updated successfully!");
      this.userform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.share.store=[];
      this.getuser();
    },rej=>{
      console.log("can not update.....",rej);
    })
  }

  //To check the user is already exist using username and mobile

  userCheck(formvalue:any){
    this.share.showAdd=false;
    this.api.getUserData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllUserData(key.id).subscribe(res=>{
          this.share.storeValidation.push(res);
          for (const iterator of this.share.storeValidation) {
            if((iterator.username==formvalue.username   && iterator.password==formvalue.pwd)){
              this.share.primaryCheck=1;
            }
          }
        })
      }
      setTimeout(()=>{
        if(this.share.primaryCheck==1){
          alert("Username and Password already in use try another one!");
          this.share.store=[];
          this.getuser();
        }else{
          this.adduser(formvalue);
        }
      },1000);
    })
  }
}


