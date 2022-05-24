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
  alluser!:any;
  store:any=[];
  showAdd!:boolean;
  showUpdate!:boolean;
  
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
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  //Add user details fun

  adduser(formvalue:any){
    console.log(formvalue);
    this.api.addUser(formvalue).subscribe(res=>{
      console.log("hello");
      alert("Your data was posted successfully!");
      this.userform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.getuser();
    },rej=>{
      alert("opps! Can not post data"+rej);
    });
  }

  //Get user details and show in table


  getuser(){
    this.api.getUserData().subscribe(res=>{
      console.log(res);
      console.log("response is comming");
      this.alluser=res;
      this.alluser=this.alluser.rows;
      console.log(this.alluser);
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          console.log(element.id);
          this.api.getAllUserData(element.id).subscribe(res=>{
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

  //To delete particular user
  
  delete(data:any){
    this.api.deleteUser(data._id,data._rev).subscribe(res=>{
      console.log("delete response get");
      console.log(res);
      alert("your data has deleted, please refresh the page");
      this.store=[];
      this.getuser();
    },rej=>{
      alert("oops can not delete"+rej);
    })
  }
  

  //To set the values in the field

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
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
      console.log("update success");
      console.log(res);
      alert("Your data was updated successfully!");
      this.userform.reset();
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.store=[];
      this.getuser();
    },rej=>{
      console.log("can not update.....");
    })
  }

  //To check the user is already exist using username and mobile

  userCheck(formvalue:any){
    console.log("usercheck");
    this.showAdd=false;
    this.api.getUserData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        console.log("usercheck1");
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllUserData(element.id).subscribe(res=>{
            console.log("usercheck2");

            this.share.storeValidation.push(res);
            for (const iterator of this.share.storeValidation) {
              console.log(iterator.username);
              if((iterator.username==formvalue.username   && iterator.password==formvalue.pwd)){
                this.share.primaryCheck=1;
                console.log(iterator.username);
                console.log(iterator.pwd);
              }
            }
          })
          
        }
      }
      setTimeout(()=>{
        if(this.share.primaryCheck==1){
          alert("Username and Password already in use try another one!");
          this.store=[];
          this.getuser();
        }else{
          this.adduser(formvalue);
        }
      },1000);
    })
  }
}


