import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginform !:FormGroup;
  alluser!:any;
  store:any=[];
  logIncheck:any=0;
  constructor(private formbuilder:FormBuilder,private api:ApiService,private route:Router) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
        username:['',Validators.required],
        password:['',Validators.required]
    })
  }
  login(formvalue:any){
      this.api.getUserData().subscribe(res=>{
      // console.log(res);
      // console.log("response is comming");
      this.alluser=res;
      this.alluser=this.alluser.rows;
      // console.log(this.alluser);
      for (const key in this.alluser) {
            if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
              const element = this.alluser[key];
              // console.log(element.id);
              this.api.getAllUserData(element.id).subscribe(res=>{
                // console.log(res);
                this.store.push(res);
                // console.log("data is came");
                for (const iterator of this.store) {
                  // console.log(iterator.username);
                  if(iterator.username==formvalue.username){
                    this.logIncheck=1;
                    // console.log(this.logIncheck);
                    // console.log("hi");
                  }
                }
                
              })
            
            }
      }
      setTimeout(()=>{
        // console.log("outside"+this.logIncheck);
        if(this.logIncheck==1){
          // alert("You have logged in successfully");
          this.route.navigate(['/menu']);
        }else{
          alert("Your account does not exist!");
          this.route.navigate(['/login']);
        }
      },500);
      

    })
    // if(this.logIncheck===1){
    //   console.log("you have successfully logged in");
    // }else{
    //   alert("you can not logged in");
    // }
    console.log(formvalue);
    console.log(this.store);
    console.log("end");
  
  
  }

}
