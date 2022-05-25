import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ServiceService } from '../check/service.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers:[SharedserviceService,ApiService]
})
export class LogInComponent implements OnInit {
  loginform !:FormGroup;
  logIncheck:any=0;
  storeCredentials:any=[];
  constructor(private formbuilder:FormBuilder,private api:ApiService,private route:Router,private show:SharedserviceService,public ser:ServiceService) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
        username:['',Validators.required],
        password:['',Validators.required]
    })
  }
  
  //Login check function

  login(formvalue:any){
    this.api.getUserData().subscribe(res=>{
      this.show.allIdObj=res;
      this.show.allIdObj=this.show.allIdObj.rows;
      for (const key of this.show.allIdObj) {
        this.api.getAllUserData(key.id).subscribe(res=>{
          this.show.store.push(res);
          for (const iterator of this.show.store) {
            if(iterator.username==formvalue.username && iterator.password==formvalue.password){
              this.logIncheck=1;
              this.storeCredentials.push(iterator);
            }
          }
        })
      }
      setTimeout(()=>{
        if(this.logIncheck==1 && this.storeCredentials.length!=0){
          localStorage.setItem("currentUser",JSON.stringify(this.storeCredentials));
          this.loginform.reset();
          this.ser.showTag=false;
          this.storeCredentials=[];
          this.route.navigate(['/menu']);
        }else{
          alert("Your account does not exist!");
          this.route.navigate(['/login']);
          this.loginform.reset();
        }
      },1000);
    })
  }
}
