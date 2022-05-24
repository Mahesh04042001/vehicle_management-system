import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

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
  constructor(private formbuilder:FormBuilder,private api:ApiService,private route:Router,private show:SharedserviceService) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
        username:['',Validators.required],
        password:['',Validators.required]
    })
  }

  
  //Login check function
  login(formvalue:any){
    this.api.getUserData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllUserData(element.id).subscribe(res=>{
            this.store.push(res);
            for (const iterator of this.store) {
              if(iterator.username==formvalue.username && iterator.password==formvalue.password){
                this.logIncheck=1;
              }
            }
          })
        }
      }
      setTimeout(()=>{
        if(this.logIncheck==1){
          this.show.showTag=true;
          this.route.navigate(['/home']);
        }else{
          alert("Your account does not exist!");
          this.route.navigate(['/login']);
          this.loginform.reset();
        }
      },500);
    })
  }
}
